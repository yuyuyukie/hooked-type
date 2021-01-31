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
  authMessage: string;
  loadingSearch: boolean;
  loadingDatabase: boolean;
  errorMessage: string | null;
  showingMovies: MovieObject[];
  fetchedMovies: MovieObject[];
  favoriteMovies: MovieObject[];
  currentUser: firebase.User | null;
  searchValue: string;
  pageNumber: number;
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE> | null;
};
export const initialState: State = {
  currentMode: Mode.search,
  isShowModal: false,
  authMessage: "",
  loadingSearch: false,
  loadingDatabase: false,
  errorMessage: null,
  fetchedMovies: [],
  favoriteMovies: [],
  showingMovies: [],
  currentUser: null,
  searchValue: "",
  pageNumber: 1,
};

const initialContext: ContextType = {
  state: initialState,
  dispatch: null,
};

export const Context: React.Context<ContextType> = createContext(
  initialContext
);
