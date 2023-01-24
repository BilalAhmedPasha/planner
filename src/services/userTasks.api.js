import db from "../firebase";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  collection,
  getDocs,
  doc,
  query,
  where,
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

export const completeTaskApi = (
  userId,
  taskDetails,
  isCompleted,
  markedTime
) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, taskDetails.id);
  const isWontDoNew = isCompleted ? false : taskDetails.isWontDo;
  return updateDoc(docRef, {
    ...taskDetails,
    isCompleted: isCompleted,
    completedTime: isCompleted || isWontDoNew ? markedTime : null,
    isWontDo: isWontDoNew,
  });
};

export const wontDoTaskApi = (userId, taskDetails, isWontDo, markedTime) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const docRef = doc(taskCollectionRef, taskDetails.id);
  const isCompletedNew = isWontDo ? false : taskDetails.isCompleted;
  return updateDoc(docRef, {
    ...taskDetails,
    isWontDo: isWontDo,
    completedTime: isWontDo || isCompletedNew ? markedTime : null,
    isCompleted: isCompletedNew,
  });
};

export const hardDeleteTaskApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, "tasks");
  const q = query(taskCollectionRef, where("isDeleted", "==", 1));
  const snapShot = await getDocs(q);
  const results = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  results.forEach(async (result) => {
    const docRef = doc(db, "users", userId, "tasks", result.id);
    await deleteDoc(docRef);
  });
};
