import firebase from "../firebase";
import React, { useContext } from "react";
import { toggleShowModal } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";

const Authentication: React.FC = () => {
  const dispatch = useContext(Context).dispatch;
  const signinGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function () {
        // This gives you a Google Access Token.
        // The signed-in user info.
      })
      .catch((error) => console.error(error))
      .finally(() => {
        toggleShowModal(dispatch, false);
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
