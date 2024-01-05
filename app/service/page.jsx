// "use client";
import GetCustomers from "@components/customers/GetCustomers";
import React from "react";

function Service() {
  console.log(process.env.FIREBASE_APP_ID);
  return (
    <div className="text-center mt-4">
      <section>
        <div className="sm:mx-48 mx-2">
          <GetCustomers />
        </div>
      </section>
    </div>
  );
}

export default Service;
