import App from "./App";
import React from "react";
import ContextProvider from "./ContextProvider";
const AppContext: React.FC = () => {
  return (
    <ContextProvider>
      <App />
    </ContextProvider>
  );
};
export default AppContext;
