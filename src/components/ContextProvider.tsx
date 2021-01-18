import React, { useEffect, useReducer, useState } from "react";
import { Context, initialState } from "../contexts/Context";
import firebase, { firebaseApp } from "../firebase/index";
import { Reducer } from "../reducers/Reducer";

type Props = {
  children: React.ReactNode;
};
const ContextProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  // const [currentUser, dispatch] = useState<firebase.User | null>(null);
  useEffect(() => {
    console.log("a");
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: "auth-state-changed", data: user });
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
          .catch((e) => {
            dispatch({ type: "auth-state-failure", error: e });
            console.error("database write error", e);
          });
      } else {
        dispatch({ type: "auth-state-changed", data: null });
      }
    });
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
