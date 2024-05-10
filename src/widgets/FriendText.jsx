import React from "react";

const FriendText = ({ name, picture, text }) => {
  return (
    <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[2.437rem] gap-[0.562rem]">
      
      <div className="flex items-center justify-start gap-2">
        <div className="h-9 w-9 rounded-full">
          <img src={picture} className="h-full w-full rounded-full" />
        </div>
        <span className="text-base font-semibold ">{name}</span>
      </div>
      <span className="bg-gray-100 w-fit p-3 rounded-b-xl ml-10">{text}</span>
      <span className=" w-fit  font-semibold  text-black-900  rounded-b-xl ml-11">
        10:79 AM
      </span>
    </div>
  );
};

export default FriendText;
