import { db } from "@firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";

const GetCustomers = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return (
    <div>
      <h1>All Customers</h1>
    </div>
  );
};

export default GetCustomers;
