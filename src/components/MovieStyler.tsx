import * as React from "react";

type Props = {
  children: React.ReactNode;
};
const MovieContainer: React.FC<Props> = (props) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
      {props.children}
    </div>
  );
};

export default MovieContainer;
