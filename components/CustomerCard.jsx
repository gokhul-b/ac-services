import { db } from "@firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CustomerWallet from "./CustomerWallet";

const CustomerCard = async ({ customer }) => {
  const id = customer.cid;
  const q = query(collection(db, "customers"), where("customerId", "==", id));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
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
    <div className="sm:flex sm:flex-row sm:justify-between flex-col border shadow-md sm:mx-36 sm:py-5 sm:px-5 px-2.5 py-2 sm:mt-8 mt-4 mx-2">
      <div className="sm:px-4 sm:py-4 px-2 py-2">
        <h1 className="font-bold sm:text-2xl text-lg sm:pb-8 pb-2 text-blue-700">
          Customer overview:
        </h1>
        <div className="flex sm:flex-row sm:space-x-24 flex-col">
          <div className="sm:space-y-8 mb-2">
            <p className="font-semibold">
              Name: <span className="font-normal">{data[0].name}</span>
            </p>
            <p className="font-semibold">
              Phone: <span className="font-normal">+91 {data[0].phone}</span>
            </p>
            <p className="font-semibold">
              Place: <span className="font-normal">{data[0].place}</span>
            </p>
          </div>
          <div className="sm:space-y-8 mb-2">
            <p className="font-semibold text-red-500">
              Due amt: <span className="font-normal">₹ {dueAmt}</span>
            </p>
            <p className="font-semibold text-green-500">
              Paid amt:{" "}
              <span className="font-normal">₹ {totalWalletAmount}</span>
            </p>
            <p className="font-semibold">
              Total amt: <span className="font-normal">₹ {totalAmount}</span>
            </p>
          </div>
          <div className="sm:space-y-8">
            <p className="font-semibold">
              Peel qty: <span className="font-normal">{peelWt} kg</span>
            </p>
            <p className="font-semibold">
              Borma qty: <span className="font-normal">{bormaWt} kg</span>
            </p>
            <p className="font-semibold">
              Both qty: <span className="font-normal">{bothWt} kg</span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <CustomerWallet customer={{ cid: id }} />
      </div>
    </div>
  );
};

export default CustomerCard;
