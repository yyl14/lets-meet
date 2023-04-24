import instance from "./axios";

export const browseMeet = async (token) => {
  try {
    const { data: result } = await instance.get("/meet", {
      headers: { "auth-token": token },
    });
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMeetInfo = async (code, token) => {
  try {
    const { data: result } = await instance.get(`/meet/invite/${code}`, {
      headers: { "auth-token": token },
    });
    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
