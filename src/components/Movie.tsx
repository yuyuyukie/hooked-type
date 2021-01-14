import React, { useState } from "react";
import { MovieObject } from "./App";
import firebase from "../firebase";
const db = firebase.firestore();

type Props = {
  key: string;
  movie: MovieObject;
};
// OMDbAPIにタイトル画像がなかったときに差し替えて表示する画像
const DEFAULT_PLACEHOLDER_IMAGE: string =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
export const Movie: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  const movie = props.movie;
  const [favoriteState, setFavoriteState] = useState(
    movie.favorite ? true : false
  );
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
            setFavoriteState(!favoriteState);
            db.collection("users")
              .doc("f6xJJp2uHSatdKsQvAIlTab2NTw1")
              .collection("favoriteMovies")
              .doc(movie.Title)
              .delete()
              .then(() => console.log("deleted a movie from the database"));
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
            setFavoriteState(!favoriteState);
            // test my uid
            db.collection("users")
              .doc("f6xJJp2uHSatdKsQvAIlTab2NTw1")
              .collection("favoriteMovies")
              .doc(movie.Title)
              .set(movie)
              .then(() => {
                console.log(
                  "your favorite movie has been written to the database"
                );
              })
              .catch((e) => console.error("database write error:", e));
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
        {favoriteBtn(favoriteState)}
      </div>
    </div>
  );
};
