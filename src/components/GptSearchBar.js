import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);

  //We Use "useref()" for getting the input box data of GPTSearch(There are multiple ways to do the same thing)
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results; //It will take some time to get results it will not hapen immediately and this will return a "Promise" not results
  };

  const handleGptSearchClick = async () => {
    console.log(searchText.current.value);
    //By Using searchText I will make an API Call to GPT API and get Movie Results

    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      // TODO: Write Error Handling here
    }

    console.log(gptResults.choices?.[0]?.message?.content);

    // Andaz Apna Apna, Chupke Chupke, Amar Akbar Anthony, Padosan, Jaane Bhi Do Yaaro
    const gptMovies = gptResults.choices?.[0]?.message?.content.split(","); //By this we will get Array of Movies ([Andaz Apna Apna, Chupke Chupke, Amar Akbar Anthony, Padosan, Jaane Bhi Do Yaaro])

    //For each movie I will search TMDB API

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie)); //It will call an API for each movie and for each movie we will get promises or example for 5 movies -> [Promise,Promise,Promise,Promise,Promise] and Promise will take some time to resolve

    //Note:For tmdbResults I will have to get the results from all the Promises for that there is a function "Promise.all()" And this "Promise.all()" take the array of Promises
    const tmdbResults = await Promise.all(promiseArray); //[Promise,Promise,Promise,Promise,Promise] so my programmed will wait For my Promise.all() to finish and Promise.all() only finish once my all 5 promises are resolved after that I will get the data in "tmdbResults".So this tmdbResults resolve all the Promises and get the results
    console.log(tmdbResults);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
    );
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
