import React, { useContext } from "react";
import { switchShowModal } from "../actions/ActionCreator";
import { Context, ModalMode } from "../contexts/Context";
import firebase from "../firebase";
import { signout } from "../services/firebase";
import Authentication from "./Authentication";
import Modal from "./Modal";
export const createAuth = (mode: typeof ModalMode[keyof typeof ModalMode]) => {
  if (mode === ModalMode.auth) {
    return (
      <Modal>
        <Authentication />
      </Modal>
    );
  }
  return "";
};

const Menu: React.FC = (): JSX.Element => {
  const { state, dispatch } = useContext(Context);
  const { modalMode, currentUser } = state;
  const createMenu = (user: firebase.User | null) => {
    // Login時
    if (user) {
      return (
        <div
          id="isLoggedIn"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>
            Hello,{" "}
            {user.displayName ? user.displayName.trim().split(" ")[0] : "Guest"}
          </div>
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
              switchShowModal(
                dispatch,
                ModalMode.auth,
                "Select the option to sign in."
              );
            }}
          >
            Sign in
          </button>
        </div>
      );
    }
  };

  return (
    <div id="Menu">
      {createMenu(currentUser)}
      {createAuth(modalMode)}
    </div>
  );
};
export default Menu;
