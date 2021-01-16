import React, { useContext, useState } from "react";
import { MovieObject } from "./App";
import { firebaseApp } from "../firebase";
import { AuthContext } from "./AuthProvider";
const db = firebaseApp.firestore();

type Props = {
  key: string;
  movie: MovieObject;
};
// OMDbAPIにタイトル画像がなかったときに差し替えて表示する画像
const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";
const Movie: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const currentUser = useContext(AuthContext);
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
            if (currentUser) {
              setFavoriteState(!favoriteState);
              db.collection("users")
                .doc(currentUser.uid)
                .collection("favoriteMovies")
                .doc(movie.Title)
                .delete()
                .then(() => console.log("deleted a movie from the database"));
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
            setFavoriteState(!favoriteState);
            if (currentUser) {
              db.collection("users")
                .doc(currentUser.uid)
                .collection("favoriteMovies")
                .doc(movie.Title)
                .set(movie)
                .then(() => {
                  console.log(
                    "your favorite movie has been written to the database"
                  );
                })
                .catch((e) => console.error("database write error:", e));
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
        {favoriteBtn(favoriteState)}
      </div>
    </div>
  );
};
export default Movie;
