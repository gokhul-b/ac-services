"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import SelectDates from "../SelectDates";

const ExpenseCard = () => {
  const [activeButton, setActiveButton] = useState("btn12months");
  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    // Add any additional logic or actions you want to perform when a button is clicked
  };
  return (
    <div>
      <div className="flex justify-between">
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
            1 month
          </Button>
        </div>
        <div>
          <SelectDates />
        </div>
      </div>
      <div>Expenses</div>
    </div>
  );
};

export default ExpenseCard;
