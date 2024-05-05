import { BottomNavigation, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { over } from "stompjs";
import SockJs from "sockjs-client";
import { legacy_createStore } from "@reduxjs/toolkit";
import DataContainer from "./DataContainer";
import FrameComponent from "./components/FrameComponent.jsx";
import ContainerContainer from "./components/ContainerContainer.jsx";
import ChatCard from "./widgets/ChatCard.jsx";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { apiService } from "apiHandled/common-services";

var stompClient = null;
const MessagesPage = () => {
  const [publicChat, setpublicChat] = useState([]);
  const [privateChat, setprivateChat] = useState(new Map());
  const [filteredFriend, setfilteredFriend] = useState([]);
  const { firstName, secrete } = useSelector((state) => state.user);
  const [tab, settab] = useState(null);
  const { _id, friends } = useSelector((state) => state.user);
  const [chatUser, setchatUser] = useState({});
  const token = useSelector((state) => state.token);
  const [userData, setUserData] = useState({
    userId: "",
    reciverId: "",
    connect: false,
    message: "",
  });

  
  useEffect(() => {
    setfilteredFriend(
      friends.map((friend) => ({
        _id: friend._id,
        name: friend.firstName + " " + friend.lastName,
        picturePath: friend.picturePath,
        status: null,
        bio: null,
      }))
    );
  }, []);
  // console.log(allFriends); ⚡ check

  const handleChatUser = (user) => {
    if (user) {
      if (privateChat.get(user._id)) {
        setchatUser(privateChat.get(user._id));
      } else {
        user.chats = [];
        setchatUser(user);
      }
    }
  };




  const handleChange = (e) => {
    setUserData({ ...userData, userId: e.target.value });
  };
  const handleSubmit = () => {
    let Sock = new SockJs("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnect, onError);
  };

  const onConnect = () => {
    if (_id) {
      userData.userId = _id;
      userData.connect = true;
      setUserData(userData);
      stompClient.subscribe("/chatroom/public", onPublicMessageReceived);
      stompClient.subscribe(
        "/user/" + userData.userId + "/private",
        onPrivateMessageReceived
      );
      // userJoin();
    }
    // console.log(userData);
  };
  const userJoin = () => {
    let chatMessage = {
      sender: userData.userId,
      status: "JOIN",
    };
    // console.log(chatMessage);
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
        // console.log(privateChat);
        break;
      case "MESSAGE":
        publicChat.push(payLoadData);
        setpublicChat([...publicChat]);
        break;
    }
  };

  const onPrivateMessageReceived = async (payload) => {
    // console.log("jii duckers");
    const payLoadData = JSON.parse(payload.body);
    // console.log(payLoadData);
    if (privateChat.get(payLoadData.sender)) {
      setprivateChat((prevPrivateChat) => {
        const updatedPrivateChat = new Map(prevPrivateChat);
        const x = updatedPrivateChat.get(payLoadData.sender);
        if (x) {
          x.chats.push(payLoadData);
        }
        return updatedPrivateChat;
      });
    } else {
      const response = await apiService.getUser(payLoadData.sender, token);
      const user = await response.json();
      let chatInfo = {
        _id: payLoadData.sender,
        name: user.firstName + " " + user.lastName,
        picturePath: user.picturePath,
        status: null,
        bio: null,
        chats: [],
      };
      chatInfo.chats.push(payLoadData);
      privateChat.set(user._id, chatInfo);
      setprivateChat(new Map(privateChat));
    }
  };

  const handleSendChage = (e) => {
    setUserData({ ...userData, message: e.target.value });
  };

  const sendPrivateMessage = () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.userId,
        message: userData.message,
        receiver: chatUser._id,
        status: "MESSAGE",
      };

      if (!privateChat.get(chatUser._id)) {
        privateChat.set(chatUser._id, chatUser);
        setprivateChat(new Map(privateChat));
        setfilteredFriend(
          filteredFriend.filter((friend) => friend._id != chatUser._id)
        );
      }

      if (userData.userId !== chatUser._id) {
        setprivateChat((prevPrivateChat) => {
          const updatedPrivateChat = new Map(prevPrivateChat);
          const x = updatedPrivateChat.get(chatUser._id);
          if (x) {
            x.chats.push(chatMessage);
          }
          return updatedPrivateChat;
        });
      }
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      userData.message = "";
      setUserData(userData);
    }
  };
  const sendPublicMessage = () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.userId,
        message: userData.message,
        status: "MESSAGE",
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const onError = () => {
    // console.log("Error");
  };
  useEffect(() => {
    if (!userData.connect) handleSubmit();
  }, [userData.connect, userData]);

  return (
    <div
      className="w-screen h-screen bg-white"
      style={{
        fontFamily: "poppins",
      }}
    >
      <Navbar />
      <hr />
      <main className="flex flex-row flex-wrap items-start justify-start md:px-20 md:py-5 md:p-2  ">
        <div className=" flex flex-col items-start justify-start max-w-full p-8  border-r-2 border-gray-200   ">
          <div className=" w-[20.438rem] h-[70vh] self-stretch flex flex-col items-end justify-start gap-2 max-w-full ">
            <div className="flex  w-full h-12 mb-">
              {/* <input
                className="w-full p-5 outline-none border-2 rounded-2xl"
                placeholder="Search.."
              /> */}
              <div className=" flex w-full px-2 item-center justify-between">
                <b className="text-2xl font-bold">Chats</b>
                <SearchIcon className="text-xl cursor-pointer mt-4" />
              </div>
            </div>

            {[...privateChat.keys()]
              .filter((key) => key != userData.userId)
              .map((_id, index) => (
                <ChatCard
                  key={index}
                  didChat={true}
                  user={privateChat.get(_id)}
                  handleclick={handleChatUser}
                />
              ))}

            <div className="flex  w-full h-12 ">
              <b className="text-2xl font-semibold">Friends</b>
            </div>
            {filteredFriend.map((friend, index) => (
              <ChatCard
                key={index}
                user={friend}
                didChat={false}
                handleclick={handleChatUser}
              />
            ))}
          </div>
        </div>
        {chatUser?._id && (
          // <form>
          <section className="flex-1  bg-white box-border flex flex-col items-end justify-start  px-[1.25rem] pb-[2.437rem] gap-[4.437rem] min-w-[47.813rem] max-w-full text-left text-[0.75rem] text-gray-200 font-circular-std   lg:gap-[2.188rem] mq1050:pt-[1.25rem] mq1050:pb-[1.563rem] mq1050:min-w-full mq450:pb-[1.25rem]  mq750:gap-[1.125rem]">
            <div className="relative rounded-3xl bg-white box-border hidden max-w-full  " />
            <FrameComponent chatUser={chatUser} />
            <ContainerContainer privateChat={chatUser} />
            <div className="w-full  flex items-center justify-center p-4 gap-5">
              <button className="bg-transparent outline-none w-12 text-black">
                <AttachFileIcon />
              </button>
              <input
                className="w-10/12 px-4 py-3 outline-none text-black rounded-xl bg-gray-100 "
                value={userData.message}
                placeholder="Enter your message"
                onChange={handleSendChage}
              />
              <button
                className="bg-transparent outline-none  bg-green-700 h-10 w-10 rounded-full"
                onClick={sendPrivateMessage}
              >
                <SendIcon />
              </button>
            </div>
          </section>
          // </form>
        )}
      </main>
    </div>
  );
};

export default MessagesPage;

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
//             .filter((name) => name != userData.userId)
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
//           label="userId"
//           value={userData.userId}
//           name="location"
//           onChange={handleChange}
//           sx={{ gridColumn: "span 4" }}
//         />
//         <Button onClick={handleSubmit}>Connect</Button>
//       </div>
//     )}
//   </div>
// </Box>
