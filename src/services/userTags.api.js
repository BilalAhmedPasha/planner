import firestore from "../firebase";
import { addDoc, collection, getDocs } from "@firebase/firestore";

export const fetchTagsApi = async () => {
  // return firestore().collection("tags").get();
  const ref = collection(firestore, "tags");
  return getDocs(ref);
  // const snapshot = await firestore().collection("tags").get();
  // return snapshot.docs.map((doc) => doc.data());
  // return snapshot.docs.map(doc => doc.data());
  // return Promise.resolve([
  //   {
  //     label: "Tag 1",
  //     color: "#6CBBCD",
  //     redirectUrl: "tag-1",
  //   },
  //   {
  //     label: "Tag 2",
  //     color: "#966CCD",
  //     redirectUrl: "tag-2",
  //   },
  // ]);
};

export const addTagApi = (newTag) => {
  const ref = collection(firestore, "tags");
  return addDoc(ref, newTag);
};
