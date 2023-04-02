from base import do
from typing import Tuple
import exceptions as exc  # noqa

import asyncpg

from .util import pyformat2psql
from . import pool_handler


async def add(username: str, pass_hash: str = None, notification_preference: str = 'email',
              email: str = None, is_google_login: bool = False) -> int:
    sql, params = pyformat2psql(
        sql=fr'INSERT INTO account'
            fr'            (username, pass_hash, notification_preference, email, is_google_login)'
            fr'     VALUES (%(username)s, %(pass_hash)s, %(notification_preference)s, %(email)s, %(is_google_login)s)'
            fr'  RETURNING id',
        username=username, pass_hash=pass_hash, notification_preference=notification_preference, email=email,
        is_google_login=is_google_login,
    )
    try:
        id_, = await pool_handler.pool.fetchrow(sql, *params)
    except asyncpg.exceptions.UniqueViolationError:
        raise exc.UniqueViolationError
    return id_


async def update_email(account_id: int, email: str) -> None:
    sql, params = pyformat2psql(
        sql=fr"UPDATE account"
            fr"   SET email = %(email)s"
            fr" WHERE id = %(account_id)s",
        email=email, account_id=account_id,
    )
    await pool_handler.pool.execute(sql, *params)


async def update_username(account_id: int, username: str) -> None:
    sql, params = pyformat2psql(
        sql=fr"UPDATE account"
            fr"   SET username = %(username)s"
            fr" WHERE id = %(account_id)s",
        username=username, account_id=account_id,
    )
    await pool_handler.pool.execute(sql, *params)


async def read_by_email(email: str, is_google_login: bool = False) -> do.Account:
    sql, params = pyformat2psql(
        sql=fr"SELECT id, email, username, line_token, google_token, notification_preference, is_google_login"
            fr"  FROM account"
            fr" WHERE email = %(email)s AND is_google_login = %(is_google_login)s",
        email=email, is_google_login=is_google_login,
    )
    try:
        id_, email, username, line_token, google_token, notification_preference, is_google_login = \
            await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound
    return do.Account(id=id_, email=email, username=username, line_token=line_token, google_token=google_token,
                      notification_preference=notification_preference, is_google_login=is_google_login)


async def read_by_username_or_email(identifier: str, is_google_login: bool = False) -> Tuple[int, str, bool]:
    sql, params = pyformat2psql(
        sql=fr"SELECT id, pass_hash, is_google_login"
            fr"  FROM account"
            fr" WHERE username = %(username)s"
            fr"    OR email = %(email)s"
            fr"   AND email IS NOT NULL",
        username=identifier, email=identifier, is_google_login=is_google_login
    )
    try:
        id_, pass_hash, is_google_login = await pool_handler.pool.fetchrow(sql, *params)
    except TypeError:
        raise exc.NotFound
    return id_, pass_hash, is_google_login


async def reset_password(code: str, pass_hash: str) -> None:
    conn = await pool_handler.pool.acquire()
    try:
        account_id, = await conn.fetchrow(
            'SELECT account_id'
            '  FROM email_verification'
            ' WHERE code = $1',
            code
        )
    except TypeError:
        await pool_handler.pool.release(conn)
        raise exc.NotFound
    await conn.execute(
        "UPDATE email_verification"
        "   SET is_consumed = $1"
        " WHERE code = $2",
        True, code,
    )
    await conn.execute(
        "UPDATE account"
        "   SET pass_hash = $1"
        " WHERE id = $2",
        pass_hash, account_id,
    )
    await pool_handler.pool.release(conn)
