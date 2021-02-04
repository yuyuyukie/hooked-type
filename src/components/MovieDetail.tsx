import React, { useContext } from "react";
import { isMobile } from "react-device-detect";
import styled from "styled-components";
import { Context, ModalMode } from "../contexts/Context";
import FavoriteBtn from "./FavoriteBtn";
import { DEFAULT_PLACEHOLDER_IMAGE } from "./Movie";
import { backgroundImage, BackgroundImageProps } from "styled-system";
import { switchShowModal } from "../actions/ActionCreator";

const Detail = styled.div<BackgroundImageProps>`
  width: 80vw;
  height: 80vh;
  overflow-y: scroll;
  ${isMobile ? "" : backgroundImage};
  background-color: rgba(255, 255, 255, 0.8);
  background-blend-mode: lighten;
  border: 1px solid #282c34;
  border-bottom: 0;
  border-radius: 0.5rem 0.5rem 0 0;
`;
const DivFlex = styled.div`
  display: flex;
  flex-direction: column;
`;
const Child = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const H2 = styled.h2`
  text-align: center;
  width: 100%;
  font-size: 2rem;
  text-shadow: 7px 7px 2px #999999;
  margin-bottom: 5px;
`;
const H3 = styled.h3`
  text-align: center;
  text-shadow: 5px 5px 2px #999999;
`;
const Plot = styled.div`
  border: 1px solid #282c34;
  border-radius: 3px;
  margin: 1rem 0.5rem;
`;
const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  background: #eeeeee;
  border-radius: 0 0 0.5rem 0.5rem;
  border: 1px solid #282c34;
  border-top: 0;
`;
export const StyledButton = styled.div`
  border-color: transparent;
  background: transparent;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  color: #727a81;
`;
const StyledCloseButton = styled(StyledButton)`
  transition: all linear 0.1s;
  &:hover {
    background: #727a81;
    color: #eeeeee;
  }
`;

const MovieDetail: React.FC = () => {
  const { state, dispatch } = useContext(Context);
  const detail = state.detailMovie;
  if (detail == null) {
    return (
      <div>
        <Detail>loading...</Detail>
      </div>
    );
  }

  const poster =
    detail.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : detail.Poster;
  detail.favorite = state.favoriteMovies.some((movie) => {
    return movie.imdbID === detail.imdbID;
  });

  return (
    <>
      <div>
        <Detail backgroundImage={`url(${poster})`}>
          <H2>{detail.Title}</H2>
          <DivFlex>
            <Child>
              <H3>Director</H3>
              <div>{detail.Director}</div>
            </Child>
            <Child>
              <H3>Genre</H3>
              <div>{detail.Genre} </div>
            </Child>
            <Child>
              <H3>Released</H3>
              <div>{detail.Released}</div>
            </Child>
            <Child>
              <H3>Runtime</H3>
              <div>{detail.Runtime}</div>
            </Child>
            <Child>
              <H3>Rating</H3>
              <div>{`${detail.imdbRating} / 10`}</div>
            </Child>
          </DivFlex>
          <Plot>
            <H3>Plot</H3>
            <div>{detail.Plot}</div>
          </Plot>
        </Detail>
        <Footer>
          <FavoriteBtn movie={detail} />
          <StyledCloseButton
            onClick={() => switchShowModal(dispatch, ModalMode.hidden)}
          >
            <i className="fas fa-times"></i>
          </StyledCloseButton>
        </Footer>
      </div>
    </>
  );
};

export default MovieDetail;
