"use server";

import { db } from "@firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export const addBill = async (name, form) => {
  const docRef = await addDoc(collection(db, name), form);
  return docRef.id;
};
