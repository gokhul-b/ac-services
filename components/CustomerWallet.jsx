"use client";
import { useState } from "react";
import AddMoney from "./AddMoney";
import WalletIcon from "./WalletIcon";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "./ui/select";

const CustomerWallet = ({ customer }) => {
  const [form, setForm] = useState({
    customerId: customer.cid,
    date: "",
    amount: "",
    method: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleClear = () => {
    setForm({ customerId: customer.cid, date: "", amount: "", method: "" });
  };
  return (
    <div className="sm:pr-4 sm:pl-8 sm:border-l-2 mt-2 border-dashed">
      <Card>
        <div className="flex items-center justify-between">
          <CardHeader className="flex ">
            <CardTitle>Add money to wallet</CardTitle>
            <CardDescription>Click add when you're done.</CardDescription>
          </CardHeader>
          <div className="px-4">
            <WalletIcon />
          </div>
        </div>
        <CardContent className="sm:max-w-[380px]">
          <form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <Input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                name="amount"
                value={form.amount}
                placeholder="Enter amount"
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Method</Label>
              <Select
                name="method"
                id="method"
                className="col-span-3"
                value={form.method}
                onValueChange={(val) => {
                  setForm({ ...form, method: val });
                }}
              >
                <SelectTrigger className="w-[170px]">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Payment method</SelectLabel>
                    <SelectItem value="Upi">Upi</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="bg-red-500 hover:bg-red-400" onClick={handleClear}>
            Clear
          </Button>
          <AddMoney wallet={{ form }} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerWallet;
