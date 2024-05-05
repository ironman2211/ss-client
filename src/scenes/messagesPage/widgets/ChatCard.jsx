import React from "react";

const ChatCard = ({ user, didChat, handleclick }) => {
  console.log("Fucker");
  console.log(user);
  return (
    <div
      className="flex flex-row items-center justify-between w-full h-20 p-3 cursor-pointer"
      onClick={() => handleclick(user)}
    >
      <button className="cursor-pointer h-14 w-14 bg-red-300 relative rounded-full">
        <img
          className="absolute h-full w-full top-0 left-0 rounded-full "
          alt=""
          src={
            user?.picturePath ? user?.picturePath : "https://i.pravatar.cc/300"
          }
        />
        <div className="absolute bottom-1 right-1  rounded-[50%] bg-green-400 w-[0.5rem] h-[0.5rem] z-[1]" />
      </button>
      <div className=" flex flex-col items-start justify-start gap-2 w-40 ">
        <h2 className=" text-base font-bold  w-[15rem]">
          {user ? user?.firstName + " " + user.lastName : "N / A"}
        </h2>
        <div className=" text-[0.75rem] leading-[0.75rem] text-gray-800 inline-block ">
          How are you today?
        </div>
      </div>
      {didChat ? (
        <div className="flex flex-col items-end justify-start gap-2">
          <div className="text-xs mt-2">2 min ago</div>
          <div className="w-[1.375rem] h-[1.375rem] relative text-white bg-red-500 rounded-full flex items-center justify-center">
            3
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end justify-start gap-2 w-14"></div>
      )}
    </div>
  );
};

export default ChatCard;
