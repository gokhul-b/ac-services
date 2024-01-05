import { db } from "@firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { WalletTable } from "./walletTable";
import { walletColumns } from "./walletColumns";

const GetWalletData = async ({ customer }) => {
  const q = query(
    collection(db, "wallets"),
    where("customerId", "==", customer.cid)
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return (
    <div>
      <WalletTable columns={walletColumns} data={data} />
    </div>
  );
};

export default GetWalletData;
