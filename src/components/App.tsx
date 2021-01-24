import React, { useContext } from "react";
import { switchMode } from "../actions/ActionCreator";
import "../App.css";
import { Context, Mode } from "../contexts/Context";
import { Footer } from "./Footer";
import Header from "./Header";
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

const App: React.FunctionComponent = () => {
  // 認証画面の表示状態
  const context = useContext(Context);
  const currentMode = context.state.currentMode;
  const dispatch = context.dispatch;
  const isLoading =
    context.state.loadingDatabase ||
    context.state.loadingSearch ||
    !context.state.currentUser;
  const modeSelectorStyle = {
    backgroundColor: "#282c34",
    color: "#eeeeee",
  };

  return (
    <div className="App">
      <Header text={isLoading ? "HookedTypo" : "HookedType"} />
      <ul className="modeSelector">
        <li
          className="search"
          style={currentMode === "search" ? modeSelectorStyle : {}}
          onClick={() => switchMode(dispatch, Mode.search)}
        >
          Search
        </li>
        <li
          className="favorite"
          style={currentMode === "favorite" ? modeSelectorStyle : {}}
          onClick={() => switchMode(dispatch, Mode.favorite)}
        >
          Favorite
        </li>
      </ul>
      <MovieHolder />
      <Footer />
    </div>
  );
};

export default App;
