import { createContext } from "react";
import { MovieObject } from "../components/App";
import firebase from "../firebase";
import { ACTIONTYPE } from "../actions/ActionCreator";

export const Mode = {
  search: "search",
  favorite: "favorite",
};

export type State = {
  currentMode: typeof Mode[keyof typeof Mode];
  isShowModal: boolean;
  loadingSearch: boolean;
  loadingDatabase: boolean;
  errorMessage: string | null;
  showingMovies: MovieObject[];
  fetchedMovies: MovieObject[];
  favoriteMovies: MovieObject[];
  currentUser: firebase.User | null;
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE> | null;
};
export const initialState: State = {
  currentMode: Mode.search,
  isShowModal: false,
  loadingSearch: false,
  loadingDatabase: false,
  errorMessage: null,
  fetchedMovies: [],
  favoriteMovies: [],
  showingMovies: [],
  currentUser: null,
};

const initialContext: ContextType = {
  state: initialState,
  dispatch: null,
};

export const Context: React.Context<ContextType> = createContext(
  initialContext
);
