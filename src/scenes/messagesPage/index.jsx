import { BottomNavigation, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { over } from "stompjs";
import SockJs from "sockjs-client";
import { legacy_createStore } from "@reduxjs/toolkit";
import DataContainer from "./DataContainer";

var stompClient = null;
const MessagesPage = () => {
  const [publicChat, setpublicChat] = useState([]);
  const [privateChat, setprivateChat] = useState(new Map());
  const { firstName, secrete } = useSelector((state) => state.user);
  const [tab, settab] = useState("ChatRoom");
  const [userData, setUserData] = useState({
    userName: "",
    reciverName: "",
    connect: false,
    message: "",
  });
  const handleChange = (e) => {
    setUserData({ ...userData, userName: e.target.value });
  };
  const handleSubmit = () => {
    let Sock = new SockJs("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnect, onError);
    console.log("click");
  };
  const onConnect = () => {
    setUserData({ ...userData, connect: true });
    stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
    stompClient.subscribe(
      "/user/" + userData.userName + "/private",
      onPrivateMessageReceived
    );
    userJoin();
  };
  const userJoin = () => {
    let chatMessage = {
      sender: userData.userName,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };
  const onPublicMessageReceived = (payload) => {
    const payLoadData = JSON.parse(payload.body);
    switch (payLoadData.status) {
      case "JOIN":
        // console.log(privateChat.get(payLoadData.sender));
        // privateChat.set(payLoadData.sender, []);
        // // setprivateChat(new Map(privateChat));
        if (privateChat.get(payLoadData.sender) == undefined) {
          privateChat.set(payLoadData.sender, []);
          setprivateChat(new Map(privateChat));
        }
        console.log(privateChat);
        break;
      case "MESSAGE":
        publicChat.push(payLoadData);
        setpublicChat([...publicChat]);
        break;
    }
  };

  const onPrivateMessageReceived = (payload) => {
    console.log("jii duckers");
    const payLoadData = JSON.parse(payload.body);
    console.log(privateChat);
    if (privateChat.get(payLoadData.sender)) {
      privateChat.get(payLoadData.sender).push(payLoadData);
      setprivateChat(new Map(privateChat));
    } else {
      let list = [];
      list.push(payLoadData);
      privateChat.set(payLoadData.sender, list);
      setprivateChat(new Map(privateChat));
    }
  };

  const handleSendChage = (e) => {
    setUserData({ ...userData, message: e.target.value });
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.userName,
        message: userData.message,
        receiver: tab,
        status: "MESSAGE",
      };
      if (userData.userName !== tab) {
        privateChat.get(tab).push(chatMessage);
        setprivateChat(new Map(privateChat));
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };
  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.userName,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onError = () => {
    console.log("Error");
  };
  return (
    <DataContainer></DataContainer>
    // <Box>
    //   <Navbar />
    //   <h1 className="text-3xl text-teal-600 ">Hello world!</h1>
    //   <div
    //     style={{
    //       height: "90vh",
    //     }}
    //   >
    //     {userData.connect ? (
    //       <div
    //         style={{
    //           display: "flex",
    //           gap: "1rem",
    //         }}
    //       >
    //         {/* Messages */}
    //         <h3>Chat Message</h3>
    //         <ul>
    //           <li onClick={() => settab("ChatRoom")}>Chat Room</li>
    //           {[...privateChat.keys()]
    //             .filter((name) => name != userData.userName)
    //             .map((name, index) => (
    //               <li onClick={() => settab(name)} key={index}>
    //                 {name}
    //               </li>
    //             ))}
    //         </ul>

    //         {/* Chat Box */}
    //         {tab === "ChatRoom" && (
    //           <div style={{ display: "flex", flexDirection: "column" }}>
    //             <h3>{tab} Box</h3>
    //             <div>
    //               {publicChat &&
    //                 publicChat.map((chat, index) => (
    //                   <li key={index}>{chat.message}</li>
    //                 ))}
    //             </div>
    //             <>
    //               <input
    //                 value={userData.message}
    //                 onChange={handleSendChage}
    //               ></input>
    //               <Button onClick={sendPublicMessage}>Send MEssage</Button>
    //             </>
    //           </div>
    //         )}
    //         {tab !== "ChatRoom" && (
    //           <div style={{ display: "flex", flexDirection: "column" }}>
    //             <h3>{tab} Box</h3>
    //             <div>
    //               {privateChat &&
    //                 [...privateChat.get(tab)].map((chat, index) => (
    //                   <li key={index}>{chat.message}</li>
    //                 ))}
    //             </div>
    //             <>
    //               <input
    //                 value={userData.message}
    //                 onChange={handleSendChage}
    //               ></input>
    //               <Button onClick={sendPrivateMessage}>Send MEssage</Button>
    //             </>
    //           </div>
    //         )}
    //       </div>
    //     ) : (
    //       <div>
    //         <TextField
    //           label="UserName"
    //           value={userData.userName}
    //           name="location"
    //           onChange={handleChange}
    //           sx={{ gridColumn: "span 4" }}
    //         />
    //         <Button onClick={handleSubmit}>Connect</Button>
    //       </div>
    //     )}
    //   </div>
    // </Box>
  );
};

export default MessagesPage;


