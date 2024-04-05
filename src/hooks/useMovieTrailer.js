import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { addTrailerVideo } from "../utils/moviesSlice.js";
//import { get } from "firebase/database";

//Hook is just a normal javaScript function
const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies.popularMovies);
  // fetch trailer video && updating the store with trailer video data -> I will have to make an API call
  const getMovieVideos = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
          movieId +
          "/videos?language=en-US",
        API_OPTIONS
      );
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      const json = await data.json();
      //console.log(json);

      const filterData = json.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results[0]; //We just write this to handle errors
      //console.log(trailer);
      dispatch(addTrailerVideo({ movieId, trailer }));
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  }, [dispatch, movieId]);
  useEffect(() => {
    if (!trailerVideo) {
      getMovieVideos();
    }
    // Cleanup function to cancel ongoing fetch requests
    return () => {
      // TODO: Implement an AbortController to cancel the fetch request if needed
    };
  }, [getMovieVideos, trailerVideo]);

  return trailerVideo;
};

export default useMovieTrailer;
