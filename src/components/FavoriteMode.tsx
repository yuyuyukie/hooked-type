import React, { useContext, useEffect, useState } from "react";
import firebase, { firebaseApp } from "../firebase";
import { movieDivFactory, MovieObject } from "./App";
import { AuthContext } from "./AuthProvider";
const db = firebaseApp.firestore();

// export const isMovieObject = (obj: any): obj is MovieObject => {
//   return (
//     typeof obj.Title === "string" &&
//     typeof obj.Type === "string" &&
//     typeof obj.Poster === "string" &&
//     typeof obj.Year === "string" &&
//     typeof obj.imdbID === "string"
//   );
// };

type Props = {
  favMovies: MovieObject[];
  setFavMovies: React.Dispatch<React.SetStateAction<MovieObject[]>>;
  loading: boolean;
};
const FavoriteMode: React.FC<Props> = (props: Props): JSX.Element => {
  // // ログインしてないなら説明＋誘導
  // const currentUser = useContext(AuthContext);
  // // asyncのため更新検知
  // const [loading, setLoading] = useState<boolean>(false);
  // // async の購読解除、アップデート用
  // useEffect(() => {
  //   if (currentUser) {
  //     const favMoviesRef = db
  //       .collection("users")
  //       .doc(currentUser.uid)
  //       .collection("favoriteMovies");
  //     setLoading(true);
  //     favMoviesRef.get().then((snapshot) => {
  //       console.log(snapshot.size);
  //       snapshot.forEach((doc) => {
  //         // 本当はisMovieObjectを使いたいが、コンパイルエラーが発生する
  //         const movie = doc.data() as MovieObject;
  //         props.setFavMovies((movies) => [...movies, movie]);
  //       });
  //       setLoading(false);
  //     });
  //   }
  // }, [currentUser]);

  // if (!currentUser) {
  //   return (
  //     <div className="notLoggedInMessage" style={{ fontSize: "1.5rem" }}>
  //       We need you to "Sign in" to use this functionality.
  //     </div>
  //   );
  // }
  const createFavMovieDiv = (movies: MovieObject[], loading: boolean) => {
    movies.forEach((movie) => {
      movie.favorite = true;
    });
    if (loading) {
      return <span>loading...</span>;
    }
    return movieDivFactory(movies);
  };
  return (
    <React.Fragment>
      <div className="toolbox" />
      <div className="favoriteMoviesContainer">
        {createFavMovieDiv(props.favMovies, props.loading)}
      </div>
    </React.Fragment>
  );
};
export default FavoriteMode;
