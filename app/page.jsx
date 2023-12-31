
import AddCustomer from "@components/addCustomer";
import GetCustomers from "@components/customers/GetCustomers";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <header>Aasai Cashews Services</header>
      <section>
        <div>
          <AddCustomer />
          <GetCustomers />
        </div>
      </section>
    </div>
  );
};

export default Home;
