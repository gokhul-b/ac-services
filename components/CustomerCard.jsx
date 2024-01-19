import { db } from "@/firebase/firebase";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import CustomerWallet from "./CustomerWallet";
import AddBill from "./AddBill";
import UpdatePhone from "./UpdatePhone";

const CustomerCard = async ({ customer }) => {
  const id = customer.cid;
  const docRef = doc(db, "customers", id);
  const docSnap = await getDoc(docRef);
  let data = docSnap.data();
  let totalWalletAmount = 0;
  const q1 = query(
    collection(db, "wallets"),
    where("customerId", "==", customer.cid)
  );
  const querySnapshotForWallet = await getDocs(q1);
  querySnapshotForWallet.forEach((doc) => {
    totalWalletAmount += parseInt(doc.data().amount);
  });
  let dueAmt = 0;
  let totalAmount = 0;
  let peelWt = 0;
  let bormaWt = 0;
  let bothWt = 0;
  const q2 = query(
    collection(db, "bills"),
    where("customerId", "==", customer.cid)
  );

  const querySnapshotForBills = await getDocs(q2);
  querySnapshotForBills.forEach((doc) => {
    totalAmount += parseInt(doc.data().total);
    if (doc.data().service == "peel") {
      peelWt += parseInt(doc.data().weight);
    } else if (doc.data().service == "borma") {
      bormaWt += parseInt(doc.data().weight);
    } else {
      bothWt += parseInt(doc.data().weight);
    }
  });

  dueAmt = totalAmount - parseInt(totalWalletAmount);
  return (
    <div className="sm:flex sm:flex-row sm:items-center flex-col border shadow-md sm:mt-8 mt-4">
      <div className="sm:text-base text-sm sm:w-[800px] w-full overflow-auto whitespace-normal my-6">
        <div className="border-b sm:border-r sm:py-5 py-2 sm:pl-10 pl-2">
          <h1 className="text-muted-foreground sm:mb-5 mb-2">
            Personal Information
          </h1>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="mb-1">Name</p>
              <p className="text-muted-foreground">{data.name}</p>
            </div>
            <div>
              <div className="flex items-center">
                <p className="mb-1 mr-2">Phone</p>
                <UpdatePhone customer={{ cid: id }} />
              </div>
              <p className="text-muted-foreground">{data.phone}</p>
            </div>
            <div>
              <p className="mb-1">Place</p>
              <p className="text-muted-foreground">{data.place}</p>
            </div>
          </div>
        </div>
        <div className="border-b sm:border-r sm:py-5 py-2 sm:pl-10 pl-2">
          <h1 className="text-muted-foreground sm:mb-5 mb-2">
            Transaction Information
          </h1>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="mb-1">Due Amount</p>
              <p className=" text-red-400">₹ {dueAmt}</p>
            </div>
            <div>
              <p className="mb-1">Paid Amount</p>
              <div className="flex items-center">
                <p className="text-green-400">₹ {totalWalletAmount}</p>
              </div>
            </div>
            <div>
              <p className="mb-1">Total Amount</p>
              <p className="text-muted-foreground">₹ {totalAmount}</p>
            </div>
          </div>
        </div>
        <div className="sm:py-5 py-2 sm:pl-10 pl-2 sm:border-r">
          <h1 className="text-muted-foreground sm:mb-5 mb-2">Quantities</h1>
          <div className="grid grid-cols-3 gap-8">
            <div>
              <p className="mb-1">Peel</p>
              <p className="text-muted-foreground">{peelWt} kg</p>
            </div>
            <div>
              <p className="mb-1">Borma</p>
              <p className="text-muted-foreground mr-2">{bormaWt} kg</p>
            </div>
            <div>
              <p className="mb-1">Peel & Borma</p>
              <p className="text-muted-foreground">{bothWt} kg</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col space-y-8 sm:px-10 px-2 sm:py-2 py-5">
        <CustomerWallet customer={{ cid: id }} />
        <AddBill
          customer={{
            cid: id,
            name: data.name,
            variant: "default",
          }}
        />
      </div>
    </div>
  );
};

export default CustomerCard;
