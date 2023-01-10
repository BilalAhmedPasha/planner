import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { API_KEY } from "./constants/firebase.constants";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "todoapp-737a4.firebaseapp.com",
  projectId: "todoapp-737a4",
  storageBucket: "todoapp-737a4.appspot.com",
  messagingSenderId: "472378828933",
  appId: "1:472378828933:web:daf612cb58e5fd0bdea1ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const auth = getAuth(app);

export default firestore;
