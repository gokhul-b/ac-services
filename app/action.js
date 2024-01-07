"use server";

import { db } from "@firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidateTag } from "next/cache";
export const addToDB = async (name, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidateTag("service");
  return docRef.id;
};
export const addMoneyToWallet = async (name, id, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidateTag(`service/${id}`);
  return docRef.id;
};
