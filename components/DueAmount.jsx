// import { db } from "@firebase/firebase";
// import { collection, getDocs, query, where } from "firebase/firestore";

// const DueAmount = async ({ customer }) => {
//   let walletAmt = customer.walletAmt;
//   let dueAmt = 0;
//   let totalAmount = 0;
//   let peelWt = 0;
//   let bormaWt = 0;
//   let bothWt = 0;
//   const q = query(
//     collection(db, "bills"),
//     where("customerId", "==", customer.cid)
//   );
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     totalAmount += parseInt(doc.data().total);
//     if (doc.data().service == "peel") {
//       peelWt += parseInt(doc.data().weight);
//     } else if (doc.data().service == "borma") {
//       bormaWt += parseInt(doc.data().weight);
//     } else {
//       bothWt += parseInt(doc.data().weight);
//     }
//   });
//   dueAmt = totalAmount - parseInt(walletAmt);
//   return (
//     <div className="flex space-x-6">
//       <p className="font-semibold">
//         Due amt: <span className="font-normal">{dueAmt}</span>
//       </p>
//       <p className="font-semibold">
//         Total amt: <span className="font-normal">{totalAmount}</span>
//       </p>
//     </div>
//     <div>
//       <div>
//         <p className="font-semibold">
//           Peel Qnt: <span className="font-normal">{peelWt} kg</span>
//         </p>
//         <p className="font-semibold">
//           Borma Qnt: <span className="font-normal">{bormaWt} kg</span>
//         </p>
//         <p className="font-semibold">
//           Both Qnt: <span className="font-normal">{bothWt} kg</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DueAmount;
