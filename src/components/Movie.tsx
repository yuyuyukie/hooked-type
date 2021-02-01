import React, { useContext } from "react";
import { MovieObject } from "./App";
import { Context } from "../contexts/Context";
import { addFavorite, deleteFavorite } from "../services/firebase";
import FavoriteBtn from "./FavoriteBtn";
import { toggleShowModal } from "../actions/ActionCreator";

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
  const handleClick = (bool: boolean) => {
    if (!currentUser) {
      toggleShowModal(dispatch, true, "Sign in to check this movie!");
      return;
    }
    // boolは現在の状態なので、逆の処理を行う
    if (bool) {
      dispatch({ type: "database-delete-request" });
      deleteFavorite(currentUser.uid, movie.Title)
        .then(() => {
          dispatch({ type: "database-delete-success", target: movie });
          console.log("deleted a movie from the database");
        })
        .catch((e) => {
          dispatch({ type: "database-failure", error: e });
        });
    } else {
      dispatch({ type: "database-add-request" });
      addFavorite(currentUser.uid, movie)
        .then(() => {
          dispatch({ type: "database-add-success", target: movie });
          console.log("your favorite movie has been written to the database");
        })
        .catch((e) => {
          dispatch({ type: "database-failure", error: e });
          console.error("database write error:", e);
        });
    }
  };

  return (
    <div className="Movie">
      <h2
        style={{
          fontSize: `${
            movie.Title.length > 26
              ? "1rem"
              : movie.Title.length > 13
              ? "1.2rem"
              : "1.5rem"
          }`,
        }}
      >
        {movie.Title}
      </h2>
      <img alt={`The movie titled: ${movie.Title}`} src={poster} />
      <div className="movie-footer">
        <div className="year">({movie.Year})</div>
        <FavoriteBtn
          isFavorite={movie.favorite ? true : false}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};
export default Movie;
