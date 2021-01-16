import * as React from "react";
import { MovieObject } from "./App";

type Props = {
  children: React.ReactNode;
  favMovies: MovieObject[];
  setFavMovies: React.Dispatch<React.SetStateAction<MovieObject[]>>;
};
const MovieContainer: React.FC<Props> = (props) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
      {props.children}
    </div>
  );
};

export default MovieContainer;
