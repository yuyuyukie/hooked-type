import React, { useContext, useEffect, useState } from "react";
import { firebaseApp } from "../firebase";
import { Mode, MovieObject } from "./App";
import { AuthContext } from "./AuthProvider";
import FavoriteMode, { isMovieObject } from "./FavoriteMode";
import PageSwitcher from "./PageSwitcher";
import SearchMode from "./SearchMode";

type Props = {
  showMode: Mode;
};

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
const MovieHolder: React.FC<Props> = (props) => {
  // ログインしてないなら説明＋誘導
  const currentUser = useContext(AuthContext);
  // asyncのため更新検知
  const [favMovies, setFavMovies] = useState<MovieObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // async の購読解除、アップデート用
  useEffect(() => {
    if (currentUser) {
      const favMoviesRef = db
        .collection("users")
        .doc(currentUser.uid)
        .collection("favoriteMovies");
      setLoading(true);
      favMoviesRef.get().then((snapshot) => {
        const fetchedMovies: MovieObject[] = [];
        snapshot.forEach((doc) => {
          // 本当はisMovieObjectを使いたいが、コンパイルエラーが発生する
          const movie = doc.data();
          if (isMovieObject(movie)) {
            fetchedMovies.push(movie);
          }
          setFavMovies(fetchedMovies);
        });
        setLoading(false);
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="notLoggedInMessage" style={{ fontSize: "1.5rem" }}>
        We need you to "Sign in" to use this functionality.
      </div>
    );
  }

  // const [searchMovies, setSearchMovies] = useState<MovieObject[]>([]);
  // SearchModeでお気に入りに入れた映画があるか判定するために橋渡しするMovieObject[]
  // const initialMoviesState: MoviesState = {
  //   favoriteMovies: [],
  //   databaseOrder: DATABASE_ORDER.fetch,
  // };
  // const [moviesState, dispatch] = useReducer(reducer, initialMoviesState);
  return (
    <>
      <PageSwitcher showIndex={props.showMode === "search" ? 0 : 1}>
        <SearchMode
          setFavMovies={setFavMovies}
          favMovies={favMovies}
          // dispatch={dispatch}
          // moviesState={moviesState}
        />
        <FavoriteMode
          loading={loading}
          setFavMovies={setFavMovies}
          favMovies={favMovies}
          // dispatch={dispatch}
          // moviesState={moviesState}
        />
      </PageSwitcher>
    </>
  );
};
export default MovieHolder;
