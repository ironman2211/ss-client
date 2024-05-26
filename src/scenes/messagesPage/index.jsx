import {
  BottomNavigation,
  Box,
  Button,
  CircularProgress,
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
import WidgetWrapper from "components/WidgetWrapper.jsx";
import { useTheme } from "@emotion/react";

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

  const updateFriends = () => {
    let transformedFriends = friends.map((friend) => ({
      _id: friend._id,
      name: friend.firstName + " " + friend.lastName,
      picturePath: friend.picturePath,
      status: null,
    }));
    setfilteredFriend(transformedFriends);
  };
  useEffect(() => {
    updateFriends();
  }, []);

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
    let Sock = new SockJs("https://chat-server-1-0-0-release.onrender.com/ws");
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
    // (userData);
  };
  const userJoin = () => {
    let chatMessage = {
      sender: userData.userId,
      status: "JOIN",
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };
  const onPublicMessageReceived = (payload) => {
    const payLoadData = JSON.parse(payload.body);
    switch (payLoadData.status) {
      case "JOIN":
        // (privateChat.get(payLoadData.sender));
        // privateChat.set(payLoadData.sender, []);
        // // setprivateChat(new Map(privateChat));
        if (privateChat.get(payLoadData.sender) == undefined) {
          privateChat.set(payLoadData.sender, []);
          setprivateChat(new Map(privateChat));
        }
        // (privateChat);
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
    // (payLoadData);
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
    if (userData.message.trim() && stompClient) {
      let chatMessage = {
        sender: userData.userId,
        message: userData.message,
        receiver: chatUser._id,
        status: "SEND",
        date: new Date(),
      };
  
      // Update privateChat with the new message
      setprivateChat((prevPrivateChat) => {
        const updatedPrivateChat = new Map(prevPrivateChat);
  
        if (updatedPrivateChat.has(chatUser._id)) {
          // If chatUser already has messages, append the new message
          let chat = updatedPrivateChat.get(chatUser._id);
          chat.last_message.push(chatMessage);
        } else {
          // If chatUser does not exist, initialize with the new message
          chatUser.last_message = [chatMessage];
          updatedPrivateChat.set(chatUser._id, chatUser);
        }
  
        return updatedPrivateChat;
      });
  
      // Send the message through stompClient
      stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
  
      // Clear the message input
      setUserData({ ...userData, message: "" });
  
      // Update chat scope (if necessary)
      updateChatScope();
    }
  };
  

  const theme = useTheme();
  const updateChatScope = () => {
    let updatedFilteredFriend = filteredFriend;

    [...privateChat.keys()].forEach((id) => {
      updatedFilteredFriend = updatedFilteredFriend.filter(
        (friend) => friend._id != id
      );
    });
    // setfilteredFriend(updatedFilteredFriend);
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
    // ("Error");
  };

  const updatePrivateChats = async () => {
    try {
      const response = await apiService.getAllPrivateChats(_id, token);
      const PVC = await response.json();
      setprivateChat(new Map(Object.entries(PVC)));
    } catch (error) {}
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
      className="w-screen h-[93vh] fixed sm:top-[9vh] top-[7vh] "
      style={{ fontFamily: "poppins" }}
    >
      {/* <hr /> */}
      <FlexBetween className="lg:px-14 lg:pt-5 sm:p-3">
        {isMobileScreens && clickedChatuser ? (
          <></>
        ) : (
          <WidgetWrapper
            theme={theme}
            className="flex flex-col items-start justify-start xl:w-[22vw] md:w-[38vw]  w-[100vw] h-[86vh]     "
          >
            <div className=" gap-2 h-[87vh] py-5 w-full overflow-y-scroll ">
              <div className="flex  w-full h-12 overflow-y-scroll  ">
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
              {[...privateChat.keys()].length > 0 ? (
                [...privateChat.keys()]
                  .filter((key) => key != userData.userId)
                  .map((_id, index) => (
                    <ChatCard
                      key={index}
                      didChat={true}
                      user={privateChat.get(_id)}
                      handleclick={handleChatUser}
                    />
                  ))
              ) : (
                <div className="w-fulll h-full flex items-center justify-center">
                  <CircularProgress />
                </div>
              )}

              {filteredFriend && (
                <>
                  <div className="flex  w-full h-12 mt-5  ">
                    <b className="text-xl font-semibold">Friends</b>
                  </div>
                  <hr className="w-full h-2" />
                </>
              )}
              {filteredFriend.map((friend, index) => (
                <ChatCard
                  key={index}
                  user={friend}
                  didChat={false}
                  handleclick={handleChatUser}
                />
              ))}
            </div>
          </WidgetWrapper>
        )}
        {(isMobileScreens && !clickedChatuser) ||
          (chatUser?._id && (
            // <form>
            <section className="flex flex-col  h-[87vh] w-full   justify-between overflow-hidden  sm:px-5  p-5 sm:p-0">
              <FrameComponent chatUser={chatUser} handleBack={handleBack} />
              <ContainerContainer
                chatUser={chatUser}
                privateChat={privateChat}
                setprivateChat={setprivateChat}
              />
              <div className="w-full  flex items-center justify-center p-2 gap-5 ">
                <button
                  className={`bg-transparent outline-none w-12 text-${
                    theme.palette.mode === "dark" ? "white" : "black"
                  } `}
                >
                  <AttachFileIcon />
                </button>
                <input
                  className="w-11/12 px-4 py-2 outline-none text-black rounded-xl  border-gray-200 border-2 "
                  value={userData.message}
                  placeholder="Enter your message"
                  onChange={handleSendChage}
                />
                <button
                  className="bg-transparent outline-none   twxt-white h-10 w-10 rounded-full"
                  onClick={sendPrivateMessage}
                >
                  <SendIcon
                    className={
                      userData.message === ""
                        ? "text-gray-800"
                        : "text-green-800"
                    }
                  />
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
