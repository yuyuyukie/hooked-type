import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import FavoriteBtn from "./FavoriteBtn";
import { DEFAULT_PLACEHOLDER_IMAGE } from "./Movie";

const MovieDetail: React.FC = () => {
  const { state } = useContext(Context);
  const detail = state.detailMovie;
  if (detail == null) {
    return <div>loading...</div>;
  }

  const poster =
    detail.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : detail.Poster;
  detail.favorite = state.favoriteMovies.some((movie) => {
    return movie.imdbID === detail.imdbID;
  });

  return (
    <div>
      <h2>{detail.Title}</h2>
      <img alt={`The movie titled: ${detail.Title}`} src={poster} />
      <div className="movie-footer">
        <div className="year">({detail.Year})</div>
        <FavoriteBtn movie={detail} />
      </div>
    </div>
  );
};

export default MovieDetail;
