import { useTheme } from "@emotion/react";
import ImgAndPlaceHolder from "components/ImgAndPlaceHolder";
import React from "react";
import { timeAgo } from "utils/helper";

const ChatCard = ({ user, didChat, handleclick }) => {
  //   console.log("Fucker");
  if (didChat) console.log(user);
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const checkTime = (time) => {
    const lastMessageDate = new Date(time);
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - lastMessageDate;

    // Convert milliseconds to hours
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);

    // Check if the difference is greater than 24 hours
    if (differenceInHours > 24) {
      return false;
    } else {
      return true;
    }
  };

  const theme = useTheme();
  return (
    <div
      className="flex flex-row items-center justify-between lg:justify-evenly w-full h-20 cursor-pointer  "
      onClick={() => handleclick(user)}
    >
      <button className="cursor-pointer h-12 w-12  relative rounded-full">
        <ImgAndPlaceHolder
          className="absolute h-full w-full top-0 left-0 rounded-full "
          alt=""
          src={
            user?.picturePath ? user?.picturePath : "https://i.pravatar.cc/300"
          }
        />
        {user.status === "ONLINE" && (
          <div className="absolute bottom-1 right-1  rounded-[50%] bg-green-400 w-[0.5rem] h-[0.5rem] z-[1]" />
        )}
      </button>
      <div className="flex flex-col items-start justify-start gap-1 w-1/2  ">
        <b className="  font-bold  w-[14rem] text-[.7rem] lg:text-xs">
          {user ? user?.name : "N / A"}
        </b>
        <div className=" text-[0.70rem] leading-[0.75rem] text-gray-800 inline-block ">
          {/* {user.bio ? user.bio : "No Bio Available"} */}
          <p
            className={`text-${
              theme.palette.mode === "dark" ? "white" : "black"
            }`}
          >
            {didChat
              ? user.last_message[user.last_message.length - 1].message
              : "No Bio Available"}
          </p>
        </div>
      </div>
      {didChat ? (
        <div className="flex flex-col items-end justify-start gap-2">
          <div className="text-[.6rem] mt-2">
            {checkTime(user.last_message[user.last_message.length - 1].date)
              ? formatTime(user.last_message[user.last_message.length - 1].date)
              : timeAgo(
                  user.last_message[user.last_message.length - 1].date
                ).replace("ago", "")}
          </div>
          <div className="w-[1.375rem] h-[1.375rem] relative text-white rounded-full flex items-center justify-center"></div>
        </div>
      ) : (
        <div className="flex flex-col items-end justify-start gap-2 w-14"></div>
      )}
    </div>
  );
};

export default ChatCard;
