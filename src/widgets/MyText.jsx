import React from "react";

const MyText = ({ text, time }) => {
  return (
    <div className="self-stretch flex flex-row items-start justify-end text-right">
      <div className="flex flex-col items-end justify-end">
      <span className="inline-block bg-green-100 text-green-900 w-fit p-2 rounded-xl rounded-br-none ml-10 text-xs">
          {text}
        </span>
        <span className=" w-fit font-semibold  text-green-900  rounded-b-xl mt-2  text-[.6rem]">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MyText;
