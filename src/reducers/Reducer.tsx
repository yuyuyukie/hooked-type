import { MovieObject } from "../components/App";
import { State, Mode } from "../contexts/Context";
import firebase from "../firebase";

export type ACTIONTYPE =
  | { type: "mode-switch-favorite" }
  | { type: "mode-switch-search" }
  | { type: "modal-toggle"; data: boolean }
  | { type: "fetch-request" }
  | { type: "fetch-success"; payload: MovieObject[] }
  | { type: "fetch-failure"; error: string }
  | { type: "database-fetch-request" }
  | { type: "database-add-request" }
  | { type: "database-delete-request" }
  | { type: "database-add-success"; target: MovieObject }
  | { type: "database-delete-success"; target: MovieObject }
  | { type: "database-fetch-success"; payload: MovieObject[] }
  | { type: "database-failure"; error: string }
  | { type: "auth-request-signin" }
  | { type: "auth-request-signout" }
  | { type: "auth-request-signin" }
  | { type: "auth-state-changed"; data: firebase.User | null }
  | { type: "auth-state-failure"; error: any }
  | { type: "standby" };
export const Reducer: React.Reducer<State, ACTIONTYPE> = (state, action) => {
  console.log(action.type);
  switch (action.type) {
    case "fetch-request":
      return {
        ...state,
        loadingSearch: true,
        errorMessage: null,
      };
    case "fetch-success":
      return {
        ...state,
        loadingSearch: false,
        fetchedMovies: action.payload,
      };
    case "fetch-failure":
      return {
        ...state,
        loadingSearch: false,
        errorMessage: action.error,
      };
    case "mode-switch-favorite":
      return {
        ...state,
        currentMode: Mode.favorite,
        showingMovies: state.favoriteMovies,
      };
    case "mode-switch-search":
      return {
        ...state,
        currentMode: Mode.search,
        showingMovies: state.fetchedMovies,
      };
    case "auth-state-changed":
      return {
        ...state,
        currentUser: action.data,
      };
    case "auth-state-failure":
      return {
        ...state,
        errorMessage: action.error,
      };
    case "database-fetch-request":
    case "database-add-request":
    case "database-delete-request":
      return {
        ...state,
        loadingDatabase: true,
      };
    case "database-fetch-success":
      return {
        ...state,
        favoriteMovies: action.payload,
        loadingDatabase: false,
      };
    case "database-delete-success":
      const targetIndex = state.favoriteMovies.indexOf(action.target);
      const newFavMovies = state.favoriteMovies.slice();
      newFavMovies.splice(targetIndex, 1);
      return {
        ...state,
        favoriteMovies: [...newFavMovies],
        loadingDatabase: false,
      };
    case "database-add-success":
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies, action.target],
        loadingDatabase: false,
      };
    default:
      return state;
  }
};
