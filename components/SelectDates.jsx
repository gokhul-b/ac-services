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

const SelectDates = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    // Reset the form to its initial state when closing the dialog
    setStartDate("");
    setEndDate("");
    // isValidPhoneNumber = false;
    setOpen(false);
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
          <Button variant="outline">Select dates</Button>
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
              <Input
                type="date"
                id="start date"
                placeholder="start"
                className="w-auto"
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <p className="mx-2">-</p>
              <Input
                type="date"
                id="end date"
                className="w-auto"
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </form>
          <DialogFooter className="flex justify-end items-center">
            <Button onClick={() => handleSubmit()}>Get Expenses</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectDates;
