import React, { useContext, useEffect, useReducer } from "react";
import { Context } from "../contexts/Context";
import { MovieObject } from "./App";
import Movie from "./Movie";
import MovieContainer from "./MovieContainer";
import Search from "./Search";

// type State = {
//   loadingSearch: boolean;
//   movies: MovieObject[];
//   errorMessage: null | string;
// };
// const initialState: State = {
//   loadingSearch: true,
//   movies: [],
//   errorMessage: null,
// };
// export type ACTIONTYPE =
//   | { type: "SEARCH_MOVIES_REQUEST" }
//   | { type: "SEARCH_MOVIES_SUCCESS"; payload: MovieObject[] }
//   | { type: "SEARCH_MOVIES_FAILURE"; error: string };
// const reducer: React.Reducer<State, ACTIONTYPE> = (
//   state: State,
//   action: ACTIONTYPE
// ): State => {
//   switch (action.type) {
//     case "SEARCH_MOVIES_REQUEST":
//       return {
//         ...state,
//         loadingSearch: true,
//         errorMessage: null,
//       };
//     case "SEARCH_MOVIES_SUCCESS":
//       return {
//         ...state,
//         loadingSearch: false,
//         movies: action.payload,
//       };
//     case "SEARCH_MOVIES_FAILURE":
//       return {
//         ...state,
//         loadingSearch: false,
//         errorMessage: action.error,
//       };
//     default:
//       throw new Error();
//   }
// };

const SearchMode: React.FC = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(props.favMovies);
  const { state, dispatch } = useContext(Context);
  const favoriteMovies = state.favoriteMovies;
  const { fetchedMovies, errorMessage, loadingSearch } = state;
  const showMovies = (fetchedMovies: MovieObject[]) => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    }
    if (loadingSearch) {
      return <span>loading...</span>;
    }
    const favTitles = favoriteMovies.map((movie) => {
      return movie.imdbID;
    });
    const moviesWithFav = fetchedMovies.map((movie) => {
      if (favTitles.includes(movie.imdbID)) {
        movie.favorite = true;
      } else {
        movie.favorite = false;
      }
      return movie;
    });
    return moviesWithFav.map(
      (movie: MovieObject, index: number): JSX.Element => {
        return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
      }
    );
  };

  return (
    <div className="mainContainer">
      {dispatch ? <Search dispatch={dispatch} /> : <Search />}
      <MovieContainer>{showMovies(fetchedMovies)}</MovieContainer>
    </div>
  );
};
export default SearchMode;
