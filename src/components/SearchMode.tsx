import React, { useEffect, useReducer } from "react";
import { MovieObject } from "./App";
import Movie from "./Movie";
import MovieContainer from "./MovieContainer";
import Search from "./Search";

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
export type ACTIONTYPE =
  | { type: "SEARCH_MOVIES_REQUEST" }
  | { type: "SEARCH_MOVIES_SUCCESS"; payload: MovieObject[] }
  | { type: "SEARCH_MOVIES_FAILURE"; error: string };
const reducer: React.Reducer<State, ACTIONTYPE> = (
  state: State,
  action: ACTIONTYPE
): State => {
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
};
type Props = {
  favMovies: MovieObject[];
  setFavMovies: React.Dispatch<React.SetStateAction<MovieObject[]>>;
};

const SearchMode: React.FC<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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
    return movies.map(
      (movie: MovieObject, index: number): JSX.Element => {
        return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
      }
    );
  };
  return (
    <div className="mainContainer">
      <Search dispatch={dispatch} />
      <MovieContainer
        favMovies={props.favMovies}
        setFavMovies={props.setFavMovies}
      >
        {showMovies(movies)}
      </MovieContainer>
    </div>
  );
};
export default SearchMode;
