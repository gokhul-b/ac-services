import React from "react";
import ExpenseCard from "./ExpenseCard";
import { getInitialDataForExpensePage } from "@/app/action";

const GetExpenses = async () => {
  const initialData = await getInitialDataForExpensePage();
  return (
    <div>
      <ExpenseCard initialData={initialData} />
    </div>
  );
};

export default GetExpenses;
