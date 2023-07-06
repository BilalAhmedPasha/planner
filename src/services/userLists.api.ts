import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
  DocumentData,
  QuerySnapshot,
} from "@firebase/firestore";
import { LISTS } from "../constants/app.constants";
import ListProps from "../../types/list";

export const fetchListsApi = async (
  userId: string
): Promise<QuerySnapshot<DocumentData>> => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  return getDocs(listCollectionRef);
};

export const addListApi = (
  userId: string,
  newList: ListProps
): Promise<DocumentData> => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  return addDoc(listCollectionRef, newList);
};

export const editListApi = (
  userId: string,
  modifiedList: ListProps,
  listId: string
): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  const docRef = doc(listCollectionRef, listId);
  return updateDoc(docRef, modifiedList as object);
};

export const deleteListApi = (
  userId: string,
  currentList: ListProps
): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  const listCollectionRef = collection(userDocRef, LISTS);
  const docRef = doc(listCollectionRef, currentList.id);
  return deleteDoc(docRef);
};
