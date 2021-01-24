import firebase from "firebase";
import { MovieObject } from "../components/App";
import { firebaseApp } from "../firebase";

const users = "users";
const favoriteMovies = "favoriteMovies";

export const signinGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebaseApp
    .auth()
    .signInWithPopup(provider)
    .then(function () {
      // This gives you a Google Access Token.
      // The signed-in user info.
    })
    .catch((e) => console.error(e));
};
export const signout = (): void => {
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      console.log("ログアウトしました。");
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
