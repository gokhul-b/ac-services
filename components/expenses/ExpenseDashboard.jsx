import ElectricityIcon from "../icons/ElectricityIcon";
import LabourIcon from "../icons/LabourIcon";
import MaintenanceIcon from "../icons/MaintenanceIcon";
import OthersIcon from "../icons/OthersIcon";
import ArrowUpTrend from "../icons/ArrowUpTrend";
import ArrowDownTrend from "../icons/ArrowDownTrend";
import ProfitIcon from "../icons/ProfitIcon";

const ExpenseDashboard = ({ data }) => {
  let totalElectircity = 0;
  let totalMaintenance = 0;
  let totalLabour = 0;
  let totalOthers = 0;
  let totalIncome = 0;
  const getMonth = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };
  const dateRange = getMonth();
  let expenses = data.expenses;
  let incomes = data.incomes;
  if (incomes) {
    incomes.forEach((income) => {
      const amt = parseInt(income.amount, 10);
      totalIncome += amt;
    });
  }
  if (expenses) {
    expenses.forEach((expense) => {
      const category = expense.category;
      const amount = parseInt(expense.amount, 10); // Parse amount as integer
      // Add the amount to the corresponding category in the object
      if (category === "E-Bill") {
        totalElectircity += amount;
      } else if (category === "Maintenance") {
        totalMaintenance += amount;
      } else if (category === "Labour") {
        totalLabour += amount;
      } else if (category === "Other") {
        totalOthers += amount;
      }
    });
  }
  let totalExpense =
    totalElectircity + totalMaintenance + totalLabour + totalOthers;
  let totalProfit = totalIncome - totalExpense;
  return (
    <div className="flex sm:flex-row flex-col sm:space-x-4 sm:space-y-0 space-y-4">
      <div className="space-y-4">
        <div className="border sm:w-[200px] px-4 py-4 rounded-xl flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm ">Total Income</p>
            <p className=" text-muted-foreground text-xs">{dateRange}</p>
            <p className="mt-4 font-semibold text-xl">₹{totalIncome}</p>
          </div>
          <div>
            <ArrowUpTrend />
          </div>
        </div>
        <div className="border sm:w-[200px] px-4 py-4 rounded-xl flex justify-between items-start">
          <div>
            <p className="font-semibold text-sm ">Total Expense</p>
            <p className=" text-muted-foreground text-xs">{dateRange}</p>
            <p className="mt-4 font-semibold text-xl">₹{totalExpense}</p>
          </div>
          <div>
            <ArrowDownTrend />
          </div>
        </div>
      </div>
      <div className="border rounded-xl px-4 py-4 sm:w-[724px]">
        <h1 className="font-semibold text-sm mb-4">By category</h1>
        <div className="grid sm:grid-cols-2 sm:gap-4 grid-cols-1 gap-4">
          <div className="flex flex-wrap items-center justify-between border rounded-xl px-4 py-4 space-x-24">
            <div className="flex items-center">
              <div className="px-2 py-2 border rounded-lg bg-gray-100">
                <ElectricityIcon />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">Electricity</p>
                <p className="text-muted-foreground text-xs">{dateRange}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg ">₹{totalElectircity}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-xl px-4 py-4 space-x-24">
            <div className="flex items-center">
              <div className="px-2 py-2 border rounded-lg bg-gray-100">
                <LabourIcon />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">Labour</p>
                <p className="text-muted-foreground text-xs">{dateRange}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">₹{totalLabour}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-xl px-4 py-4 space-x-24">
            <div className="flex items-center">
              <div className="px-2 py-2 border rounded-lg bg-gray-100">
                <MaintenanceIcon />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">Maintenance</p>
                <p className="text-muted-foreground text-xs">{dateRange}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">₹{totalMaintenance}</p>
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-xl px-4 py-4 space-x-24">
            <div className="flex items-center">
              <div className="px-2 py-2 border rounded-lg bg-gray-100">
                <OthersIcon />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">Others</p>
                <p className="text-muted-foreground text-xs">{dateRange}</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg">₹{totalOthers}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border sm:w-[180px] px-4 py-4 rounded-xl">
        <div>
          <p className="font-semibold text-sm ">Total Profit</p>
          <p className=" text-muted-foreground text-xs">{dateRange}</p>
          <p className="my-4 font-semibold text-2xl">₹{totalProfit}</p>
        </div>
        <div className="flex justify-center items-center my-6">
          <ProfitIcon />
        </div>
      </div>
    </div>
  );
};

export default ExpenseDashboard;
