import * as React from "react";

type Props = {
  children: React.ReactChild[];
  showIndex: number;
};
const PageSwitcher: React.FC<Props> = (props: Props) => {
  const childrenFactory = (children: React.ReactChild[], showIndex: number) => {
    return children.map((child, index) => {
      if (index === showIndex) {
        return (
          <div key={`${index}-shown`} style={{ display: "block" }}>
            {child}
          </div>
        );
      }
      return (
        <div key={`${index}-hidden`} style={{ display: "none" }}>
          {child}
        </div>
      );
    });
  };
  return <>{childrenFactory(props.children, props.showIndex)}</>;
};

export default PageSwitcher;
