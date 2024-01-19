import React from "react";
import GoBackIcon from "./icons/GoBackIcon";
import { UserButton } from "@clerk/nextjs";

const ExpenseNav = () => {
  return (
    <div className="sm:mx-36 sm:py-5 py-2.5 sm:px-5 px-2.5 border-b-2 border-dashed">
      <div className="flex justify-between items-center">
        <div className="flex sm:space-x-8 space-x-4 items-center">
          <GoBackIcon page={{ path: "/service" }} />
          <p className="sm:font-bold font-semibold sm:text-[24px] text-[18px]">
            Expense Tracker
          </p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default ExpenseNav;
