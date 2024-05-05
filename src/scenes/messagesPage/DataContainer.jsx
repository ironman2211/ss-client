import FrameComponent from "./components/FrameComponent.jsx";
import ContainerContainer from "./components/ContainerContainer.jsx";
import Navbar from "scenes/navbar/index.jsx";
import ChatCard from "./widgets/ChatCard.jsx";
import { Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
const DataContainer = () => {
  return (
    <div
      className="w-screen h-screen bg-white"
      style={{
        fontFamily: "poppins",
      }}
    >
      <Navbar />
      <hr />
      <main className="flex flex-row flex-wrap items-start justify-start md:px-20 md:py-5 md:p-2  ">
        <div className=" flex flex-col items-start justify-start max-w-full p-8  border-r-2 border-gray-200   ">
          <div className=" w-[20.438rem] h-[70vh] self-stretch flex flex-col items-end justify-start gap-2 max-w-full ">
            <div className="flex  w-full h-12 mb-">
              {/* <input
                className="w-full p-5 outline-none border-2 rounded-2xl"
                placeholder="Search.."
              /> */}
              <div className=" flex w-full px-2 item-center justify-between">
                <b className="text-2xl font-bold">Chats</b>
                <SearchIcon className="text-xl cursor-pointer mt-4" />
              </div>
            </div>
            <ChatCard />
          </div>
        </div>
        <section className="flex-1  bg-white box-border flex flex-col items-end justify-start pt-[1.5rem] px-[1.25rem] pb-[2.437rem] gap-[4.437rem] min-w-[47.813rem] max-w-full text-left text-[0.75rem] text-gray-200 font-circular-std   lg:gap-[2.188rem] mq1050:pt-[1.25rem] mq1050:pb-[1.563rem] mq1050:min-w-full mq450:pb-[1.25rem]  mq750:gap-[1.125rem]">
          <div className="w-[73.563rem] h-[55.938rem] relative rounded-3xl bg-white box-border hidden max-w-full  " />
          <FrameComponent />
          <ContainerContainer />
          <div className="w-full  flex items-center justify-center p-4 gap-5">
            <button className="bg-transparent outline-none w-12 text-black">
              <AttachFileIcon />
            </button>
            <input className="w-10/12 px-4 py-3 outline-none text-black rounded-xl bg-gray-100 " />
            <button className="bg-transparent outline-none  bg-green-600 h-10 w-10 rounded-full">
              <SendIcon />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
export default DataContainer;
