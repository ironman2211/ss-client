import { chatService } from "services/ChatService";
import FriendText from "../widgets/FriendText";
import MyText from "../widgets/MyText";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ContainerContainer = ({ chatUser, privateChat, setprivateChat }) => {
  const { _id } = useSelector((state) => state.user);
  const [loadChat, setloadChat] = useState(false);

  const getAllChats = async () => {
    let response = await chatService.getAllPrivateChats(chatUser._id, _id);
    return await response.json();
  };

  const getAllPrivateChats = async () => {
    console.log(chatUser);
    if (privateChat.get(chatUser._id)) {
      console.log("hann chi");
      const user = privateChat.get(chatUser._id);
      user.last_message = await getAllChats();
      setprivateChat(privateChat.set(chatUser._id, user), setloadChat(true));
    }
  };

  useEffect(() => {
    getAllPrivateChats();
  }, []);

  return (
    <div className="w-full h-[50vh] overflow-scroll">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full text-black">
        {loadChat &&
          privateChat.get(chatUser._id) &&
          privateChat.get(chatUser._id).last_message.map((chat, index) => {
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
