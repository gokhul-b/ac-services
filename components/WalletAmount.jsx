import { db } from "@firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const WalletAmount = async ({ customer }) => {
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
  const q = query(
    collection(db, "bills"),
    where("customerId", "==", customer.cid)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div className="flex sm:flex-col flex-row justify-between sm:space-y-8">
        <p className="font-semibold text-red-600 text-sm sm:text-base">
          Due amt: <span className="font-normal">₹ {dueAmt}</span>
        </p>
        <p className="font-semibold text-green-600 text-sm sm:text-base">
          Wallet amt: <span className="font-normal">₹ {totalWalletAmount}</span>
        </p>
        <p className="font-semibold text-sm sm:text-base">
          Total amt: <span className="font-normal">₹ {totalAmount}</span>
        </p>
      </div>
      <div className="flex sm:flex-col flex-row justify-between sm:space-y-8">
        <p className="font-semibold sm:text-base">
          Peel qty: <span className="font-normal">{peelWt} kg</span>
        </p>
        <p className="font-semibold sm:text-base">
          Borma qty: <span className="font-normal ">{bormaWt} kg</span>
        </p>
        <p className="font-semibold text-sm sm:text-base">
          Both qty: <span className="font-normal">{bothWt} kg</span>
        </p>
      </div>
    </div>
  );
};

export default WalletAmount;
