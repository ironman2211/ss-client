import { chatService } from "services/ChatService";
import FriendText from "../widgets/FriendText";
import MyText from "../widgets/MyText";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ContainerContainer = ({chatUser, privateChat }) => {
  // console.log(privateChat);
  // http://localhost:8080/api/chats/getAll
  const { _id } = useSelector((state) => state.user);
  const [chats, setchats] = useState([]);

  const getAllPrivateChats = async () => {
    let response = await chatService.getAllPrivateChats(chatUser._id, _id);
    const chats = await response.json();
    setchats(chats);
    console.log(chats);
  };
  useEffect(()=>{
    
  getAllPrivateChats();
  },[privateChat])
  return (
    <div className="w-full h-[50vh] overflow-scroll">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full text-black">
        {chats&&chats.map((chat, index) => {
          if (chat.sender === chatUser._id)
            return (
              <FriendText
                key={index}
                name={chatUser.name}
                picture={chatUser.picturePath}
                text={chat.message}
              />
            );
          return <MyText key={index} text={chat.message} />;
        })}
      </div>
    </div>
  );
};

export default ContainerContainer;
