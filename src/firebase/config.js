import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_XdlEESdWEMakh0pRYg5OJmJDSOm7RgE",
  authDomain: "cooking-ninja-react.firebaseapp.com",
  projectId: "cooking-ninja-react",
  storageBucket: "cooking-ninja-react.appspot.com",
  messagingSenderId: "519118638903",
  appId: "1:519118638903:web:10bda64ec32b07e2e514b2",
};

// init
firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
