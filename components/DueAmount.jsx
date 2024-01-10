import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const DueAmount = async ({ customer }) => {
  let dueAmt = 0;
  //   const docRef = doc(db, "customers", customer.cid);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     dueAmt = docSnap.data().due;
  //     console.log(dueAmt);
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }

  return <p className="text-green-400">₹ 10000</p>;
};

export default DueAmount;
