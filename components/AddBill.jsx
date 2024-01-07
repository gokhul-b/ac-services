"use client";

import React, { useState } from "react";
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
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@firebase/firebase";
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
  SelectContent,
} from "./ui/select";
import { addToDB } from "@app/action";

function AddBill({ customer }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    customerId: customer.cid,
    date: "",
    service: "",
    weight: 0,
    rate: 0,
    total: 0,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  form.total = form.weight * form.rate;

  const handleSubmit = async () => {
    try {
      console.log(form);
      const docRef = await addToDB("bills", form);
      console.log("Form submitted successfully!");
      console.log("Document written with ID: ", docRef);
      setForm({
        customerId: "",
        date: "",
        service: "",
        weight: "",
        rate: "",
        total: "",
      });
      setOpen(false);
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="hover:bg-blue-500">
          Add Bill
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <DialogTitle>Add new bill</DialogTitle>
          <DialogDescription>Click add when you're done.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              type="date"
              id="date"
              name="date"
              placeholder="Date"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight
            </Label>
            <Input
              type="number"
              name="weight"
              id="weight"
              onChange={handleChange}
              className="col-span-3"
              placeholder="weight in kg"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Service
            </Label>
            <Select
              name="service"
              id="service"
              // className="col-span-1"
              onValueChange={(val) => {
                setForm({ ...form, service: val });
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select service</SelectLabel>
                  <SelectItem value="peel">Peel</SelectItem>
                  <SelectItem value="borma">Borma</SelectItem>
                  <SelectItem value="both">Both</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rate" className="text-right">
              Rate
            </Label>
            <Input
              type="number"
              name="rate"
              id="rate"
              onChange={handleChange}
              placeholder="per kg"
              className="col-span-2"
            />
          </div>
        </form>
        <DialogFooter className="sm:justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Customer name: {customer.name}
          </p>
          <Button onClick={() => handleSubmit()}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddBill;
