import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";
import { TAGS } from "../constants/app.constants";

export const fetchTagsApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  return getDocs(tagCollectionRef);
};

export const addTagApi = (userId, newTag) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  return addDoc(tagCollectionRef, newTag);
};

export const editTagApi = (userId, modifiedTag, tagId) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  const docRef = doc(tagCollectionRef, tagId);
  return updateDoc(docRef, modifiedTag);
};

export const deleteTagApi = (userId, currentTag) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  const docRef = doc(tagCollectionRef, currentTag.id);
  return deleteDoc(docRef);
};
