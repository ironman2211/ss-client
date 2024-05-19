import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import WidgetWrapper from "./WidgetWrapper";
import { useTheme } from "@emotion/react";
const FrameComponent = ({ chatUser, handleBack }) => {


  const theme = useTheme();
  return (
    <div
      className="flex w-20rem bg-white  p-3  rounded-xl text-black justify-between shadow-md "
      style={{
        backgroundColor: theme.palette.background.alt,
        text: theme.palette.mode === "dark" ? "white" : "black",
      }}
    >
      <div
        className={`flex flex-row text-${
          theme.palette.mode === "dark" ? "white" : "black"
        } `}
      >
        <button
          className="bg-transparent outline-none w-12"
          onClick={handleBack}
        >
          <ArrowBackIcon className="text-3xl font-bold" />
        </button>
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full">
          <img
            src={chatUser.picturePath}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center ml-5 ">
          <div className="self-stretch flex flex-col items-start justify-start gap-[0.2rem] sm:gap-[0.5rem]">
            <div className="self-stretch relative leading-[1rem] font-bold text-[.7rem]">
              <p>{chatUser.name}</p>
            </div>
            <div className="w-[4.875rem] relative text-[.6rem] md:text-[0.75rem] leading-[0.938rem] font-circular-std text-gray-500 inline-block z-[2]">
              {chatUser.status ? chatUser.status : "Active now"}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex text-${
          theme.palette.mode === "dark" ? "white" : "black"
        } `}
      >
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
