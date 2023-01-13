import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";
import { LISTS } from "../constants/app.constants";

export const fetchListsApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  return getDocs(listCollectionRef);
};

export const addListApi = (userId, newList) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  return addDoc(listCollectionRef, newList);
};

export const editListApi = (userId, modifiedList, listId) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  const docRef = doc(listCollectionRef, listId);
  return updateDoc(docRef, modifiedList);
};

export const deleteListApi = (userId, currentList) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  const docRef = doc(listCollectionRef, currentList.id);
  return deleteDoc(docRef);
};
