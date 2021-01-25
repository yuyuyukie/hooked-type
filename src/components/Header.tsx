import React from "react";
import Menu from "./Menu";

type Props = {
  text: string;
};

const Header: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  return (
    <header className="Header">
      <h1>{props.text}</h1>
      <Menu />
    </header>
  );
};
export default Header;
