import firebase from "../firebase";
export const uiConfig = {
  // Identity Providerログイン：redirect or popup
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
};
