import React, { useEffect, useState } from "react";
import firebase, { firebaseApp } from "../firebase/index";

export const AuthContext = React.createContext<firebase.User | null>(null);
type Props = {
  children: React.ReactNode;
};
const AuthProvider: React.FC<Props> = (props) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        firebaseApp
          .firestore()
          .collection("users")
          .doc(user.uid)
          .set(
            {
              displayName: user.displayName,
              email: user.email,
              uid: user.uid,
            },
            { merge: true }
          )
          .then(() => console.log("user info has been written to the database"))
          .catch((e) => console.error("database write error", e));
      } else {
        setCurrentUser(null);
      }
    });
  });
  return (
    <AuthContext.Provider value={currentUser}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
