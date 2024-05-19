import { useTheme } from "@emotion/react";
import React from "react";

const MyText = ({ text, time }) => {
  const theme = useTheme();
  return (
    <div className="self-stretch flex flex-row items-start justify-end text-right">
      <div className="flex flex-col items-end justify-end">
        <span
          className="inline-block bg-green-100  w-fit p-2 rounded-xl rounded-br-none ml-10 text-xs"
          style={{
            backgroundColor: theme.palette.background.alt,
            color:theme.palette.mode === "dark" ? "#99ffa5" : "green"
          }}
        >
          {text}
        </span>
        <span className=" w-fit font-semibold   rounded-b-xl mt-2  text-[.6rem]" >
          {time}
        </span>
      </div>
    </div>
  );
};

export default MyText;
