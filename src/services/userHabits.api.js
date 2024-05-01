import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
  orderBy,
  query,
} from "@firebase/firestore";
import { HABITS } from "../constants/app.constants";

export const fetchHabitsApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  const docs = query(habitCollectionRef, orderBy("createdTime", "asc"));
  return getDocs(docs);
};

export const addHabitApi = (userId, newHabit) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  return addDoc(habitCollectionRef, newHabit);
};

export const editHabitApi = (userId, modifiedHabit, habitId) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  const docRef = doc(habitCollectionRef, habitId);
  return updateDoc(docRef, modifiedHabit);
};

export const deleteHabitApi = async (userId, currentHabitId) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  const docRef = doc(habitCollectionRef, currentHabitId);
  return deleteDoc(docRef);
};

export const markHabitApi = (userId, currentHabitId, date, value) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  const docRef = doc(habitCollectionRef, currentHabitId);
  return updateDoc(docRef, { [`history.${date}`]: value });
};