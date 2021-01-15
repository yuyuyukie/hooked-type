import React, { useReducer, useEffect, useState, useContext } from "react";
import "../App.css";
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";
import firebase, { firebaseApp } from "../firebase";
import FavoriteMode from "./FavoriteMode";
import { AuthContext } from "./AuthProvider";
import Main from "./Main";
import SearchMode from "./SearchMode";
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
  // 認証画面の表示状態
  const [isShowModal, toggleShowModal] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.Search);

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
      <SearchMode isVisible={mode === Mode.Search} />
      <FavoriteMode isVisible={mode === Mode.Favorite} />
    </div>
  );
};

export default App;
