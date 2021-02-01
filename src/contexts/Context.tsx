import { createContext } from "react";
import { MovieObject } from "../components/App";
import firebase from "../firebase";
import { ACTIONTYPE } from "../actions/ActionCreator";
import { DetailedMovieObject } from "../services/omdb";
import Modal from "../components/Modal";

export const Mode = {
  search: "search",
  favorite: "favorite",
};
export const ModalMode = {
  auth: "auth",
  detail: "detail",
  hidden: "hidden",
};

export type State = {
  currentMode: typeof Mode[keyof typeof Mode];
  modalMode: typeof ModalMode[keyof typeof ModalMode];
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
  detailMovie: DetailedMovieObject | null;
};

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE> | null;
};
export const initialState: State = {
  currentMode: Mode.search,
  modalMode: ModalMode.hidden,
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
  detailMovie: null,
};

const initialContext: ContextType = {
  state: initialState,
  dispatch: null,
};

export const Context: React.Context<ContextType> = createContext(
  initialContext
);
