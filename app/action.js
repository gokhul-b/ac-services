"use server";

import { db } from "@firebase/firebase";
import { addDoc, collection } from "firebase/firestore";
import { revalidatePath } from "next/cache";
export const addToDB = async (name, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidatePath("/service");
  return docRef.id;
};
export const addMoneyToWallet = async (name, id, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidatePath(`/service/${id}`);
  return docRef.id;
};
