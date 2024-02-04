"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ListCheckIcon from "../icons/ListCheckIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import TransactionCard from "./TransactionCard";

const Transactions = ({ data }) => {
  // Combine expenses and incomes, and sort them based on the date
  const allTransactions = [...data.expenses, ...data.incomes].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [transactions, setTransactions] = useState(allTransactions);
  const categories = ["E-Bill", "Labour", "Maintenance", "Other", "Payment"];

  const handleCategorySelect = (event) => {
    const category = event.target.value;
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(category)
        ? prevSelected.filter((selected) => selected !== category)
        : [...prevSelected, category]
    );
    console.log(selectedCategories);
    // Check if any categories are selected
    if (selectedCategories.length > 0) {
      // Call filter directly without a button
      filterTransactions();
    } else {
      // If no categories are selected, reset to original transactions
      setTransactions(allTransactions);
    }
  };

  const filterTransactions = () => {
    console.log(selectedCategories + " handleFilter");
    const filterTransactions = allTransactions.filter((transaction) =>
      selectedCategories.includes(transaction.category)
    );
    if (filterTransactions.length > 0) {
      setTransactions(filterTransactions);
    } else {
      setTransactions(allTransactions);
    }
  };

  useEffect(() => {
    filterTransactions();
  }, [selectedCategories]);

  const renderCard = (transaction, index) => {
    return <TransactionCard key={index} transaction={transaction} />;
  };

  return (
    <div>
      <ScrollArea className="h-[600px] sm:w-[540px] rounded-md border sm:p-4 relative">
        <div className="sticky top-0 bg-white z-10 sm:p-3 pt-3 pl-3 flex items-center justify-between">
          <div>
            {data.duration == 1 ? (
              <p className="font-semibold text-lg">Last 30 days Transaction</p>
            ) : (
              <p className="font-semibold text-lg">
                Last {data.duration} months Transaction
              </p>
            )}
          </div>
          <div>
            <Popover>
              <PopoverTrigger>
                <ListCheckIcon />
              </PopoverTrigger>
              <PopoverContent className="w-50 flex-col space-y-2">
                {categories.map((category, index) => (
                  <div className="flex space-x-2" key={index}>
                    <input
                      type="checkbox"
                      value={category}
                      id={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategorySelect}
                    />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {transactions.map((transaction, index) =>
          renderCard(transaction, index)
        )}
      </ScrollArea>
    </div>
  );
};

export default Transactions;
