import * as React from "react";

type Props = {
  children: React.ReactChild[];
  showIndex: number;
};
const PageSwitcher: React.FC<Props> = (props) => {
  const childrenFactory = (children: React.ReactChild[]) => {
    return props.children.map((child, index) => {
      if (index === props.showIndex) {
        return <div style={{ display: "block" }}>{child}</div>;
      }
      return <div style={{ display: "none" }}>{child}</div>;
    });
  };
  return <>{childrenFactory(props.children)}</>;
};

export default PageSwitcher;
