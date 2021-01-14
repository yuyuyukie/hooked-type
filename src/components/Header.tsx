import React from "react";
import { Menu } from "./Menu";
import firebase from "../firebase";

type Props = {
  text: string;
  userState?: firebase.User | null;
  setUserState?: React.Dispatch<React.SetStateAction<firebase.User | null>>;
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
};

export const Header: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  return (
    <header className="Header">
      <h1>{props.text}</h1>
      <Menu
        toggleShowModal={props.toggleShowModal}
        isShowModal={props.isShowModal}
        userState={props.userState}
        setUserState={props.setUserState}
      />
    </header>
  );
};
