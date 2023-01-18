import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
  onSnapshot,
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

export const softDeleteTaskApi = (userId, currentTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, currentTask.id);
  return updateDoc(docRef, {
    ...currentTask,
    isDeleted: 1,
  });
};

export const completeTaskApi = (userId, taskDetails, isCompleted) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, taskDetails.id);
  return updateDoc(docRef, {
    ...taskDetails,
    isCompleted: isCompleted,
    isWontDo: isCompleted ? false : taskDetails.isWontDo,
  });
};

export const wontDoTaskApi = (userId, taskDetails, isWontDo) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, taskDetails.id);
  return updateDoc(docRef, {
    ...taskDetails,
    isWontDo: isWontDo,
    isCompleted: isWontDo ? false : taskDetails.isCompleted,
  });
};

export const hardDeleteTaskApi = async (userId) => {};
