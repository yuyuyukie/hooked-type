import React, { useContext } from "react";
import firebase, { firebaseApp } from "../firebase";
import Authentication from "./Authentication";
import { AuthContext } from "./AuthProvider";
import Modal from "./Modal";

type Props = {
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
};

const Menu: React.FC<Props> = (props): JSX.Element => {
  const currentUser = useContext(AuthContext);
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
              firebaseApp
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
    if (bool) {
      return (
        <Modal toggleShowModal={props.toggleShowModal}>
          <Authentication />
        </Modal>
      );
    }
  };

  return (
    <div id="Menu">
      {firebaseuiDiv(currentUser)}
      {modal(props.isShowModal)}
    </div>
  );
};
// Authentication.contextTypes = IsLoggedInContext;
export default Menu;
