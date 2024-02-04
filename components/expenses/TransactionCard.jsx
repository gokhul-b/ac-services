import React from "react";
import ElectricityIcon from "../icons/ElectricityIcon";
import HandMoneyIcon from "../icons/HandMoneyIcon";
import LabourIcon from "../icons/LabourIcon";
import MaintenanceIcon from "../icons/MaintenanceIcon";
import OthersIcon from "../icons/OthersIcon";
import DefaultIcon from "../icons/DefaultIcon";
const TransactionCard = ({ transaction }) => {
  const {
    category,
    amount,
    date,
    note,
    labourname,
    method,
    customerId,
    payerName,
  } = transaction;

  let icon, title, color, sign;

  // Determine icon, title, color, and sign based on the category
  switch (category) {
    case "E-Bill":
      icon = <ElectricityIcon />;
      title = "Electricity";
      color = "red";
      sign = "-";
      break;
    case "Labour":
      icon = <LabourIcon />;
      title = ""; // Empty title for Labour category
      color = "red";
      sign = "-";
      break;
    case "Maintenance":
      icon = <MaintenanceIcon />;
      title = "Maintenance";
      color = "red";
      sign = "-";
      break;
    case "Other":
      icon = <OthersIcon />;
      title = "Others";
      color = "red";
      sign = "-";
      break;
    case "Payment":
      icon = <HandMoneyIcon />;
      title = payerName + " - Payment";
      color = "green";
      sign = "+";
      break;
    default:
      // Handle other categories if needed
      icon = <DefaultIcon />;
      title = "Other Category";
      color = "gray";
      sign = "-";
      break;
  }

  return (
    <div
      key={date}
      className={`flex items-center justify-between border-b px-2 py-4 sm:space-x-24`}
    >
      <div className="flex items-center">
        <div className={`px-2 py-2 border rounded-lg bg-gray-100`}>{icon}</div>
        <div className="ml-2 space-y-1">
          <p className="font-semibold text-sm">{title}</p>
          {category === "Labour" && (
            <p className="font-semibold text-sm">{labourname}</p>
          )}
          <div className="flex space-x-2">
            <p className="text-muted-foreground text-xs">{date}</p>
            {note && (
              <p className="text-muted-foreground text-xs">Note: {note}</p>
            )}
            {method && (
              <p className="text-muted-foreground text-xs">Method: {method}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <p
          className={`font-semibold sm:text-lg text-base text-${color}-400`}
        >{`${sign} ₹${amount}`}</p>
      </div>
    </div>
  );
};

export default TransactionCard;
