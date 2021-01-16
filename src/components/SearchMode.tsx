import React, { useEffect, useReducer } from "react";
import { movieDivFactory, MovieObject } from "./App";
import Search from "./Search";

const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=1105ff36&";

type State = {
  loading: boolean;
  movies: MovieObject[];
  errorMessage: null | string;
};
const initialState: State = {
  loading: true,
  movies: [],
  errorMessage: null,
};
type ACTIONTYPE =
  | { type: "SEARCH_MOVIES_REQUEST" }
  | { type: "SEARCH_MOVIES_SUCCESS"; payload: MovieObject[] }
  | { type: "SEARCH_MOVIES_FAILURE"; error: any };
function reducer(state: State, action: ACTIONTYPE) {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error();
  }
}
type Props = {
  favMovies: MovieObject[];
  setFavMovies: React.Dispatch<React.SetStateAction<MovieObject[]>>;
};

const SearchMode: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const search = (searchValue: string) => {
    console.log("search start");
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });
    const searchUrl: string = searchValue ? `s=${searchValue}&` : "";
    const fullUrl: string = MOVIE_API_URL + searchUrl;
    console.log(fullUrl);
    (async function (url: string): Promise<void> {
      const response = await fetch(url);
      const JSONResponse = await response.json();
      if (JSONResponse.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: JSONResponse.Search,
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: JSONResponse.Error,
        });
      }
    })(fullUrl);
  };
  useEffect(() => {
    search("man");
  }, []);
  console.log(props.favMovies);
  const { movies, errorMessage, loading } = state;
  const showMovies = (movies: MovieObject[]) => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    }
    if (loading) {
      return <span>loading...</span>;
    }
    const favTitles = props.favMovies.map((movie) => {
      return movie.imdbID;
    });
    const moviesWithFav = movies.map((movie) => {
      if (favTitles.includes(movie.imdbID)) {
        movie.favorite = true;
      }
      return movie;
    });
    return movieDivFactory(moviesWithFav);
  };
  return (
    <div className="mainContainer">
      <Search search={search} />
      <div className="moviesContainer">{showMovies(movies)}</div>
    </div>
  );
};
export default SearchMode;
