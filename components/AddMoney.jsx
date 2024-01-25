"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { addMoneyToWallet } from "@/app/action";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

const AddMoney = ({ wallet, onAddMoneySuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = wallet.form;
  let isValidForm =
    form.date !== "" && form.amount !== "" && form.method !== "";
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await addMoneyToWallet("wallets", form.customerId, form);
      toast({
        description: res,
      });
      console.log("Form submitted successfully!");
      isValidForm = false;
      if (onAddMoneySuccess) {
        onAddMoneySuccess();
      }
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
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="border px-3 py-2.5 text-white text-sm bg-green-600 hover:bg-green-500 selection:font-medium rounded-md ">
          Add Money
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              <span className="font-semibold mr-2">
                Date: {wallet.form.date}
              </span>
              <span className="font-semibold mr-2">
                Amount: {wallet.form.amount}
              </span>
              <span className="font-semibold">
                Method: {wallet.form.method} <br />
              </span>
              <span>
                This action cannot be undone. This will add this amount into
                their wallet.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit}
              disabled={!isValidForm || isLoading}
            >
              {isLoading ? "Crediting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddMoney;
