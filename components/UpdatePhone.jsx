"use client";
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
import { useState } from "react";
import PhoneIcon from "./PhoneIcon";
import EditIcon from "./EditIcon";
import { useToast } from "./ui/use-toast";
import { updatePhoneNumber } from "@/app/action";

const UpdatePhone = ({ customer }) => {
  const [newPhone, setNewPhone] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    setNewPhone(e.target.value);
  };

  let isValidPhoneNumber = /^\d{10}$/.test(newPhone);

  const handleClose = () => {
    // Reset the form to its initial state when closing the dialog
    setNewPhone("");
    // isValidPhoneNumber = false;
    setOpen(false);
  };

  const handleSubmit = async () => {
    const res = await updatePhoneNumber(customer.cid, newPhone);
    toast({
      description: res,
    });
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
          <div className="hover:bg-gray-200 rounded-sm pb-1">
            <EditIcon />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle>Update phone number</DialogTitle>
            <DialogDescription>
              Click update when you're done.
            </DialogDescription>
          </DialogHeader>
          <form className="">
            <div className="flex space-x-4 items-center">
              <PhoneIcon />
              <Input
                type="tele"
                id="new phone number"
                placeholder="10 digit"
                onChange={handleChange}
              />
            </div>
          </form>
          <DialogFooter className="flex justify-end items-center">
            <Button
              onClick={() => handleSubmit()}
              disabled={!isValidPhoneNumber}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdatePhone;
