import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";

export const fetchTagsApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, "tags");
  return getDocs(tagCollectionRef);
};

export const addTagApi = (userId, newTag) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, "tags");
  return addDoc(tagCollectionRef, newTag);
};

export const editTagApi = (userId, modifiedTag, tagId) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, "tags");
  const docRef = doc(tagCollectionRef, tagId);
  return updateDoc(docRef, modifiedTag);
};

export const deleteTagApi = (userId, currentTag) => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, "tags");
  const docRef = doc(tagCollectionRef, currentTag.id);
  return deleteDoc(docRef);
};
