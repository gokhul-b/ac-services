import Header from "@/components/Header";
import { Suspense } from "react";
import Loading from "../loading";

const ServiceLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default ServiceLayout;
