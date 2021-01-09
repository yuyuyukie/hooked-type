import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase";

const uiConfig = {
  // Identity Providerログイン：redirect or popup
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};

export const Authentication: React.VoidFunctionComponent = (): JSX.Element => {
  const firebaseuiDiv = (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );

  return <div id="Authentication-container">{firebaseuiDiv}</div>;
};
