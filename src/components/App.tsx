import React, { useContext, useState } from "react";
import "../App.css";
import { Context } from "../contexts/Context";
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

const App: React.FunctionComponent = () => {
  // 認証画面の表示状態
  const [isShowModal, toggleShowModal] = useState<boolean>(false);
  const context = useContext(Context);
  const currentMode = context.state.currentMode;
  const setMode = context.dispatch;
  const isLoading =
    context.state.loadingDatabase ||
    context.state.loadingSearch ||
    !context.state.currentUser;
  if (setMode == null) {
    throw new Error();
  }
  const modeSelectorStyle = {
    backgroundColor: "#282c34",
    color: "#eeeeee",
  };

  return (
    <div className="App">
      <Header
        text={isLoading ? "HookedTypo" : "HookedType"}
        isShowModal={isShowModal}
        toggleShowModal={toggleShowModal}
      />
      <ul className="modeSelector">
        <li
          className="search"
          style={currentMode === "search" ? modeSelectorStyle : {}}
          onClick={() => {
            setMode({ type: "mode-switch", data: "search" });
          }}
        >
          Search
        </li>
        <li
          className="favorite"
          style={currentMode === "favorite" ? modeSelectorStyle : {}}
          onClick={() => {
            setMode({ type: "mode-switch", data: "favorite" });
          }}
        >
          Favorite
        </li>
      </ul>
      <MovieHolder />
    </div>
  );
};

export default App;
