import { createContext } from "react";
import { Mode, MovieObject } from "../components/App";
import firebase from "../firebase";
import { ACTIONTYPE } from "../reducers/Reducer";
export type State = {
  currentMode: Mode;
  isShowModal: boolean;
  loadingSearch: boolean;
  loadingDatabase: boolean;
  errorMessage: string | null;
  fetchedMovies: MovieObject[];
  favoriteMovies: MovieObject[];
  currentUser: firebase.User | null;
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE> | null;
};
export const initialState: State = {
  currentMode: "search",
  isShowModal: false,
  loadingSearch: false,
  loadingDatabase: false,
  errorMessage: null,
  fetchedMovies: [],
  favoriteMovies: [],
  currentUser: null,
};

const initialContext: ContextType = {
  state: initialState,
  dispatch: null,
};

export const Context: React.Context<ContextType> = createContext(
  initialContext
);
