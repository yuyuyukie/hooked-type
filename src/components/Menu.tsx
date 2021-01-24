import React, { useContext } from "react";
import { toggleShowModal } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import firebase from "../firebase";
import { signout } from "../services/firebase";
import Authentication from "./Authentication";
import Modal from "./Modal";

const Menu: React.FC = (): JSX.Element => {
  const { state, dispatch } = useContext(Context);
  const { isShowModal, currentUser } = state;
  const createMenu = (user: firebase.User | null) => {
    // Login時
    if (user) {
      return (
        <div
          id="isLoggedIn"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>Hello, {user.displayName}</div>
          <button id="logoutButton" type="button" onClick={() => signout()}>
            Logout
          </button>
        </div>
      );
      // Logout時
    } else {
      return (
        <div
          id="isLoggedOut"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <button
            type="button"
            id="SignInButton"
            onClick={() => {
              toggleShowModal(dispatch, true);
            }}
          >
            Sign in/up
          </button>
        </div>
      );
    }
  };

  return (
    <div id="Menu">
      {createMenu(currentUser)}
      {isShowModal ? (
        <Modal>
          <Authentication />
        </Modal>
      ) : (
        ""
      )}
    </div>
  );
};
// Authentication.contextTypes = IsLoggedInContext;
export default Menu;
