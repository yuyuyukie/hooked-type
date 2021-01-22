/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import { MovieObject } from "./App";
import Movie from "./Movie";
import MovieContainer from "./MovieContainer";

export const isMovieObject = (obj: any): obj is MovieObject => {
  return (
    typeof obj.Title === "string" &&
    typeof obj.Type === "string" &&
    typeof obj.Poster === "string" &&
    typeof obj.Year === "string" &&
    typeof obj.imdbID === "string"
  );
};

const FavoriteMode: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <div className="toolbox" />
    </React.Fragment>
  );
};
export default FavoriteMode;
