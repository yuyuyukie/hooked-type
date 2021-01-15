import React, { useReducer, useEffect, useState, useContext } from "react";
import "../App.css";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import firebase, { firebaseApp } from "../firebase";
import FavoriteMode from "./FavoriteMode";
import { AuthContext } from "./AuthProvider";
import Main from "./Main";
// react context for firebase users
// import firebase from "firebase";

export interface MovieObject {
  Title: string;
  Type: string;
  Poster: string;
  Year: string;
  imdbID: string;
  favorite?: boolean;
}
export type Props = {
  search?: (searchValue: string) => void;
  text?: string;
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
export enum Mode {
  Search,
  Favorite,
}
export const movieDivFactory = (movies: MovieObject[]): JSX.Element[] => {
  return movies.map(
    (movie: MovieObject, index: number): JSX.Element => {
      return <Movie key={`${index}-${movie.Title}`} movie={movie} />;
    }
  );
};

const App: React.FunctionComponent = () => {
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
  const currentUser = useContext(AuthContext);
  // fetch movieのreducer
  const [state, dispatch] = useReducer(reducer, initialState);
  // 認証画面の表示状態
  const [isShowModal, toggleShowModal] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.Search);
  const search = (searchValue: string) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });
    // // firestoreにも検索をかける
    // const searchFavMoviesFromDB = (
    //   searchValue: string,
    //   user: firebase.User,
    //   db: firebase.firestore.Firestore
    // ) => {
    //   db.collection("users").doc(user.uid).collection("favoriteMovies").get().then((snapshot) => {
    //     snapshot.forEach(doc => {
    //       const movie = doc.data();
    //       if (isMovieObject(movie)) {

    //       }
    //     })
    //   })
    // };
    // if (userState) {
    //   searchFavMoviesFromDB(searchValue, userState, db);
    // }
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
  const showMovies = (movies: MovieObject[]) => {
    if (errorMessage) {
      return <div className="errorMessage">{errorMessage}</div>;
    } else if (loading) {
      return <span>loading...</span>;
    }
    return movieDivFactory(movies);
  };
  return (
    <div className="App">
      <Header
        text="HookedType"
        isShowModal={isShowModal}
        toggleShowModal={toggleShowModal}
      />
      <ul className="modeSelector">
        テスト用なのでサイドバーに置換予定
        <li
          className="search"
          onClick={() => {
            setMode(Mode.Search);
          }}
        >
          Search
        </li>
        <li
          className="favorite"
          onClick={() => {
            setMode(Mode.Favorite);
          }}
        >
          Favorite
        </li>
      </ul>
      <Main mode={mode} />
      {mode === Mode.Search ? (
        <div className="mainContainer">
          <Search search={search} />
          <div className="moviesContainer">{showMovies(movies)}</div>
        </div>
      ) : (
        <FavoriteMode />
      )}
    </div>
  );
};

export default App;
