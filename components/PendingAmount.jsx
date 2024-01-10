import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const PendingAmount = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  let totAmt = 0;
  querySnapshot.forEach((doc) => {
    totAmt += parseInt(doc.data().due);
  });
  // const querySnapshot1 = await getDocs(collection(db, "wallets"));
  // let walletAmt = 0;
  // querySnapshot1.forEach((doc) => {
  //   walletAmt += parseInt(doc.data().amount);
  // });
  return (
    <div>
      <p className="font-regular text-green-500 sm:text-lg text-sm font-semibold">
        ₹ {totAmt}
      </p>
    </div>
  );
};

export default PendingAmount;
