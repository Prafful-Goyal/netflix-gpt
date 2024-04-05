import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { addPopularMovies } from "../utils/moviesSlice.js";
import { useSelector } from "react-redux";

const usePopularMovies = () => {
  //This below code basically fetching the data and put these movies into store

  //So,basically we are trying to fetch movies data from TMDB API and update store with all those movies

  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  //Make An Api Call Here
  const getPopularMovies = useCallback(async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      if (!data.ok) {
        throw new Error(`HTTP error! Status: ${data.status}`);
      }
      const json = await data.json();
      //console.log(json.results);
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Error fetching popular videos:", error);
    }
  }, [dispatch]);
  //I will make an "API" Call using "useEffect" so that I will make an "API" call only once
  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, [getPopularMovies, popularMovies]);

  return popularMovies;
};

export default usePopularMovies;
