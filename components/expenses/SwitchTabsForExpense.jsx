import React from "react";
import AddExpense from "./AddExpense";
import GetExpenses from "./GetExpenses";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";

const SwitchTabsForExpense = () => {
  return (
    <div className="py-4">
      <Tabs defaultValue="expenses">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="add">Add</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <AddExpense />
        </TabsContent>
        <TabsContent value="expenses">
          <GetExpenses />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwitchTabsForExpense;
