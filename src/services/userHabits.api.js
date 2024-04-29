import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";
import { HABITS } from "../constants/app.constants";

export const fetchHabitsApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  return getDocs(habitCollectionRef);
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

export const deleteHabitApi = async (userId, currentHabit) => {
  const userDocRef = doc(db, "users", userId);
  const habitCollectionRef = collection(userDocRef, HABITS);
  const docRef = doc(habitCollectionRef, currentHabit.id);
  return deleteDoc(docRef);
};
