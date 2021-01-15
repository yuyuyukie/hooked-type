import firebase, { firebaseApp } from "../firebase";
import React, { useEffect } from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import { uiConfig } from "../firebase/uiConfig";

type Props = { toggleShowModal: React.Dispatch<React.SetStateAction<boolean>> };
const Authentication: React.FC<Props> = (props) => {
  const signinGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result: any) {
        // This gives you a Google Access Token.
        // The signed-in user info.
      })
      .catch((error) => console.error(error))
      .finally(() => {
        props.toggleShowModal(false);
      });
  };
  return (
    <div className="Authenticaion">
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>
        Select the option <br></br>to sign in/up.
      </p>
      {/* <StyledFirebaseAuth
        uiConfig={uiConfig}
        firebaseAuth={firebaseApp.auth()}
      /> */}
      <ul>
        <li className="signinOption" onClick={() => signinGoogle()}>
          Google
        </li>
      </ul>
    </div>
  );
};
export default Authentication;
