import "./TransactionsBox.scss";
import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../App";
import { TransactionCard } from "../TransactionCard/TransactionCard";
import axios from "axios";

export const TransactionsBox = () => {
  const { listOfTransactions, setListOfTransactions } =
    useContext(TransactionContext);

  useEffect(() => {
    axios
      .get("http://localhost:3001/transactions/", {
        headers: { accessToken: localStorage.getItem("token") },
      })
      .then((response) => {
        setListOfTransactions(response.data.listOfTransactions.reverse());
      });
  }, []);

  return (
    <>
      <p id="title">Recent transactions</p>
      {listOfTransactions.length === 0 ? (
        <>
          <div className="transactions-box-container">
            <p>No transactions made yet.</p>
          </div>
        </>
      ) : (
        <>
          <div className="transactions-box-container">
            {listOfTransactions.map((value) => {
              return (
                <TransactionCard
                  key={value.id}
                  id={value.id}
                  amount={value.amount}
                  category={value.category}
                  date={value.createdAt}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
