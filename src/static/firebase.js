// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "mil-react-03-haga.firebaseapp.com",
  projectId: "mil-react-03-haga",
  storageBucket: "mil-react-03-haga.appspot.com",
  messagingSenderId: "708014751295",
  appId: "1:708014751295:web:a13b20a1d035763e03828a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export default app;