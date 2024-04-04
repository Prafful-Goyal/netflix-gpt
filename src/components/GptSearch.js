import { BG_URL } from "../utils/constants.js";
import GptMovieSuggestion from "./GptMovieSuggestion.js";
import GptSearchBar from "./GptSearchBar.js";

const GptSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img
          className="h-screen object-cover md:w-screen "
          src={BG_URL}
          alt="logo"
        />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};

export default GptSearch;
