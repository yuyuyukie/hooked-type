import React, { useContext } from "react";
import { toggleShowModal } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import { signinAnonymously, signinGoogle } from "../services/firebase";

const Authentication: React.FC = () => {
  console.log("auth");
  const { state, dispatch } = useContext(Context);
  const authMessage = state.authMessage;
  return (
    <div className="Authenticaion">
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>{authMessage}</p>
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
          <i className="fas fa-user"></i>
          As Guest
        </li>
      </ul>
    </div>
  );
};
export default Authentication;
