import firebase from "../firebase";
import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { uiConfig } from "../firebase/uiConfig";

type Props = {};

const Authentication: React.FC<Props> = () => {
  return (
    <div className="Authenticaion">
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Select the option <br></br>to sign in/up.
      </p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
};
export default Authentication;
