import React, { useContext } from "react";
import styled from "styled-components";
import { changeFavorite } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import { DetailedMovieObject } from "../services/omdb";
import { MovieObject } from "./App";
import { StyledButton } from "./MovieDetail";

const StyledFavoriteBtn = styled(StyledButton)`
  margin-left: auto;
  transition: all linear 0.1s;
  &:hover {
    background: #e024607c;
    color: #e02460;
  }
`;

type Props = {
  movie: MovieObject | DetailedMovieObject;
};
const FavoriteBtn: React.FC<Props> = ({ movie }) => {
  const { dispatch, state } = useContext(Context);
  const { currentUser } = state;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    changeFavorite(dispatch, currentUser, movie.favorite ? true : false, movie);
    e.stopPropagation();
  };

  // const favOnClick = useFavorite(movie);
  return (
    <StyledFavoriteBtn
      className="favoriteBtn"
      style={movie.favorite ? { color: "#e0245e" } : {}}
      onClick={(e) => handleClick(e)}
    >
      <i className={movie.favorite ? "fas fa-heart" : "far fa-heart"}></i>
    </StyledFavoriteBtn>
  );
};
export default FavoriteBtn;
