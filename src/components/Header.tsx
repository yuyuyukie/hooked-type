import React from "react";
type Props = {
  text: string;
};
export const Header: React.FunctionComponent<Props> = (
  props: Props
): JSX.Element => {
  return (
    <header className="App-header">
      <h2>{props.text}</h2>
    </header>
  );
};
