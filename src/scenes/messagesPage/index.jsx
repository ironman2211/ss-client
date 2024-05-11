import { BottomNavigation, Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import { over } from "stompjs";
import SockJs from "sockjs-client";
import { legacy_createStore } from "@reduxjs/toolkit";
import FrameComponent from "../../components/FrameComponent.jsx";
import ContainerContainer from "../../components/ContainerContainer.jsx";
import ChatCard from "../../widgets/ChatCard.jsx";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { apiService } from "services/CommonServices.js";
import { setChats } from "state";

var stompClient = null;
const MessagesPage = () => {
  const [publicChat, setpublicChat] = useState([]);
  const [privateChat, setprivateChat] = useState(new Map());
  const [filteredFriend, setfilteredFriend] = useState([]);
  const [tab, settab] = useState(null);
  const { _id, friends, chats } = useSelector((state) => state.user);
  const [chatUser, setchatUser] = useState({});
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

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
      }))
    );
  }, []);
  // console.log(allFriends); ⚡ check

  const handleChatUser = (user) => {
    if (user) {
      console.log(user);
      if (privateChat.get(user._id)) {
        setchatUser(privateChat.get(user._id));
      } else {
        user.last_message = [];
        setchatUser(user);
      }
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, userId: e.target.value });
  };
  const handleSubmit = () => {
    // connect _WS_Chat_server
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

      updatePrivateChats();
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

  const [receivedMessage, setreceivedMessage] = useState({});
  const onPrivateMessageReceived = async (payload) => {
    setreceivedMessage(JSON.parse(payload.body));
  };

  useEffect(() => {
    addtoPrivateChat();
  }, [receivedMessage]);

  const addtoPrivateChat = async () => {
    // console.log(payLoadData);
    if (privateChat.get(receivedMessage.sender)) {
      setprivateChat((prevPrivateChat) => {
        const updatedPrivateChat = new Map(prevPrivateChat);
        const x = updatedPrivateChat.get(receivedMessage.sender);
        if (x) {
          x.last_message.push(receivedMessage);
        }
        return updatedPrivateChat;
      });
    } else updatePrivateChats();
  };

  const handleSendChage = (e) => {
    setUserData({ ...userData, message: e.target.value });
  };

  const sendPrivateMessage = async () => {
    if (stompClient) {
      let chatMessage = {
        sender: userData.userId,
        message: userData.message,
        receiver: chatUser._id,
        status: "SEND",
        date: new Date(),
      };

      // ADD to private_message
      if (!privateChat.get(chatUser._id)) {
        privateChat.set(chatUser._id, chatUser);
        setprivateChat(new Map(privateChat));
      }
      // UPDATE private message array
      if (userData.userId !== chatUser._id) {
        setprivateChat((prevPrivateChat) => {
          const updatedPrivateChat = new Map(prevPrivateChat);
          const x = updatedPrivateChat.get(chatUser._id);
          if (x) {
            x.last_message.push(chatMessage);
          }
          return updatedPrivateChat;
        });
      }
      // SEND message
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
      userData.message = "";
      setUserData(userData);
      updateChatScope();
    }
  };

  const updateChatScope = () => {
    [...privateChat.keys()].forEach((id) => {
      setfilteredFriend(filteredFriend.filter((friend) => friend._id != id));
    });
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

  const updatePrivateChats = async () => {
    try {
      console.log("Startd");
      const response = await apiService.getAllPrivateChats(_id, token);
      const PVC = await response.json();
      setprivateChat(new Map(Object.entries(PVC)));
    } catch (error) {
      console.log(error + "Error in Updating Private chats");
    }
  };

  useEffect(() => {
    updateChatScope();
    console.log(privateChat);
  }, [privateChat, chats]);
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
            <ContainerContainer
              chatUser={chatUser}
              privateChat={privateChat}
              setprivateChat={setprivateChat}
            />
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
                className="bg-transparent outline-none  bg-green-800 h-10 w-10 rounded-full"
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
