"use client";

import React, { Suspense, useState } from "react";
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
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectItem,
  SelectContent,
} from "./ui/select";
import { addToBills } from "@/app/action";
import Loading from "@/app/loading";
import { useToast } from "./ui/use-toast";

function AddBill({ customer }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const [form, setForm] = useState({
    customerId: customer.cid,
    date: "",
    service: "peel",
    weight: "",
    rate: "6",
    total: 0,
  });

  const handleChange = (e) => {
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
      updatedForm.total = parseInt(updatedForm.weight * updatedForm.rate);
      console.log(form);
      return updatedForm;
    });
  };

  let isValidForm =
    form.date.trim() !== "" && form.service.trim() !== "" && form.total !== 0;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await addToBills("bills", form);
      toast({
        description: res,
      });
      console.log("Form submitted successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error.message);
      toast({
        title: error,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Reset loading state when the process is complete (success or error)
    }
  };

  const handleClose = () => {
    // Reset the form to its initial state when closing the dialog
    setForm({
      customerId: customer.cid,
      date: "",
      service: "peel",
      weight: "",
      rate: "6",
      total: 0,
    });
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
        <Button
          variant={customer.variant}
          className="hover:bg-blue-500 w-full rounded-full"
        >
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
              value={form.date}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="service" className="text-right">
              Service
            </Label>
            <Select
              name="service"
              id="service"
              className="max-w-full"
              defaultValue="peel"
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
              value={form.rate}
              onChange={handleChange}
              placeholder="per kg"
              className="col-span-2"
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
              value={form.weight}
              onChange={handleChange}
              className="col-span-2"
              placeholder="weight in kg"
            />
            <p className="text-sm text-muted-foreground">
              ₹ {form.weight * form.rate}
            </p>
          </div>
        </form>
        <DialogFooter className="sm:justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Customer name: {customer.name}
          </p>
          <Suspense fallback={<Loading />}>
            <Button
              onClick={() => handleSubmit()}
              disabled={!isValidForm || isLoading}
            >
              {isLoading ? "Adding..." : "Add"}
            </Button>
          </Suspense>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddBill;
