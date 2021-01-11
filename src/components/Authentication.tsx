import firebase from "firebase";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { uiConfig } from "../firebase/uiConfig";

type Props = {};

export const Authentication: React.FC<Props> = () => {
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};
