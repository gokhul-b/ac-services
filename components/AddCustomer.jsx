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
import { addToDB } from "@/app/action";

function AddCustomer() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    place: "",
    due: 0,
  });
  const [isValidForm, setValidForm] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => {
      const updatedForm = { ...prev, [e.target.name]: e.target.value };
      updateFormValidation();
      return updatedForm;
    });
    console.log(form);
  };

  const updateFormValidation = () => {
    const isValidPhoneNumber = /^\d{10}$/.test(form.phone);
    const isFormFilled =
      form.name.trim() !== "" && form.place.trim() !== "" && isValidPhoneNumber;

    setValidForm(isFormFilled);
  };

  const handleSubmit = async () => {
    try {
      console.log(form);
      const docRef = await addToDB("customers", form);
      console.log("Form submitted successfully!");
      console.log("Document written with ID: ", docRef);
      setForm({ name: "", phone: "", place: "", due: 0 });
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  const handleClose = () => {
    // Reset the form to its initial state when closing the dialog
    setForm({ name: "", phone: "", place: "", due: 0 });
    setValidForm(false);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        handleClose();
        setOpen(newOpen);
      }}
    >
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
              value={form.name}
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
              value={form.phone}
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
              value={form.place}
              placeholder="eg: Panruti"
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </form>
        <DialogFooter>
          <Button onClick={() => handleSubmit()} disabled={!isValidForm}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddCustomer;
