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
import { v4 as cid } from "uuid";
import { addToDB } from "@/app/action";

function AddCustomer() {
  const uid = cid();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    place: "",
    customerId: uid,
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const docRef = await addToDB("customers", form);
      console.log("Form submitted successfully!");
      console.log("Document written with ID: ", docRef);
      setForm({ name: "", phone: "", place: "", customerId: "" });
      setOpen(false);
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Customer !</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new customer</DialogTitle>
          <DialogDescription>Click add when you're done.</DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Customer name"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              name="phone"
              placeholder="10 digit"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="place" className="text-right">
              Place
            </Label>
            <Input
              id="place"
              name="place"
              placeholder="eg: Panruti"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter>
          <Button onClick={() => handleSubmit()}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddCustomer;
