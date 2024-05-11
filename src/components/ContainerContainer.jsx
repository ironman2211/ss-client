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
  }, [privateChat]);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  window.onload = function() {
    const scrollableDiv = document.getElementById('scrollableDiv');
    scrollableDiv.scrollTop = scrollableDiv.scrollHeight;
  };
  return (
    <div className="w-full h-[65vh] overflow-y-auto" id="scrollableDiv">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full text-black">
      {loadChat &&
          privateChat.get(chatUser._id) &&
          privateChat.get(chatUser._id).last_message.map((chat, index, array) => {
            const previousMessage = array[index - 1];
            const currentDate = new Date(chat.date);
            const previousDate = previousMessage ? new Date(previousMessage.date) : null;

            // Check if the current message's date is different from the previous one
            const showDayDivider = !previousDate || currentDate.toDateString() !== previousDate.toDateString();

            return (
              <div key={index} className=" w-full">
                {/* Render day divider if necessary */}
                {showDayDivider && (
                  <div className="text-center text-gray-500 mt-2 mb-1">{formatDate(chat.date)}</div>
                )}

                {/* Render message */}
                {chat.sender === chatUser._id ? (
                  <FriendText
                    name={chatUser.name}
                    picture={chatUser.picturePath}
                    text={chat.message}
                    time={formatTime(chat.date)}
                  />
                ) : (
                  <MyText text={chat.message} time={formatTime(chat.date)} />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ContainerContainer;
