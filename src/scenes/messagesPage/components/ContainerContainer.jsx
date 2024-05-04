import FriendText from "../widgets/FriendText";
import MyText from "../widgets/MyText";

const ContainerContainer = () => {
  return (
    <div className="w-full h-[50vh] overflow-scroll">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full text-black">
        <FriendText />

        <MyText text="Hi Brahma how are you" />
        <FriendText />

        <MyText text="Hi Brahma how are you" />
      </div>
    </div>
  );
};

export default ContainerContainer;
