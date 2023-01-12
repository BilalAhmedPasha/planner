import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
} from "@firebase/firestore";

export const fetchTasksApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  return getDocs(taskCollectionRef);
};

export const addTaskApi = (userId, newTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  return addDoc(taskCollectionRef, newTask);
};

export const editTaskApi = (userId, modifiedTask, taskId) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, taskId);
  return updateDoc(docRef, modifiedTask);
};

export const deleteTaskApi = (userId, currentTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, currentTask.id);
  return deleteDoc(docRef);
};
