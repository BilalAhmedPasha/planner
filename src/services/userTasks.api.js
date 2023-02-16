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
import { TASKS } from "../constants/app.constants";

export const fetchTasksApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  return getDocs(taskCollectionRef);
};

export const addTaskApi = (userId, newTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  return addDoc(taskCollectionRef, newTask);
};

export const editTaskApi = (userId, modifiedTask, taskId) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const docRef = doc(taskCollectionRef, taskId);
  return updateDoc(docRef, modifiedTask);
};

export const softDeleteTaskApi = (userId, currentTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const docRef = doc(taskCollectionRef, currentTask.id);
  return updateDoc(docRef, {
    ...currentTask,
    isDeleted: 1,
  });
};

export const restoreTaskApi = (userId, currentTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const docRef = doc(taskCollectionRef, currentTask.id);
  return updateDoc(docRef, {
    ...currentTask,
    isDeleted: 0,
  });
};

export const completeTaskApi = (
  userId,
  taskDetails,
  isCompleted,
  markedTime,
  updatedTaskDate,
  shouldCreateNewTask
) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const docRef = doc(taskCollectionRef, taskDetails.id);

  if (!taskDetails.isRepeating) {
    const isWontDoNew = isCompleted ? false : taskDetails.isWontDo;
    return updateDoc(docRef, {
      ...taskDetails,
      isCompleted: isCompleted,
      completedTime: isCompleted || isWontDoNew ? markedTime : null,
      modifiedTime: markedTime,
      isWontDo: isWontDoNew,
    });
  } else {
    // Add marked task as new entry
    const isWontDoNew = isCompleted ? false : taskDetails.isWontDo;
    if (shouldCreateNewTask) {
      updateDoc(docRef, {
        ...taskDetails,
        taskDate: updatedTaskDate,
      });
      return addDoc(taskCollectionRef, {
        ...taskDetails,
        isCompleted: isCompleted,
        completedTime: markedTime,
        modifiedTime: markedTime,
        isWontDo: isWontDoNew,
        isRepeating: false,
        endBy: null,
        endByDate: null,
        endByRepeatCount: null,
        repeatFrequency: null,
      });
    } else {
      return updateDoc(docRef, {
        ...taskDetails,
        isCompleted: isCompleted,
        completedTime: markedTime,
        modifiedTime: markedTime,
        isWontDo: isWontDoNew,
        isRepeating: false,
        endBy: null,
        endByDate: null,
        endByRepeatCount: null,
        repeatFrequency: null,
      });
    }
  }
};

export const wontDoTaskApi = (
  userId,
  taskDetails,
  isWontDo,
  markedTime,
  updatedTaskDate,
  shouldCreateNewTask
) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const docRef = doc(taskCollectionRef, taskDetails.id);

  if (!taskDetails.isRepeating) {
    const isCompletedNew = isWontDo ? false : taskDetails.isCompleted;
    return updateDoc(docRef, {
      ...taskDetails,
      isWontDo: isWontDo,
      completedTime: isWontDo || isCompletedNew ? markedTime : null,
      modifiedTime: markedTime,
      isCompleted: isCompletedNew,
    });
  } else {
    // Add marked task as new entry
    const isCompletedNew = isWontDo ? false : taskDetails.isCompleted;
    if (shouldCreateNewTask) {
      updateDoc(docRef, {
        ...taskDetails,
        taskDate: updatedTaskDate,
      });
      return addDoc(taskCollectionRef, {
        ...taskDetails,
        isCompleted: isCompletedNew,
        completedTime: markedTime,
        modifiedTime: markedTime,
        isWontDo: isWontDo,
        isRepeating: false,
        endBy: null,
        endByDate: null,
        endByRepeatCount: null,
        repeatFrequency: null,
      });
    } else {
      return updateDoc(docRef, {
        ...taskDetails,
        isCompleted: isCompletedNew,
        completedTime: markedTime,
        modifiedTime: markedTime,
        isWontDo: isWontDo,
        isRepeating: false,
        endBy: null,
        endByDate: null,
        endByRepeatCount: null,
        repeatFrequency: null,
      });
    }
  }
};

export const hardDeleteTaskApi = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const q = query(taskCollectionRef, where("isDeleted", "==", 1));
  const snapShot = await getDocs(q);
  const results = snapShot.docs.map((doc) => ({ id: doc.id }));
  results.forEach(async (result) => {
    const docRef = doc(db, "users", userId, TASKS, result.id);
    await deleteDoc(docRef);
  });
};

export const hardDeleteSingleTaskApi = async (userId, currentTask) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const docRef = doc(taskCollectionRef, currentTask.id);
  return deleteDoc(docRef);
};

export const hardDeleteListTaskApi = async (userId, currentList) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const q = query(taskCollectionRef, where("listId", "==", currentList.id));
  const snapShot = await getDocs(q);
  const listTasks = snapShot.docs.map((doc) => ({ id: doc.id }));
  listTasks.forEach(async (task) => {
    const docRef = doc(db, "users", userId, TASKS, task.id);
    await deleteDoc(docRef);
  });
};

export const deleteTaskTagApi = async (userId, currentTag) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  const q = query(
    taskCollectionRef,
    where("tagIds", "array-contains", currentTag.id)
  );
  const snapShot = await getDocs(q);
  const tagTasks = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  tagTasks.forEach(async (task) => {
    const docRef = doc(db, "users", userId, TASKS, task.id);
    const modifiedTask = {
      ...task,
      tagIds: task.tagIds.filter((tag) => tag !== currentTag.id),
    };
    await updateDoc(docRef, modifiedTask);
  });
};

export const softDeleteMultipleTaskApi = async (userId, selectedTasks) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  selectedTasks.forEach(async (task) => {
    const docRef = doc(taskCollectionRef, task.id);
    await updateDoc(docRef, { ...task, isDeleted: 1 });
  });
};

export const softRestoreMultipleTaskApi = async (userId, selectedTasks) => {
  const userDocRef = doc(db, "users", userId);
  const taskCollectionRef = collection(userDocRef, TASKS);
  selectedTasks.forEach(async (task) => {
    const docRef = doc(taskCollectionRef, task.id);
    await updateDoc(docRef, { ...task, isDeleted: 0 });
  });
};
