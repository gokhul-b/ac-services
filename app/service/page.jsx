// "use client";
import GetCustomers from "@/components/customers/GetCustomers";
import React, { Suspense } from "react";
import Loading from "../loading";

function Service() {
  return (
    <div className="text-center mt-4">
      <section>
        <div className="sm:mx-48 mx-2">
          <Suspense fallback={<Loading />}>
            <GetCustomers />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default Service;
