"use server";

import { db } from "@/firebase/firebase";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { revalidatePath } from "next/cache";
export const addToDB = async (name, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidatePath("/service");
  return docRef.id;
};
export const addMoneyToWallet = async (name, id, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidatePath("/service");
  revalidatePath(`/service/${id}`);
  return docRef.id;
};

export const deleteBill = async (id) => {
  await deleteDoc(doc(db, "bills", id));
  revalidatePath("/service");
  revalidatePath(`/service/${id}`);
};
