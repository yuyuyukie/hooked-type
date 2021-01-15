import App from "./App";
import React from "react";
import AuthProvider from "./AuthProvider";
const AppContext: React.FC = () => {
  return (
    <AuthProvider>
      <App />;
    </AuthProvider>
  );
};
export default AppContext;
