import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { BillTable } from "./bill-table";
import { billColumns } from "./billColumns";
import { format } from "date-fns";
const GetBills = async ({ customer }) => {
  const q = query(
    collection(db, "bills"),
    where("customerId", "==", customer.cid)
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    let temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });
  return (
    <div>
      <BillTable columns={billColumns} data={data} />
    </div>
  );
};

export default GetBills;
