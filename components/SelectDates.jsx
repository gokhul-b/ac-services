"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SelectDates = ({ onDateSelect }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    // Calculate the duration in months
    const startYear = parsedStartDate.getFullYear();
    const startMonth = parsedStartDate.getMonth() + 1;
    const endYear = parsedEndDate.getFullYear();
    const endMonth = parsedEndDate.getMonth() + 1;

    console.log(endMonth, endYear);
    const duration = (endYear - startYear) * 12 + (endMonth - startMonth);
    onDateSelect(startDate, endDate, duration);
    handleClose();
  };

  const handleClose = () => {
    // Reset the form to its initial state when closing the dialog
    setStartDate("");
    setEndDate("");
    // isValidPhoneNumber = false;
    setOpen(false);
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(newOpen) => {
          handleClose();
          setOpen(newOpen);
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="sm:text-sm text-xs sm:px-4 sm:py-2 px-2 py-1"
          >
            Select dates
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle>Select dates</DialogTitle>
            <DialogDescription>
              which you want see the expenses
            </DialogDescription>
          </DialogHeader>
          <form className="">
            <div className="flex items-center">
              <div>
                <Input
                  type="date"
                  id="start date"
                  placeholder="start"
                  className="w-auto"
                  max={getCurrentDate()}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                />
              </div>
              <p className="mx-2">-</p>
              <Input
                type="date"
                id="end date"
                className="w-auto"
                max={getCurrentDate()}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </form>
          <DialogFooter className="flex justify-end items-center">
            <Button onClick={handleSubmit}>Get Expenses</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectDates;
