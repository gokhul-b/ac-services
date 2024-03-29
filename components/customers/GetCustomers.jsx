import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const GetCustomers = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  let data = [];
  querySnapshot.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    data.push(temp);
  });
  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default GetCustomers;
