import firebase from "firebase";
import { ACTIONTYPE } from "../actions/ActionCreator";
import { MovieObject } from "../components/App";
import { firebaseApp } from "../firebase";

const users = "users";
const favoriteMovies = "favoriteMovies";

export const setAuthObserver = (
  dispatch: React.Dispatch<ACTIONTYPE> | null
) => {
  if (dispatch == null) {
    return;
  }
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
};

export const signinGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebaseApp
    .auth()
    .signInWithPopup(provider)
    .then(function () {
      console.log("signed in with Google successfully");
    })
    .catch((e) => console.error(e));
};
export const signinAnonymously = () => {
  return firebaseApp
    .auth()
    .signInAnonymously()
    .then(() => {
      console.log("signed in as a guest");
    })
    .catch((e) => console.log(e));
};
export const signout = () => {
  return firebaseApp
    .auth()
    .signOut()
    .then(() => {
      console.log("signed out successfully");
    })
    .catch((e) => console.error(e));
};
export const deleteFavorite = (userId: string, title: string) => {
  return firebaseApp
    .firestore()
    .collection(users)
    .doc(userId)
    .collection(favoriteMovies)
    .doc(title)
    .delete();
};
export const addFavorite = (userId: string, movie: MovieObject) => {
  return firebaseApp
    .firestore()
    .collection(users)
    .doc(userId)
    .collection(favoriteMovies)
    .doc(movie.Title)
    .set(movie);
};
export const fetchMovies = (userId: string) => {
  return firebaseApp
    .firestore()
    .collection(users)
    .doc(userId)
    .collection(favoriteMovies)
    .get();
};
