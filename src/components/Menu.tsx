import React, { useContext } from "react";
import { toggleShowModal } from "../actions/ActionCreator";
import { Context } from "../contexts/Context";
import firebase from "../firebase";
import { signout } from "../services/firebase";
import Authentication from "./Authentication";
import Modal from "./Modal";
export const createAuth = (isShowModal: boolean) => {
  if (isShowModal) {
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
  const { isShowModal, currentUser } = state;
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
              toggleShowModal(dispatch, true, "Select the option to sign in.");
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
      {createAuth(isShowModal)}
    </div>
  );
};
export default Menu;
