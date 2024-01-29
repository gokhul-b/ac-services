"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import SelectDates from "../SelectDates";
import ExpenseDashboard from "./ExpenseDashboard";
import ExpenseList from "./Transactions";
import { getExpensesByDuration } from "@/app/action";
import Transactions from "./Transactions";

const ExpenseCard = () => {
  const [activeButton, setActiveButton] = useState("btn1month");
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [duration, setDuration] = useState(0);

  const handleButtonClick = async (buttonId) => {
    setActiveButton(buttonId);
    try {
      const duration = getDurationFromButtonId(buttonId);
      const res = await getExpensesByDuration(duration);
      // console.log(res);
      setExpenses(res["expenses"]);
      setIncomes(res["incomes"]);
      // console.log(res);
      setDuration(duration);
      // // Iterate through the expenses array
      //
    } catch (e) {
      console.error(e);
    }
    // Add any additional logic or actions you want to perform when a button is clicked
  };
  const getDurationFromButtonId = (buttonId) => {
    // Map button IDs to corresponding time durations
    const durationMap = {
      btn1month: 1,
      btn3months: 3,
      btn6months: 6,
      btn12months: 12,
    };
    return durationMap[buttonId];
  };
  useEffect(() => {
    // Fetch data for the default duration (last 30 days) when the component mounts
    const defaultButtonId = "btn1month";
    handleButtonClick(defaultButtonId);
  }, []);
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
            } rounded-tr-none rounded-br-none`}
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
            } rounded-none`}
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
            } rounded-none`}
          >
            3 months
          </Button>
          <Button
            variant="outline"
            onClick={() => handleButtonClick("btn1month")}
            className={`${
              activeButton === "btn1month" ? "bg-blue-500 text-white" : "border"
            } rounded-tl-none rounded-bl-none`}
          >
            Last 30 days
          </Button>
        </div>
        <div>
          <SelectDates />
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
