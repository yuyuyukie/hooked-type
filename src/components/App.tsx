import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import MovieHolder from "./MovieHolder";
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

export type Mode = "search" | "favorite";
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
  const [showMode, setShowMode] = useState<Mode>("search");
  const modeSelectorStyle = {
    backgroundColor: "#282c34",
    color: "#eeeeee",
  };

  return (
    <div className="App">
      <Header
        text="HookedType"
        isShowModal={isShowModal}
        toggleShowModal={toggleShowModal}
      />
      <ul className="modeSelector">
        <li
          className="search"
          style={showMode === "search" ? modeSelectorStyle : {}}
          onClick={() => {
            setShowMode("search");
          }}
        >
          Search
        </li>
        <li
          className="favorite"
          style={showMode === "favorite" ? modeSelectorStyle : {}}
          onClick={() => {
            setShowMode("favorite");
          }}
        >
          Favorite
        </li>
      </ul>
      <MovieHolder showMode={showMode} />
    </div>
  );
};

export default App;
