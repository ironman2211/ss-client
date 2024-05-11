import React from "react";

const MyText = ({ text ,time}) => {
  return (
    <div className="self-stretch flex flex-row items-start justify-end text-right">
      <div className="flex flex-col items-end justify-end">
        <span className="bg-green-200 w-fit p-3 rounded-b-xl ml-14 text-green-900 text-bold">
          {text}
        </span>
        <span className=" w-fit font-semibold  text-green-900  rounded-b-xl mt-2">
          {time}
        </span>
      </div>
    </div>
  );
};

export default MyText;
