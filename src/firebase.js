import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { API_KEY } from "./constants/firebase.constants";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "planner-1da50.firebaseapp.com",
  projectId: "planner-1da50",
  storageBucket: "planner-1da50.appspot.com",
  messagingSenderId: "761215467752",
  appId: "1:761215467752:web:58f444a648c62d333f895d",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);
export default db;
