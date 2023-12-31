"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { db } from "@firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

import { useState } from "react";

const AddBill = () => {
  const [form, setForm] = useState({
    date: "",
    name: "",
    number: "",
    place: "",
    service: "",
    weight: 0,
    charge: 0,
    total: 0,
  });
  const handleChange = (e) => {
    console.log(e);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  form.total = form.weight * form.charge;
  const handleSubmit = async () => {
    // Calculate the total before submitting
    const total = form.weight * form.charge;
    console.log(form);
    // Update the form state with the calculated total
    setForm({ ...form, total });

    try {
      const docRef = await addDoc(collection(db, "users"), form);
      setForm({
        date: "",
        name: "",
        number: "",
        place: "",
        service: "",
        weight: 0,
        charge: 0,
        total: 0,
      });

      console.log("Form submitted successfully!");
      console.log("Document written with ID: ", docRef.id);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  return (
    <div className="w-full bg-gray-100 h-screen">
      <div className="h-full flex justify-center items-center">
        <div className="border border-black p-5">
          <h1 className="text-center font-bold">Add Bill</h1>
          <form action={handleSubmit} className="grid grid-cols-3 gap-8 m-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                placeholder="eg: Bala guru"
                required
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="number">Phone</Label>
              <Input
                type="tele"
                id="number"
                name="number"
                onChange={handleChange}
                placeholder="10 digit"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                name="date"
                onChange={handleChange}
                placeholder="Date"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="place">Place</Label>
              <Input
                type="text"
                name="place"
                id="place"
                onChange={handleChange}
                placeholder="eg: sathipattu"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="weight">Weight</Label>
              <Input
                type="number"
                name="weight"
                id="weight"
                onChange={handleChange}
                placeholder="weight in kg"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="service">Service type</Label>
              <Select
                name="service"
                id="service"
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
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="charge">Charge</Label>
              <Input
                type="number"
                name="charge"
                id="charge"
                onChange={handleChange}
                placeholder="per kg"
              />
            </div>
            <div className="w-full max-w-sm grid items-center">
              <h1>Total : {form.total}</h1>
            </div>
            <div className="w-full max-w-sm grid items-center">
              <Button type="submit">Add Bill</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddBill;
