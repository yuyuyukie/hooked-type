import React from "react";
import { MovieObject } from "./App";

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
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
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
      <p>({movie.Year})</p>
    </div>
  );
};
