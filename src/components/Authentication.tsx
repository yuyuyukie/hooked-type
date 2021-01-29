import React, { useContext } from "react";
import { toggleShowModal } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import { signinAnonymously, signinGoogle } from "../services/firebase";

const Authentication: React.FC = () => {
  console.log("auth");
  const dispatch = useContext(Context).dispatch;
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
        <li
          className="signinOption"
          onClick={() =>
            signinGoogle()
              .catch((error) => console.error(error))
              .finally(() => {
                toggleShowModal(dispatch, false);
              })
          }
        >
          <i className="fab fa-google"></i>
          Google
        </li>
        <li
          className="signinOption"
          onClick={() => {
            signinAnonymously().finally(() => {
              toggleShowModal(dispatch, false);
            });
          }}
        >
          As Guest
        </li>
      </ul>
    </div>
  );
};
export default Authentication;
