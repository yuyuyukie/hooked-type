import React, { useContext, useEffect } from "react";
import { Context } from "../contexts/Context";
import { firebaseApp } from "../firebase";
import { MovieObject } from "./App";
import FavoriteMode, { isMovieObject } from "./FavoriteMode";
import PageSwitcher from "./PageSwitcher";
import SearchMode from "./SearchMode";

// enumの代替。
// const DATABASE_ORDER = {
//   standby: "standby",
//   add: "add",
//   delete: "delete",
//   fetch: "fetch",
// };
// // eslint-disable-next-line @typescript-eslint/no-redeclare
// type DATABASE_ORDER = typeof DATABASE_ORDER[keyof typeof DATABASE_ORDER];
// type ACTION = { type: ACTION; target: MovieObject[] };
// type MoviesState = {
//   favoriteMovies: MovieObject[];
//   databaseOrder: DATABASE_ORDER;
//   target?: MovieObject;
// };

// const reducer = (state: MoviesState, action: ACTION): MoviesState => {

// };
const db = firebaseApp.firestore();
const MovieHolder: React.FC = () => {
  // ログインしてないなら説明＋誘導
  const context = useContext(Context);
  const currentUser = context.state.currentUser;
  const currentMode = context.state.currentMode; // asyncのため更新検知
  const dispatch = context.dispatch;
  // async の購読解除、アップデート用
  useEffect(() => {
    if (currentUser && dispatch) {
      dispatch({ type: "database-fetch-request" });
      const favMoviesRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("favoriteMovies");
      favMoviesRef.get().then((snapshot) => {
        const fetchedMovies: MovieObject[] = [];
        snapshot.forEach((doc) => {
          // 本当はisMovieObjectを使いたいが、コンパイルエラーが発生する
          const movie = doc.data();
          if (isMovieObject(movie)) {
            fetchedMovies.push(movie);
          }
          dispatch({ type: "database-fetch-success", payload: fetchedMovies });
        });
      });
    }
  }, [currentUser]);
  if (!currentUser && currentMode === "favorite") {
    return (
      <div className="notLoggedInMessage" style={{ fontSize: "1.5rem" }}>
        We need you to "Sign in" to use this functionality.
      </div>
    );
  }

  return (
    <>
      <PageSwitcher showIndex={currentMode === "search" ? 0 : 1}>
        <SearchMode />
        <FavoriteMode />
      </PageSwitcher>
    </>
  );
};
export default MovieHolder;
