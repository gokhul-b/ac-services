import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "../loading";

const ServiceLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Header />
        <main>{children}</main>
      </div>
    </Suspense>
  );
};

export default ServiceLayout;
