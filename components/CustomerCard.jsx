import { db } from "@firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import CustomerWallet from "./CustomerWallet";
import WalletAmount from "./WalletAmount";

const CustomerCard = async ({ customer }) => {
  const id = customer.cid;
  const q = query(collection(db, "customers"), where("customerId", "==", id));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return (
    <div className="sm:flex md:flex-row flex-col border shadow-md sm:mx-36 sm:py-5 sm:px-5 px-2.5 py-2 sm:mt-8 mt-4 mx-2">
      <div className="w-full sm:px-4 sm:py-4 px-2 py-2">
        <h1 className="font-bold sm:text-2xl text-lg sm:pb-8 pb-2 text-blue-700">
          Customer overview:
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="sm:w-1/3 flex sm:flex-col flex-row sm:space-y-8">
            <p className="font-semibold text-sm sm:text-base">
              Name: <span className="font-normal">{data[0].name}</span>
            </p>
            <p className="font-semibold text-sm sm:text-base">
              Phone: <span className="font-normal">+91 {data[0].phone}</span>
            </p>
            <p className="font-semibold text-sm sm:text-base">
              Place: <span className="font-normal">{data[0].place}</span>
            </p>
          </div>
          <div className="sm:w-1/2">
            <WalletAmount customer={{ cid: id }} />
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
