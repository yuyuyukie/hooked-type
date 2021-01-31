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
