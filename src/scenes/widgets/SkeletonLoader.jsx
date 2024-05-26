import WidgetWrapper from "components/WidgetWrapper";
import React from "react";

function SkeletonLoader({ theme, mainPage }) {
  const darkMode = theme === "dark";

  return (
    <div className="flex flex-col">
      {[...Array(2)].map((_, index) => (
        <WidgetWrapper mb="1.3rem" key="index">
          <div className="flex items-center ">
            {/* Circle placeholder for image */}
            <div
              className={`w-14 h-14 rounded-full mr-4  ${
                darkMode ? "bg-[#383838]" : "bg-gray-100 "
              }`}
            >
              {/* <div className={`${darkMode ? "dark-placeholder" : "light-placeholder"} rounded-full`} /> */}
            </div>
            {/* Two lines for text placeholder */}
            <div className="flex-1">
              <div
                className={`${
                  darkMode ? "dark-placeholder" : "light-placeholder"
                } w-20 h-3 mb-2 min-h-[15px] rounded`}
              />
              <div
                className={`${
                  darkMode ? "dark-placeholder" : "light-placeholder"
                } w-24 h-3 min-h-[15px] rounded`}
              />
            </div>
          </div>
          <div
            className={`${
              darkMode ? "dark-placeholder" : "light-placeholder"
            } mt-4 w-full h-[50vh] rounded-lg`}
          >
            <div className="p-4 h-[30vh]"></div>
          </div>
        </WidgetWrapper>
      ))}
      <WidgetWrapper mb="1.3rem" key="index">
        <div className="flex items-center ">
          {/* Circle placeholder for image */}
          <div
            className={`w-14 h-14 rounded-full mr-4  ${
              darkMode ? "bg-[#383838]" : "bg-gray-100 "
            }`}
          >
            {/* <div className={`${darkMode ? "dark-placeholder" : "light-placeholder"} rounded-full`} /> */}
          </div>
          {/* Two lines for text placeholder */}
          <div className="flex-1">
            <div
              className={`${
                darkMode ? "dark-placeholder" : "light-placeholder"
              } w-20 h-3 mb-2 min-h-[15px] rounded`}
            />
            <div
              className={`${
                darkMode ? "dark-placeholder" : "light-placeholder"
              } w-24 h-3 min-h-[15px] rounded`}
            />
          </div>
        </div>
        <div
          className={`${
            darkMode ? "dark-placeholder" : "light-placeholder"
          } mt-4 w-full h-[50vh] rounded-lg`}
        >
          <div className="p-4 h-[30vh]"></div>
        </div>
      </WidgetWrapper>
    </div>
  );
}

export default SkeletonLoader;
