import { Play } from "lucide-react";
import { Info } from "lucide-react";
const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-6 md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/4">{overview}</p>
      <div className="my-4 md:m-0">
        {/* <button className=" bg-white text-black p-4 px-12 text-xl rounded-lg hover:bg-opacity-80">
          Play
        </button> */}
        <button className=" px-4 py-1 md:hover:scale-95  md:px-8 md:py-2 rounded-md text-center mr-4  bg-white hover:bg-gray-200  text-black font-semibold text-xl">
          <Play fill="black" className="inline mb-1" /> Play
        </button>
        {/* <button className="mx-2 bg-gray-500 text-white p-4 px-14 text-xl bg-opacity-50 rounded-lg">
          More Info
        </button> */}
        <button className="hidden md:inline-block px-4 md:hover:scale-95 py-1 md:px-8 md:py-2 rounded-md bg-gray-500 text-white bg-opacity-50 font-semibold text-xl">
          <Info className="inline mb-1 " /> Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
