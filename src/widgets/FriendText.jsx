import { useTheme } from "@emotion/react";
import React from "react";

const FriendText = ({ name, picture, text, time }) => {
  const theme = useTheme();
  return (
    <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-[2.437rem] gap-[0.562rem]">
      <div className="flex items-center justify-start gap-2">
        <div className="h-8 w-8 rounded-full">
          <img src={picture} className="h-full w-full rounded-full" />
        </div>
        <span className="text-sm font-semibold ">{name}</span>
      </div>
      <span
        className="w-fit p-2 rounded-b-xl ml-10 text-xs rounded-tr-xl rounded-bl-xl"
        style={{
          backgroundColor: theme.palette.background.alt,
        }}
      >
        {text}
      </span>
      <span className="inline-block w-fit font-semibold text-black-900 rounded-none rounded-br-xl ml-11 text-[.6rem]">
        {time}
      </span>
    </div>
  );
};

export default FriendText;
