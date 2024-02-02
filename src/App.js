import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerAction,
  removeCustomerAction,
} from "./store/customerReducer";
import { fetchCustomers } from "./asyncAction/customers";

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash });
  };
  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash });
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };
  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <div className="container">
      <div style={{ marginBottom: 10, fontSize: "3rem" }}>Balance: {cash}</div>
      <div className="div__buttons" style={{ display: "flex" }}>
        <button onClick={() => addCash(+prompt())}>Add cash</button>
        <button onClick={() => getCash(+prompt())}>Get cash</button>
        <button onClick={() => addCustomer(prompt())}>Add customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>
          Get customers from database
        </button>
      </div>
      <div className="customers">
        {customers.length > 0 ? (
          <div>
            {customers.map((customer) => (
              <div key={customer.id} onClick={() => removeCustomer(customer)}>
                {customer.name}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ color: "red" }}>Clients not found!</div>
        )}
      </div>
    </div>
  );
}

export default App;
