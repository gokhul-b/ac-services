const { default: Header } = require("@components/Header");

const ServiceLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default ServiceLayout;
