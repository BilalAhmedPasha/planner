import firestore from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";

const ref = collection(firestore, "tags");
export const fetchTagsApi = async () => {
  return getDocs(ref);
};

export const addTagApi = (newTag) => {
  return addDoc(ref, newTag);
};

export const editTagApi = (modifiedTag, tagId) => {
  const docRef = doc(ref, tagId);
  return updateDoc(docRef, modifiedTag);
};

export const deleteTagApi = (currentTag) => {
  const docRef = doc(ref, currentTag.id);
  return deleteDoc(docRef);
};
