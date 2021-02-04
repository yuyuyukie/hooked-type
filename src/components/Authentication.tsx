import React, { useContext } from "react";
import { switchShowModal } from "../actions/ActionCreator";
import { Context, ModalMode } from "../contexts/Context";
import { signinAnonymously, signinGoogle } from "../services/firebase";

const Authentication: React.FC = () => {
  console.log("auth");
  const { state, dispatch } = useContext(Context);
  const authMessage = state.authMessage;
  return (
    <div style={{ background: "#eeeeee" }} className="Authenticaion">
      <p style={{ textAlign: "center", fontSize: "1.5rem" }}>{authMessage}</p>
      <ul>
        <li
          className="signinOption"
          onClick={() =>
            signinGoogle()
              .catch((error) => console.error(error))
              .finally(() => {
                switchShowModal(dispatch, ModalMode.hidden);
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
              switchShowModal(dispatch, ModalMode.hidden);
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
