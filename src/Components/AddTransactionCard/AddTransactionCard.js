import "./AddTransactionCard.scss";
import { Formik, Form, Field } from "formik";
import { Button } from "../Button/Button";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export const AddTransactionCard = () => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    amount: 0,
    category: "",
  };

  const resetForm = () => {
    const form = document.getElementById("transaction-form");
    form.reset();
  };

  const onTransactionAddHandler = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/transactions/add",
        {
          userId: authUser.userId,
          amount: values.amount,
          category: values.category,
        },
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.message === "Transaction added successfully") {
        // CALCULATE THE UPDATED INCOME, CREDIT AND EXPENSES
        let updatedIncome = authUser.income;
        let updatedCredit = authUser.credit;
        let updatedExpenses = authUser.expenses;

        // IF THE TRANSACTION IS A CREDIT, ADD THE AMOUNT TO INCOME AND CREDIT
        if (values.category === "Credit") {
          updatedIncome += values.amount;
          updatedCredit += values.amount;
          // UPDATE THE AUTHUSER STATE
          setAuthUser({
            ...authUser,
            income: updatedIncome,
            credit: updatedCredit,
          });
        } else {
          // IF THE TRANSACTION IS AN EXPENSE, SUBTRACT THE AMOUNT FROM INCOME AND ADD IT TO EXPENSES
          updatedIncome -= values.amount;
          updatedExpenses += values.amount;
          // UPDATE THE AUTHUSER STATE
          setAuthUser({
            ...authUser,
            income: updatedIncome,
            expenses: updatedExpenses,
          });
        }

        // UPDATE THE USER'S INCOME, CREDIT AND EXPENSES IN THE DATABASE
        await axios.put(
          "http://localhost:3001/auth/update",
          {
            userId: authUser.userId,
            income: updatedIncome,
            credit: updatedCredit,
            expenses: updatedExpenses,
          },
          {
            headers: {
              accessToken: localStorage.getItem("token"),
            },
          }
        );
        setLoading(false);
        alert("Transaction added successfully");
        window.location.reload();
      } else {
        alert("Failed to add transaction");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    resetForm();
  };

  return (
    <>
      {loading ? (
        <>
          <div id="loading">
            <CircularProgress id="loadbar" />
          </div>
        </>
      ) : (
        <>
          <p>Add transactions</p>
          <Formik
            initialValues={initialValues}
            onSubmit={onTransactionAddHandler}
          >
            <Form className="transaction-form" id="transaction-form">
              <Field
                id="transaction-category-select"
                name="category"
                as="select"
                required={true}
              >
                <option value="">Transaction type</option>
                <option value="Credit">Credit</option>
                <option value="hotels">Hotels</option>
                <option value="travel">Travel</option>
                <option value="miscellaneous">Miscellaneous</option>
                <option value="groceries">Groceries</option>
                <option value="education">Education</option>
              </Field>
              <Field
                id="transaction-amount-input"
                name="amount"
                type="number"
                placeholder="Enter the amount"
                required={true}
              />
              <Button
                type="submit"
                title="ADD"
                onSubmit={onTransactionAddHandler}
              />
            </Form>
          </Formik>
        </>
      )}
    </>
  );
};
