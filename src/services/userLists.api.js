import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";

export const fetchListsApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, "lists");
  return getDocs(listCollectionRef);
};

export const addListApi = (userId, newList) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, "lists");
  return addDoc(listCollectionRef, newList);
};

export const editListApi = (userId, modifiedList, listId) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, "lists");
  const docRef = doc(listCollectionRef, listId);
  return updateDoc(docRef, modifiedList);
};

export const deleteListApi = (userId, currentList) => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, "lists");
  const docRef = doc(listCollectionRef, currentList.id);
  return deleteDoc(docRef);
};
