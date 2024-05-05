import FriendText from "../widgets/FriendText";
import MyText from "../widgets/MyText";

const ContainerContainer = ({ privateChat, chatuser }) => {
  return (
    <div className="w-full h-[50vh] overflow-scroll">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full text-black">
        {privateChat.map((chat, index) => {
          if (chat.sender === chatuser._id)
            return (
              <FriendText key={index} user={chatuser} text={chat.message} />
            );
          return <MyText key={index} text={chat.message} />;
        })}

        {/* <MyText text="Hi Brahma how are you" />
       

        <MyText text="Hi Brahma how are you" /> */}
      </div>
    </div>
  );
};

export default ContainerContainer;
