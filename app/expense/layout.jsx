import { Suspense } from "react";
import Loading from "../loading";
import ExpenseNav from "@/components/ExpenseNav";

const ServiceLayout = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <ExpenseNav />
        <main className="sm:mx-48 mx-2">{children}</main>
      </div>
    </Suspense>
  );
};

export default ServiceLayout;
