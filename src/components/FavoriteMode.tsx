/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from "react";
import { Context } from "../contexts/Context";

const FavoriteMode: React.FC = (): JSX.Element => {
  const currentUser = useContext(Context).state.currentUser;
  return (
    <>
      {currentUser ? (
        ""
      ) : (
        <div
          style={{
            fontSize: "large",
            border: "solid #0f1419",
            borderWidth: "1px 0",
          }}
        >
          We need you to sign in to use this functionality.
        </div>
      )}
    </>
  );
};
export default FavoriteMode;
