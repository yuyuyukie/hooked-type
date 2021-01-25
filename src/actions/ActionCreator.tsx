import { MovieObject } from "../components/App";
import firebase from "../firebase";
import { Mode } from "../contexts/Context";

export type ACTIONTYPE =
  | { type: "modal-toggle"; isShow: boolean }
  | { type: "fetch-request"; value: string; page: number }
  | { type: "fetch-success"; payload: MovieObject[]; needReflesh: boolean }
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
  | {
      type: "auth-state-changed";
      data: firebase.User | null;
    }
  | { type: "auth-state-failure"; error: any }
  | { type: "mode-switch"; mode: typeof Mode[keyof typeof Mode] };

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

export const toggleShowModal = (
  dispatch: React.Dispatch<ACTIONTYPE> | null,
  isShow: boolean
) => {
  if (dispatch == null) {
    return;
  }
  const action: ACTIONTYPE = {
    type: "modal-toggle",
    isShow: isShow,
  };
  dispatch(action);
};
