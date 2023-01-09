import firestore from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";

const ref = collection(firestore, "lists");
export const fetchListsApi = async () => {
  return getDocs(ref);
};

export const addListApi = (newList) => {
  return addDoc(ref, newList);
};

export const editListApi = (modifiedList, listId) => {
  const docRef = doc(ref, listId);
  return updateDoc(docRef, modifiedList);
};

export const deleteListApi = (currentList) => {
  const docRef = doc(ref, currentList.id);
  return deleteDoc(docRef);
};
