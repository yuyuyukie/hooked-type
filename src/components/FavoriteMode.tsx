import React, { useEffect, useState } from "react";
import firebase from "../firebase";
import { movieDivFactory, MovieObject } from "./App";
const db = firebase.firestore();

export const isMovieObject = (obj: any): obj is MovieObject => {
  return (
    typeof obj.Title === "string" &&
    typeof obj.Type === "string" &&
    typeof obj.Poster === "string" &&
    typeof obj.Year === "string" &&
    typeof obj.imdbID === "string"
  );
};

type Props = { userState: firebase.User | null };
export const FavoriteMode: React.FC<Props> = (props: Props): JSX.Element => {
  // ログインしてないなら説明＋誘導
  const user: firebase.User | null = props.userState;
  // asyncのため更新検知
  const [loading, setLoading] = useState<boolean>(false);
  const [favMovies, setFavMovies] = useState<MovieObject[]>([]);
  // async の購読解除、アップデート用
  useEffect(() => {
    if (user) {
      const favMoviesRef = db
        .collection("users")
        .doc(user.uid)
        .collection("favoriteMovies");
      setLoading(true);
      favMoviesRef.get().then((snapshot) => {
        console.log(snapshot.size);
        snapshot.forEach((doc) => {
          const movie = doc.data();
          if (isMovieObject(movie)) {
            setFavMovies((movies) => [...movies, movie]);
          }
        });
        setLoading(false);
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="notLoggedInMessage" style={{ fontSize: "1.5rem" }}>
        We need you to "Sign in" to use this functionality.
      </div>
    );
  }
  const createFavMovieDiv = (movies: MovieObject[], loading: boolean) => {
    console.log(movies);
    if (loading) {
      return <span>loading...</span>;
    }
    return movieDivFactory(movies);
  };
  console.log(favMovies);
  return (
    <React.Fragment>
      <div className="toolbox" />
      <div className="favoriteMoviesContainer">
        {createFavMovieDiv(favMovies, loading)}
      </div>
    </React.Fragment>
  );
};
