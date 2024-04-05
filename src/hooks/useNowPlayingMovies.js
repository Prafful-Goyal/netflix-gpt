import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { addNowPlayingMovies } from "../utils/moviesSlice.js";
import { useSelector } from "react-redux";

const useNowPlayingMovies = () => {
  //This below code basically fetching the data and put these movies into store

  //So,basically we are trying to fetch movies data from TMDB API and update store with all those movies

  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  //Make An Api Call Here
  const getNowPlayingMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        API_OPTIONS
      );
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      const json = await data.json();
      //console.log(json.results);
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  }, [dispatch]);
  //I will make an "API" Call using "useEffect" so that I will make an "API" call only once
  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, [getNowPlayingMovies, nowPlayingMovies]);

  return nowPlayingMovies;
};

export default useNowPlayingMovies;
