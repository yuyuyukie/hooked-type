import React, { useContext } from "react";
import { MovieObject } from "./App";
import { Context, ModalMode } from "../contexts/Context";
import FavoriteBtn from "./FavoriteBtn";
import { changeFavorite, switchShowModal } from "../actions/ActionCreator";
import { DetailedMovieObject, fetchMovieDetail } from "../services/omdb";
import styled from "styled-components";
import Modal from "./Modal";
import MovieDetail from "./MovieDetail";

export const useFavorite = (movie: MovieObject | DetailedMovieObject) => {
  const { state, dispatch } = useContext(Context);
  const { currentUser } = state;

  changeFavorite(dispatch, currentUser, movie.favorite ? true : false, movie);
};

const StyledMovie = styled.div`
  &:hover {
    cursor: pointer;
    border: 1px solid #0f1419;
    border-radius: 3px;
  }
`;
// OMDbAPIにタイトル画像がなかったときに差し替えて表示する画像
export const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_SX300.jpg";

type Props = {
  key: string;
  movie: MovieObject;
};
const Movie: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const context = useContext(Context);
  const { currentUser, detailMovie, modalMode } = context.state;
  const dispatch = context.dispatch;
  if (dispatch == null) {
    throw new Error();
  }
  const movie = props.movie;
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  const handleDetailClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.currentTarget.classList.contains("favoriteBtn")) return;
    fetchMovieDetail(dispatch, movie.imdbID);
    switchShowModal(dispatch, ModalMode.detail);
  };

  return (
    <StyledMovie className="Movie" onClick={(e) => handleDetailClick(e)}>
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
        <FavoriteBtn movie={movie} />
      </div>
    </StyledMovie>
  );
};
export default Movie;
