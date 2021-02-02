import { MovieObject } from "../components/App";
import firebase from "../firebase";
import { ModalMode, Mode } from "../contexts/Context";
import { DetailedMovieObject } from "../services/omdb";
import { addFavorite, deleteFavorite } from "../services/firebase";

export type ACTIONTYPE =
  | {
      type: "modal-switch";
      mode: typeof ModalMode[keyof typeof ModalMode];
      authMessage: string;
    }
  | { type: "fetch-request"; value: string; page: number }
  | { type: "fetch-success"; payload: MovieObject[]; needReplaced: boolean }
  | { type: "fetch-failure"; error: string }
  | { type: "fetch-detail-request" }
  | { type: "fetch-detail-success"; payload: DetailedMovieObject }
  | { type: "clear-detail" }
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
  | {
      type: "auth-state-changed";
      data: firebase.User | null;
    }
  | { type: "auth-state-failure"; error: any }
  | { type: "mode-switch"; mode: typeof Mode[keyof typeof Mode] }
  | { type: "change-searchvalue"; payload: string };

export const switchMode = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  mode: typeof Mode[keyof typeof Mode]
) => {
  if (dispatch == null) {
    return;
  }
  const action: ACTIONTYPE = {
    type: "mode-switch",
    mode: mode,
  };
  dispatch(action);
};

export const switchShowModal = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  modalMode: typeof ModalMode[keyof typeof ModalMode],
  authMessage = ""
) => {
  console.log(33);
  if (dispatch == null) {
    return;
  }
  const action: ACTIONTYPE = {
    type: "modal-switch",
    mode: modalMode,
    authMessage: authMessage,
  };
  dispatch(action);
};

export const changeSearchValue = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  newSearchValue: string
) => {
  if (dispatch == null) {
    return;
  }
  const action: ACTIONTYPE = {
    type: "change-searchvalue",
    payload: newSearchValue,
  };
  dispatch(action);
};

// Detailedを変換してMovieObjectとして扱えるようにする
const downgradeDetailedMovie = (
  movie: DetailedMovieObject | MovieObject
): MovieObject => {
  const { Title, Year, Type, Poster, imdbID, favorite } = movie;
  const movieObject: MovieObject = {
    Title: Title,
    Type: Type,
    Poster: Poster,
    Year: Year,
    imdbID: imdbID,
    favorite: favorite ? true : false,
  };
  return movieObject;
};

export const changeFavorite = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  currentUser: firebase.User | null,
  isCurrentlyFavorite: boolean,
  movie: MovieObject | DetailedMovieObject
) => {
  if (dispatch == null) return;
  if (!currentUser) {
    switchShowModal(dispatch, ModalMode.auth, "Sign in to check this movie!");
    return;
  }
  if (isCurrentlyFavorite) {
    dispatch({ type: "database-delete-request" });
    deleteFavorite(currentUser.uid, movie.Title)
      .then(() => {
        dispatch({
          type: "database-delete-success",
          target: downgradeDetailedMovie(movie),
        });
        console.log("deleted a movie from the database");
      })
      .catch((e) => {
        dispatch({ type: "database-failure", error: e });
      });
  } else {
    dispatch({ type: "database-add-request" });
    addFavorite(currentUser.uid, movie)
      .then(() => {
        dispatch({ type: "database-add-success", target: movie });
        console.log("your favorite movie has been written to the database");
      })
      .catch((e) => {
        dispatch({ type: "database-failure", error: e });
        console.error("database write error:", e);
      });
  }
};

export const unmountDetail = (dispatch: React.Dispatch<ACTIONTYPE> | null) => {
  if (dispatch == null) return;
  dispatch({ type: "clear-detail" });
};
