import * as React from "react";

type Props = {
  children: React.ReactNode;
};
const MovieStyler: React.FC<Props> = (props) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
      {props.children}
    </div>
  );
};

export default MovieStyler;
