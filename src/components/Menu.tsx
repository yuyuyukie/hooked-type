import React from "react";
import firebase from "../firebase";
import { Authentication } from "./Authentication";
import { Modal } from "./Modal";

type Props = {
  userState?: firebase.User | null;
  setUserState?: React.Dispatch<React.SetStateAction<firebase.User | null>>;
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
};

export const Menu: React.FC<Props> = (props): JSX.Element => {
  const firebaseuiDiv = (user: firebase.User | null | undefined) => {
    // Login時
    if (user) {
      return (
        <div
          id="isLoggedIn"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div>Hello, {user.displayName}</div>
          <button
            id="logoutButton"
            type="button"
            onClick={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  console.log("ログアウトしました。");
                });
            }}
          >
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
              props.toggleShowModal(!props.isShowModal);
            }}
          >
            Sign in/up
          </button>
        </div>
      );
    }
  };
  const modal = (bool: boolean) => {
    console.log(bool);
    if (bool) {
      return (
        <Modal toggleShowModal={props.toggleShowModal}>
          <Authentication />
        </Modal>
      );
    }
  };

  return (
    <div id="Authentication-container">
      {firebaseuiDiv(props.userState)}
      {modal(props.isShowModal)}
    </div>
  );
};
// Authentication.contextTypes = IsLoggedInContext;
