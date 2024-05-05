import FriendText from "../widgets/FriendText";
import MyText from "../widgets/MyText";

const ContainerContainer = ({ privateChat }) => {
  console.log(privateChat);
  return (
    <div className="w-full h-[50vh] overflow-scroll">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full text-black">
        {privateChat.chats.map((chat, index) => {
          if (chat.sender === privateChat._id)
            return (
              <FriendText
                key={index}
                name={privateChat.name}
                picture={privateChat.picturePath}
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
