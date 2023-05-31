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
        setListOfTransactions(response.data.listOfTransactions);
      });
  }, []);

  return (
    <>
      <div className="transactions-box-container">
        <p>Recent transactions</p>
        {listOfTransactions.map((value) => {
            return (
                <TransactionCard
                key={value.id}
                amount={value.amount}
                category={value.category}
                date={value.createdAt}
                />
            );
        })}
      </div>
    </>
  );
};
