"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { addExpense } from "@/app/action";

const AddExpense = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
    labourname: "",
  });

  const standardCategories = ["Labour", "E-Bill", "Maintenance", "Other"];
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (val) => {
    setForm({ ...form, category: val });
    setSelectedCategory(val);
  };
  const handleChange = (e) => {
    setForm((prevForm) => {
      const updatedForm = {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
      return updatedForm;
    });
    console.log(form);
  };

  let isValidForm = form.amount > 0 && form.category !== "" && form.date !== "";

  const handleSubmit = async (e) => {
    e.preventDefault;
    try {
      setIsLoading(true);
      const response = await addExpense(form);
      setForm({
        amount: "",
        category: "",
        date: "",
        note: "",
        labourname: "",
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:w-full sm:flex sm:justify-center font-[sans-serif] my-8">
      <Card className="shadow-xl sm:min-w-[600px] m-2 sm:px-3 sm:py-3 px-1 py-1">
        <CardHeader>
          <CardTitle className="font-semibold font-[sans-serif]">
            Add expense
          </CardTitle>
          <CardDescription>
            swiftly record and categorize expenses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-3">
            <div className="">
              <Label htmlFor="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                value={form.amount}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                placeholder="Date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label htmlFor="category" className="">
                Category
              </Label>
              <Select
                name="category"
                id="category"
                value={form.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder="Select category"
                    className="text-gray-500"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {standardCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {(selectedCategory === "Other" ||
              selectedCategory === "Maintenance") && (
              <div className="">
                <Label htmlFor="note">Note</Label>
                <Input
                  type="text"
                  id="note"
                  name="note"
                  placeholder="write a note"
                  value={form.note}
                  onChange={handleChange}
                  className="col-span-3 placeholder-gray-500"
                />
              </div>
            )}
            {selectedCategory === "Labour" && (
              <div className="">
                <Label htmlFor="labourname">Labour Name</Label>
                <Input
                  type="text"
                  id="labourname"
                  name="labourname"
                  placeholder="eg; Arivumani"
                  value={form.labourname}
                  onChange={handleChange}
                  className="col-span-3 placeholder-gray-500"
                />
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full mt-1"
            disabled={!isValidForm || isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Adding..." : "Add"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddExpense;
