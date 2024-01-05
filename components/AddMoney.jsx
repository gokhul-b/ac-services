import { addDoc, collection } from "firebase/firestore";
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
import { db } from "@firebase/firebase";
import { addBill } from "@app/action";

const AddMoney = ({ wallet }) => {
  const form = wallet.form;
  const handleSubmit = async () => {
    try {
      const docRef = await addBill("wallets", form);
      console.log("Form submitted successfully!");
      console.log("Document written with ID: ", docRef);
      window.location.reload();
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="border px-3 py-2 hover:bg-green-500 rounded-md font-semibold">
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
            <AlertDialogAction onClick={handleSubmit}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddMoney;
