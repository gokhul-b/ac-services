// "use client";
import CustomerCard from "@components/CustomerCard";
import SwitchTabs from "@components/SwitchTabs";
import { db } from "@firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const page = async ({ params }) => {
  const q = query(
    collection(db, "bills"),
    where("customerId", "==", params.id)
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return (
    <div>
      <CustomerCard customer={{ cid: params.id }} />
      <SwitchTabs customer={{ cid: params.id }} />
    </div>
  );
};

export default page;
