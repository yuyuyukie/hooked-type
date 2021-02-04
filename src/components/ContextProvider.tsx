import React, { useEffect, useReducer } from "react";
import { Context, initialState } from "../contexts/Context";
import { Reducer } from "../reducers/Reducer";
import { setAuthObserver } from "../services/firebase";

type Props = {
  children: React.ReactNode;
};
const ContextProvider: React.FC<Props> = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  // const [currentUser, dispatch] = useState<firebase.User | null>(null);
  useEffect(() => {
    setAuthObserver(dispatch);
  }, []);
  return (
    <Context.Provider value={{ state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};
export default ContextProvider;
