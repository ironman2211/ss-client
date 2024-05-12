import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
const FrameComponent = ({ chatUser,handleBack }) => {
  console.log(chatUser);
  return (
    <div className="flex w-full bg-gray-100 p-3  rounded-xl text-black justify-between ">
      <div className="flex flex-row">
        <button className="bg-transparent outline-none w-12" onClick={handleBack}>
          <ArrowBackIcon className="text-3xl font-bold" />
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full">  
          <img
            src={chatUser.picturePath}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center ml-5 text-black">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.2rem] sm:gap-[0.5rem]">
            <div className="self-stretch relative leading-[1rem] font-bold text-[.7rem]">
              {chatUser.name}
            </div>
            <div className="w-[4.875rem] relative text-[.6rem] md:text-[0.75rem] leading-[0.938rem] font-circular-std text-gray-500 inline-block z-[2]">
              {chatUser.status ? chatUser.status : "Active now"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <button className="bg-transparent outline-none w-10 sm:w-12">
          <CallIcon />
        </button>
        <button className="bg-transparent outline-none w-10 sm:w-12">
          <VideocamIcon />
        </button>
      </div>
    </div>
  );
};

export default FrameComponent;
