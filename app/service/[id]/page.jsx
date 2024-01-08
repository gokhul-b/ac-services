// "use client";
import Loading from "@/app/loading";
import CustomerCard from "@/components/CustomerCard";
import SwitchTabs from "@/components/SwitchTabs";
import { db } from "@/firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Suspense } from "react";

const page = async ({ params }) => {
  const q = query(
    collection(db, "bills"),
    where("customerId", "==", params.id)
  );
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
    // console.log(data);
  });
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CustomerCard customer={{ cid: params.id }} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <SwitchTabs customer={{ cid: params.id }} />
      </Suspense>
    </div>
  );
};

export default page;
