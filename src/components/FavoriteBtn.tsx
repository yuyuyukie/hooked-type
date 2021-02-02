import React, { useContext } from "react";
import { changeFavorite } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import { DetailedMovieObject } from "../services/omdb";
import { MovieObject } from "./App";

type Props = {
  movie: MovieObject | DetailedMovieObject;
};
const FavoriteBtn: React.FC<Props> = ({ movie }) => {
  const { dispatch, state } = useContext(Context);
  const { currentUser } = state;

  const handleClick = () => {
    changeFavorite(dispatch, currentUser, movie.favorite ? true : false, movie);
  };

  // const favOnClick = useFavorite(movie);
  return (
    <div
      className="favoriteBtn"
      style={movie.favorite ? { color: "#e0245e" } : { color: "#5b7083" }}
      onClick={() => handleClick()}
    >
      <i className={movie.favorite ? "fas fa-heart" : "far fa-heart"}></i>
    </div>
  );
};
export default FavoriteBtn;
