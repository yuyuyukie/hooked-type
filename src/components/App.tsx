import React, { useReducer, useEffect, useState } from "react";
import "../App.css";
import { Header } from "./Header";
import { Search } from "./Search";
import { Movie } from "./Movie";
import firebase from "../firebase";
// react context for firebase users
// import firebase from "firebase";

export interface MovieObject {
  Title: string;
  Type: string;
  Poster: string;
  Year: string;
  imdbID: string;
}
export type Props = {
  search?: (searchValue: string) => void;
  text?: string;
  userState?: firebase.User | null;
  setUserState?: React.Dispatch<React.SetStateAction<firebase.User | null>>;
};

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

export const App: React.FunctionComponent = () => {
  // const [loading, setLoading] = useState(true);
  // const [movies, setMovies] = useState<MovieObject[]>([]);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [searchValue, setSearchValue] = useState("");
  // function userReducer(state: undefined|firebase.User, action: any):undefined|firebase.User {
  //   if (state) {
  //     return state;
  //   }else {
  //     return;
  //   }
  // }
  // const [userState, userDispatch] = useReducer(userReducer, {});
  const [userState, setUserState] = useState<firebase.User | null>(null);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setUserState(user);
    } else {
      setUserState(null);
    }
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  // userがログイン
  const [isShowModal, toggleShowModal] = useState<boolean>(false);
  const search = (searchValue: string) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });
    // setLoading(true);
    // setErrorMessage(null);
    const searchUrl: string = searchValue ? `s=${searchValue}&` : "";
    const fullUrl: string = MOVIE_API_URL + searchUrl;
    console.log(fullUrl);
    // fetch(fullUrl)
    //   .then((response) => response.json())
    //   .then((jsonResponse) => {
    //     if (jsonResponse.Response === "True") {
    //       setMovies(jsonResponse.Search);
    //       setLoading(false);
    //       console.log(jsonResponse);
    //     } else {
    //       setErrorMessage(jsonResponse.Error);
    //       setLoading(false);
    //     }
    //   });
    (async function (url: string): Promise<void> {
      const response = await fetch(url);
      const JSONResponse = await response.json();
      if (JSONResponse.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: JSONResponse.Search,
        });
        // setMovies(JSONResponse.Search);
        // setLoading(false);
        console.log(JSONResponse);
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: JSONResponse.Error,
        });
        // setErrorMessage(JSONResponse.Error);
        // setLoading(false);
      }
    })(fullUrl);
  };
  // initialization
  useEffect(() => {
    search("man");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { movies, errorMessage, loading } = state;
  const createMoviesDivs = () => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    } else if (loading) {
      return <span>loading...</span>;
    }
    if (movies != null) {
      return movies.map(
        (movie: MovieObject, index: number): JSX.Element => {
          return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
        }
      );
    }
  };
  console.log(createMoviesDivs());
  return (
    <div className="App">
      <Header
        text="HookedType"
        userState={userState}
        setUserState={setUserState}
        isShowModal={isShowModal}
        toggleShowModal={toggleShowModal}
      />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favorite movies</p>
      <div className="movies">{createMoviesDivs()}</div>
    </div>
  );
};
