import React, { useContext, useState } from "react";
import { MovieObject } from "./App";
import { firebaseApp } from "../firebase";
import { Context } from "../contexts/Context";
const db = firebaseApp.firestore();

type Props = {
  key: string;
  movie: MovieObject;
};
// OMDbAPIにタイトル画像がなかったときに差し替えて表示する画像
const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
const Movie: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const context = useContext(Context);
  const currentUser = context.state.currentUser;
  const dispatch = context.dispatch;
  if (dispatch == null) {
    throw new Error();
  }
  const movie = props.movie;
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  const favoriteBtn = (favorite: boolean) => {
    // favoriteによって♥、color、onClickを切り替え
    if (favorite) {
      return (
        <div
          className="favoriteBtn"
          style={{ color: "#e0245e" }}
          onClick={() => {
            if (currentUser) {
              dispatch({ type: "database-delete-request" });
              db.collection("users")
                .doc(currentUser.uid)
                .collection("favoriteMovies")
                .doc(movie.Title)
                .delete()
                .then(() => {
                  dispatch({ type: "database-delete-success", target: movie });
                  console.log("deleted a movie from the database");
                })
                .catch((e) => {
                  dispatch({ type: "database-failure", error: e });
                });
            }
          }}
        >
          <i className="fas fa-heart"></i>
        </div>
      );
    } else {
      return (
        <div
          className="favoriteBtn"
          style={{ color: "#5b7083" }}
          onClick={() => {
            if (currentUser) {
              dispatch({ type: "database-add-request" });
              db.collection("users")
                .doc(currentUser.uid)
                .collection("favoriteMovies")
                .doc(movie.Title)
                .set(movie)
                .then(() => {
                  dispatch({ type: "database-add-success", target: movie });
                  console.log(
                    "your favorite movie has been written to the database"
                  );
                })
                .catch((e) => {
                  dispatch({ type: "database-failure", error: e });
                  console.error("database write error:", e);
                });
            }
          }}
        >
          <i className="far fa-heart"></i>
        </div>
      );
    }
  };
  return (
    <div className="Movie">
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <div className="movieFooter">
        <div className="year">({movie.Year})</div>
        {favoriteBtn(movie.favorite ? true : false)}
      </div>
    </div>
  );
};
export default Movie;
