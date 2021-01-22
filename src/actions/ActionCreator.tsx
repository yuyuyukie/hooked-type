import { MovieObject } from "../components/App";
import firebase from "../firebase";
import { Mode } from "../contexts/Context";

export type ACTIONTYPE =
  | { type: "mode-switch"; data: typeof Mode[keyof typeof Mode] }
  | { type: "modal-toggle"; data: boolean }
  | { type: "fetch-request" }
  | { type: "fetch-success"; payload: MovieObject[] }
  | { type: "fetch-failure"; error: string }
  | { type: "database-request-fetch" }
  | { type: "database-reuqest-add" }
  | { type: "database-request-delete" }
  | { type: "database-success"; payload: MovieObject[] }
  | { type: "database-failure"; error: string }
  | { type: "auth-request-signin" }
  | { type: "auth-request-signout" }
  | { type: "auth-request-signin" }
  | { type: "auth-success"; data: firebase.User | null }
  | { type: "auth-failure"; error: string };

export const switchMode = (dispatch: React.Dispatch<any>, mode: string) => {
  const action: React.ReducerAction<any> = {
    type: "mode-switch",
    data: mode,
  };
  dispatch(action);
};
