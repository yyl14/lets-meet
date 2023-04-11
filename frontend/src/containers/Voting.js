import styled from "styled-components";
import "@fontsource/roboto/500.css";
import { Input, Button, DatePicker, TimePicker, Space, Table, Tag } from "antd";
import "../css/Background.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header, Header2 } from "../components/Header";

// createList 形式：{date: "May 19Wed", time: "9:00", available: false} 之後會加一格routine
let createList = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
].map((m) =>
  [
    "May 19Wed",
    "May 20Wed",
    "May 21Wed",
    "May 22Wed",
    "May 23Wed",
    "May 24Wed",
    "May 25Wed",
  ].map((d) => ({
    date: d,
    time: m,
    availableNum: false,
  }))
);

// showList形式：{date: May 19Wed, time: "9:00", availableNum: 2, availablePpl: ["Luisa, Tom"]}

let showList = [
  "9:00",
  "9:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
].map((m) =>
  [
    "May 19Wed",
    "May 20Wed",
    "May 21Wed",
    "May 22Wed",
    "May 23Wed",
    "May 24Wed",
    "May 25Wed",
  ].map((d) => ({
    date: d,
    time: m,
    availableNum: Math.floor(Math.random() * 3),
  }))
);

const CreateMeet = styled.div`
  width: 70%;
  height: 70%;
  min-width: 500px;
  min-height: 500px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // border: 1px solid #D8D8D8;
  padding: 5% 0%;
`;

const FormWrapper = styled.div`
  width: 60%;
  height: 60%;
  min-width: 500px;
  min-height: 500px;
  position: relative;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
  // border: 1px solid #D8D8D8;
  padding: 5% 0%;
`;

const addHexColor = (c1, c2) => {
  var hexStr = (parseInt(c1, 16) - parseInt(c2, 16)).toString(16);
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  } // Zero pad.
  return hexStr;
};

const Voting = () => {
  const [isLogin, setIsLogin] = useState(true); // 如果login會顯示header，沒有的話會顯示login
  const [block, setBlock] = useState(createList); // 每個timeblock存的資訊
  const navigate = useNavigate();

  const handleMeet = () => {
    navigate("/meets");
  };

  const handleShow = (i, j) => {
    // setAvaList(showList[i][j].availablePpl);
    // setNotAvaList(showList[i][j].notAvailablePpl);
  };

  const chooseColor = (num) => {
    // return addHexColor("F0F0F0", ((Math.max(num-1, 0)*3635)+984028).toString(16));
    if (num === 0) return "f0f0f0";
    else return addHexColor("FFF4CC", ((num - 1) * 3635).toString(16));
  };

  const handleCell = (i, j) => {
    let temp = [...block];
    temp[i][j].available = !temp[i][j].available;
    setBlock(temp);
    console.log(block[i][j].available);
  };

  const handleBlock = (item, i, j) => {
    if (item.routine) {
      return (
        <div
          className="cell"
          key={j}
          id={j}
          date={item.date}
          time={item.time}
          available={item.available ? true : undefined}
          style={{ backgroundColor: "gray" }}
        ></div>
      );
    } else {
      return (
        <div
          className="cell"
          key={j}
          id={j}
          date={item.date}
          time={item.time}
          available={item.available ? true : undefined}
          onClick={() => handleCell(i, j)}
          style={{ backgroundColor: item.available ? "pink" : "#F0F0F0" }}
        ></div>
      );
    }
  };

  return (
    <>
      {isLogin ? <Header location="timeslot" /> : <Header2 />}
      <div className="leftContainer" style={{ background: "white" }}>
        <FormWrapper>
          <Button
            icon={<ArrowLeftOutlined />}
            style={{ position: "absolute", right: "100%", top: "6%" }}
            onClick={handleMeet}
          ></Button>
          <div
            style={{
              top: 0,
              left: 0,
              fontFamily: "Roboto",
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "30px",
              position: "absolute",
              top: "6%",
            }}
          >
            SDM Class
          </div>
          <div
            style={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "20px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
          >
            My Avaiability
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "15%",
              transform: "translate(-50%, 0%)",
            }}
          >
            <div className="cellIntroBlock">
              {block.length !== 0 ? (
                block[0].map((item, j) => (
                  <div className="cellIntro" key={j}>
                    {item.date.slice(0, 6)}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="cellIntroBlock">
              {block.length !== 0 ? (
                block[0].map((item, j) => (
                  <div className="cellIntro" key={j}>
                    {item.date.slice(6, 9)}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            {block.map((items, i) => (
              <div key={"row" + i} id={"row" + i} style={{ display: "flex" }}>
                <div className="cellIntro">{items[0].time}</div>
                {items.map((item, j) => (
                  <div
                    className="cell"
                    key={j}
                    id={j}
                    date={item.date}
                    time={item.time}
                    available={item.available ? true : undefined}
                    onClick={() => handleCell(i, j)}
                    style={{
                      backgroundColor: item.available ? "#94C9CD" : "#F0F0F0",
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </FormWrapper>
      </div>
      <div className="rightContainer">
        <FormWrapper>
          <div
            style={{
              fontFamily: "Roboto",
              fontWeight: "500",
              fontSize: "20px",
              position: "absolute",
              left: "50%",
              transform: "translate(-50%, 0%)",
            }}
          >
            Group Avaiability
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "15%",
              transform: "translate(-50%, 0%)",
            }}
          >
            <div className="cellIntroBlock">
              {showList.length !== 0 ? (
                showList[0].map((item, j) => (
                  <div className="cellIntro" key={j}>
                    {item.date.slice(0, 6)}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            <div className="cellIntroBlock">
              {showList.length !== 0 ? (
                showList[0].map((item, j) => (
                  <div className="cellIntro" key={j}>
                    {item.date.slice(6, 9)}
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
            {showList.map((items, i) => (
              <div key={"row" + i} id={"row" + i} style={{ display: "flex" }}>
                <div className="cellIntro">{items[0].time}</div>
                {items.map((item, j) => (
                  // <div className='cell' key={j} id={j} date={item.date} time={item.time}
                  // available={item.availableNum} onMouseOver={() => handleShow(i, j)}
                  // style={{ backgroundColor: "#"+chooseColor(item.availableNum) }}></div>
                  <div
                    className="cell"
                    key={j}
                    id={j}
                    date={item.date}
                    time={item.time}
                    available={item.availableNum}
                    style={{
                      backgroundColor: "#" + chooseColor(item.availableNum),
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </FormWrapper>
      </div>
    </>
  );
};

export default Voting;