import { db } from "@firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { BillTable } from "./bill-table";
import { billColumns } from "./billColumns";

const GetBills = async ({ customer }) => {
  const q = query(
    collection(db, "bills"),
    where("customerId", "==", customer.cid)
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return (
    <div>
      <BillTable columns={billColumns} data={data} />
    </div>
  );
};

export default GetBills;