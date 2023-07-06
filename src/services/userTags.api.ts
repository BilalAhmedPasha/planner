import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
  QuerySnapshot,
  DocumentData,
} from "@firebase/firestore";
import { TAGS } from "../constants/app.constants";
import TagProps from "../../types/tag";

export const fetchTagsApi = async (
  userId: string
): Promise<QuerySnapshot<DocumentData>> => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  return getDocs(tagCollectionRef);
};

export const addTagApi = (
  userId: string,
  newTag: TagProps
): Promise<DocumentData> => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  return addDoc(tagCollectionRef, newTag);
};

export const editTagApi = (
  userId: string,
  modifiedTag: TagProps,
  tagId: string
): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  const docRef = doc(tagCollectionRef, tagId);
  return updateDoc(docRef, modifiedTag as object);
};

export const deleteTagApi = (
  userId: string,
  currentTag: TagProps
): Promise<void> => {
  const userDocRef = doc(db, "users", userId);
  const tagCollectionRef = collection(userDocRef, TAGS);
  const docRef = doc(tagCollectionRef, currentTag.id);
  return deleteDoc(docRef);
};
