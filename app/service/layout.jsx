import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "../loading";

const ServiceLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Header />
        <main className="sm:mx-48 mx-2">{children}</main>
      </div>
    </Suspense>
  );
};

export default ServiceLayout;
