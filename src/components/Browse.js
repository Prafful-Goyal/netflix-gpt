import Header from "./Header.js";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies.js";
import MainContainer from "./MainContainer.js";
import SecondaryContainer from "./SecondaryContainer.js";
import usePopularMovies from "../hooks/usePopularMovies.js";
import GptSearch from "./GptSearch.js";
import { useSelector } from "react-redux";

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  useNowPlayingMovies(); //This hook was basically fetching the NowPlaying movies and updating the store
  usePopularMovies(); //This hook was basically fetching the popular movies and updating the store

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      {/* 
       MainContainer
        - VideoBackground
        - VideoTitle
      SecondaryContainer
       - MovieList * n
        - cards * n
      
       */}
    </div>
  );
};

export default Browse;
