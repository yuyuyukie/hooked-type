/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../contexts/Context";
import { MovieObject } from "./App";
import AppContext from "./AppContext";

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
  const currentUser = useContext(Context).state.currentUser;
  return (
    <React.Fragment>
      {currentUser ? (
        <div className="toolbox" />
      ) : (
        <div style={{ fontSize: "large" }} className="notSignedInMessage">
          We need you to sign in to use this functionality.
        </div>
      )}
    </React.Fragment>
  );
};
export default FavoriteMode;
