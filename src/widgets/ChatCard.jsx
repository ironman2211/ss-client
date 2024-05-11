import React from "react";

const ChatCard = ({ user, didChat, handleclick }) => {
  //   console.log("Fucker");
  if (didChat) console.log(user);
  return (
    <div
      className="flex flex-row items-center justify-between w-full h-20 cursor-pointer "
      onClick={() => handleclick(user)}
    >
      <button className="cursor-pointer h-12 w-12  relative rounded-full">
        <img
          className="absolute h-full w-full top-0 left-0 rounded-full "
          alt=""
          src={
            user?.picturePath ? user?.picturePath : "https://i.pravatar.cc/300"
          }
        />
        {user.status == "ONLINE" && (
          <div className="absolute bottom-1 right-1  rounded-[50%] bg-green-400 w-[0.5rem] h-[0.5rem] z-[1]" />
        )}
      </button>
      <div className=" flex flex-col items-start justify-start gap-2 bg-red w-3/5  ml-3  ">
        <b className=" text-base font-bold  w-[14rem] text-xs">
          {user ? user?.name : "N / A"}
        </b>
        <div className=" text-[0.70rem] leading-[0.75rem] text-gray-800 inline-block ">
          {/* {user.bio ? user.bio : "No Bio Available"} */}
          {didChat
            ? user.last_message[user.last_message.length - 1].message
            : "No Bio Available"}
        </div>
      </div>
      {didChat ? (
        <div className="flex flex-col items-end justify-start gap-2">
          <div className="text-[.7rem] mt-2">2 min ago</div>
          <div className="w-[1.375rem] h-[1.375rem] relative text-white rounded-full flex items-center justify-center">
            
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end justify-start gap-2 w-14"></div>
      )}
    </div>
  );
};

export default ChatCard;
