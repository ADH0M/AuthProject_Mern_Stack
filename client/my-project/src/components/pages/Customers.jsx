import axios from "axios";
import { useEffect, useState } from "react";
import CustomerForm from "../customers/CustomerForm";
import CustomerList from "../customers/CustomerList";

function Customers() {
  const [customers, setCustomers] = useState([]);

  async function getCustomers() {
    // const customersRes = await axios.get("http://localhost:5000/customer/");
    const customersRes = await axios.get(
      "http://localhost:3000/api/customer"
    );
    setCustomers(customersRes.data);
  }

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div>
      <CustomerForm getCustomers={getCustomers} />
      <CustomerList customers={customers} />
    </div>
  );
}

export default Customers;