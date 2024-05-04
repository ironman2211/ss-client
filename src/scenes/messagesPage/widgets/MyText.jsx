import React from "react";

const MyText = ({text}) => {
  return (
    <div className="self-stretch flex flex-row items-start justify-end text-right">
      <span className="bg-green-200 w-fit p-3 rounded-b-xl ml-14 text-green-900 text-bold">
        {text}
      </span>
    </div>
  );
};

export default MyText;
