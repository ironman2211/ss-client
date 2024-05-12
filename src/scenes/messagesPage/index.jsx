import {
  BottomNavigation,
  Box,
  Button,
  TextField,
  useMediaQuery,
} from "@mui/material";
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
import { FlexBetween } from "components/Flex.jsx";

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

  const isMobileScreens = useMediaQuery("(max-width: 640px)");

  const [clickedChatuser, setclickedChatuser] = useState(false);

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
      if (privateChat.get(user._id)) {
        setchatUser(privateChat.get(user._id));
      } else {
        user.last_message = [];
        setchatUser(user);
      }
      setclickedChatuser(!clickedChatuser);
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
      const response = await apiService.getAllPrivateChats(_id, token);
      const PVC = await response.json();
      setprivateChat(new Map(Object.entries(PVC)));
    } catch (error) {
      console.log(error + "Error in Updating Private chats");
    }
  };
  const handleBack = () => {
    if (isMobileScreens) {
      setclickedChatuser(!clickedChatuser);
    }
  };

  useEffect(() => {
    updateChatScope();
  }, [privateChat, chats]);
  useEffect(() => {
    if (!userData.connect) handleSubmit();
  }, [userData.connect, userData]);

  return (
    <div
      className="w-screen h-screen "
      style={{ fontFamily: "poppins" }}
    >
      <Navbar />
      {/* <hr /> */}
      <FlexBetween className="xl:px-14 ">
        {isMobileScreens && clickedChatuser ? (
          <></>
        ) : (
          <div className="flex flex-col items-start justify-start xl:w-[22vw] md:w-[38vw]  w-[100vw] h-[85vh]   border-r-2 border-gray-200 md:p-5 px-8 py-5 ">
            <div className="h-full w-full flex flex-col justify-start ">
              <div className="flex  w-full h-12 overflow-y-scroll ">
                {/* <input
                className="w-full p-5 outline-none border-2 rounded-2xl"
                placeholder="Search.."
              /> */}
                <div className=" flex w-full px-2 item-center justify-between">
                  <b className="text-xl font-bold ">Chats</b>
                  <SearchIcon className="text-xl cursor-pointer mt-1" />
                </div>
              </div>
              {/* <hr className="w-full h-2" /> */}
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

              <div className="flex  w-full h-12 mt-5  ">
                <b className="text-xl font-semibold">Friends</b>
              </div>
              <hr className="w-full h-2" />

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
        )}
        {(isMobileScreens && !clickedChatuser) ||
          (chatUser?._id && (
            // <form>
            <section className="flex flex-col px-5 h-[89vh] w-full   justify-between overflow-hidden pt-3 ">
              <FrameComponent chatUser={chatUser} handleBack={handleBack} />
              <ContainerContainer
                chatUser={chatUser}
                privateChat={privateChat}
                setprivateChat={setprivateChat}
              />
              <div className="w-full  flex items-center justify-center p-2 gap-5 ">
                <button className="bg-transparent outline-none w-12 text-black">
                  <AttachFileIcon />
                </button>
                <input
                  className="w-10/12 px-4 py-3 outline-none text-black rounded-xl bg-gray-100 border-gray-200 border-2 "
                  value={userData.message}
                  placeholder="Enter your message"
                  onChange={handleSendChage}
                />
                <button
                  className="bg-transparent outline-none   twxt-white h-10 w-10 rounded-full"
                  onClick={sendPrivateMessage}
                >
                  <SendIcon  className="text-green-800" />
                </button>
              </div>
            </section>
            // </form>
          ))}
      </FlexBetween>
    </div>
  );
};

export default MessagesPage;
