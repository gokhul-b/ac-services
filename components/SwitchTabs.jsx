import GetBills from "./bills/GetBills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import GetWalletData from "./wallets/GetWalletData";

const SwitchTabs = ({ customer }) => {
  return (
    <div className="mt-8">
      <Tabs defaultValue="bill" className="sm:mx-64 mx-2">
        <TabsList>
          <TabsTrigger value="bill">Bill History</TabsTrigger>
          <TabsTrigger value="wallet">Wallet History</TabsTrigger>
        </TabsList>
        <TabsContent value="bill">
          <GetBills customer={{ cid: customer.cid }} />
        </TabsContent>
        <TabsContent value="wallet">
          <GetWalletData customer={{ cid: customer.cid }} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SwitchTabs;
