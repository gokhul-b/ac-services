"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SelectDates from "../SelectDates";
import ExpenseDashboard from "./ExpenseDashboard";
import { getExpensesByDates, getExpensesByDuration } from "@/app/action";
import Transactions from "./Transactions";

const ExpenseCard = ({ initialData }) => {
  const [activeButton, setActiveButton] = useState("btn1month");
  const [expenses, setExpenses] = useState(initialData["expenses"]);
  const [incomes, setIncomes] = useState(initialData["incomes"]);
  const [duration, setDuration] = useState(1);

  const handleButtonClick = async (buttonId) => {
    setActiveButton(buttonId);
    try {
      const duration = getDurationFromButtonId(buttonId);
      const res = await getExpensesByDuration(duration);
      setExpenses(res["expenses"]);
      setIncomes(res["incomes"]);
      setDuration(duration);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDateSelection = async (startDate, endDate, duration) => {
    try {
      const res = await getExpensesByDates(startDate, endDate);
      console.log(duration);
      setExpenses(res["expenses"]);
      setIncomes(res["incomes"]);
      setDuration(duration);
    } catch (e) {
      console.error(e);
    }
  };

  const getDurationFromButtonId = (buttonId) => {
    const durationMap = {
      btn1month: 1,
      btn3months: 3,
      btn6months: 6,
      btn12months: 12,
    };
    return durationMap[buttonId];
  };

  return (
    <div>
      <div className="flex justify-between my-8">
        <div>
          <Button
            variant="outline"
            onClick={() => handleButtonClick("btn12months")}
            className={`${
              activeButton === "btn12months"
                ? "bg-blue-500 text-white"
                : "border"
            } rounded-tr-none rounded-br-none sm:text-sm text-xs sm:px-4 sm:py-2 px-2 py-1`}
          >
            12 months
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick("btn6months")}
            className={`${
              activeButton === "btn6months"
                ? "bg-blue-500 text-white"
                : "border"
            } rounded-none sm:text-sm text-xs sm:px-4 sm:py-2 px-2 py-1`}
          >
            6 months
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick("btn3months")}
            className={`${
              activeButton === "btn3months"
                ? "bg-blue-500 text-white"
                : "border"
            } rounded-none sm:text-sm text-xs sm:px-4 sm:py-2 px-2 py-1`}
          >
            3 months
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick("btn1month")}
            className={`${
              activeButton === "btn1month" ? "bg-blue-500 text-white" : "border"
            } rounded-tl-none rounded-bl-none sm:text-sm text-xs sm:px-4 sm:py-2 px-2 py-1`}
          >
            30 days
          </Button>
        </div>
        <div>
          <SelectDates onDateSelect={handleDateSelection} />
        </div>
      </div>
      <div>
        <ExpenseDashboard
          data={{ expenses: expenses, incomes: incomes, duration: duration }}
        />
      </div>
      <div className="my-8">
        <Transactions
          data={{ expenses: expenses, incomes: incomes, duration: duration }}
        />
      </div>
    </div>
  );
};

export default ExpenseCard;
