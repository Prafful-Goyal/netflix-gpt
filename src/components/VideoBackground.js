import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer.js";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  //Note:If I am using redux store I don't need to keep useState[trailerID,setTrailerId] here.So,basically I will correct to the store and fetch it from the store
  useMovieTrailer(movieId);

  return (
    <div className=" w-screen">
      {/* We basically Embeded youtube video on our page and that video is elemental trailer */}
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
