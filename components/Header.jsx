import Expense from "./Expense";
import Logout from "./Logout";
import PendingAmount from "./PendingAmount";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function Header() {
  return (
    <div className="sm:mx-36 sm:py-2.5 sm:px-5 px-2.5 border-b-2 border-dashed">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Avatar className="h-6 w-6 sm:h-14 sm:w-14">
            <AvatarImage src="https://img.freepik.com/free-vector/vector-realistic-cashew-nuts-with-leaves-close-up-side-view-isolated-white-background_1284-46360.jpg?w=740&t=st=1704219072~exp=1704219672~hmac=0a808dcd301e97bbff9c1bee4c482a85b48a8939741423db557ef5021701ed5b" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div className="border-r-2 pr-4">
            <h1 className="sm:font-medium font-normal sm:text-lg text-sm">
              Aasai Cashews
            </h1>
            <p className="text-sm text-muted-foreground text-start">Services</p>
          </div>
          <div>
            <PendingAmount />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Expense />
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Header;
