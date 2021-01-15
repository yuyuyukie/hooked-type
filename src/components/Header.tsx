import React from "react";
import Menu from "./Menu";
import firebase from "../firebase";

type Props = {
  text: string;
  toggleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isShowModal: boolean;
};

const Header: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  return (
    <header className="Header">
      <h1>{props.text}</h1>
      <Menu
        toggleShowModal={props.toggleShowModal}
        isShowModal={props.isShowModal}
      />
    </header>
  );
};
export default Header;
