"use server";

import { db } from "@/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { runTransaction } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const addToDB = async (name, form) => {
  const docRef = await addDoc(collection(db, name), form);
  revalidatePath("/service");
  return docRef.id;
};

export const addToBills = async (name, form) => {
  const docRef = await addDoc(collection(db, name), form);
  const sfDocRef = doc(db, "customers", form.customerId);
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newDue = sfDoc.data().due + parseInt(form.total);
      transaction.update(sfDocRef, { due: newDue });
    });
    revalidatePath("/service");
    return "Bill is added successfully";
  } catch (e) {
    console.error(e);
    return `${e}`;
  }
};

export const addMoneyToWallet = async (name, id, form) => {
  const docRef = await addDoc(collection(db, name), form);
  const sfDocRef = doc(db, "customers", id);
  try {
    await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      const newDue = sfDoc.data().due - parseInt(form.amount);
      transaction.update(sfDocRef, { due: newDue });
    });
    revalidatePath("/service");
    return "Money is added successfully";
  } catch (e) {
    console.error(e);
    return `${e}`;
  }
};

export const deleteBill = async (id) => {
  await deleteDoc(doc(db, "bills", id));
  revalidatePath("/service");
  revalidatePath(`/service/${id}`);
};

export const updatePhoneNumber = async (docId, newPhone) => {
  const sfDocRef = doc(db, "customers", docId);
  try {
    const newPhoneNumber = await runTransaction(db, async (transaction) => {
      const sfDoc = await transaction.get(sfDocRef);
      if (!sfDoc.exists()) {
        throw "Document does not exist!";
      }
      transaction.update(sfDocRef, { phone: newPhone });
    });
    revalidatePath(`/service/${docId}`);
    return "Phone number is updated successfully";
  } catch (e) {
    console.error(e);
    return `${e}`;
  }
};

export const deleteCustomer = async (id) => {
  try {
    await deleteDoc(doc(db, "customers", id));
    const queryForBills = query(
      collection(db, "bills"),
      where("customerId", "==", id)
    );
    const querySnapshotForBill = await getDocs(queryForBills);
    querySnapshotForBill.forEach((bill) => {
      deleteDoc(doc(db, "bills", bill.id));
    });
    const queryForWallets = query(
      collection(db, "wallets"),
      where("customerId", "==", id)
    );
    const querySnapshotForWallet = await getDocs(queryForWallets);
    querySnapshotForWallet.forEach((wallet) => {
      deleteDoc(doc(db, "wallets", wallet.id));
    });
    revalidatePath("/service");
    return "Customer is removed successfully";
  } catch (e) {
    return `${e}`;
  }
};
