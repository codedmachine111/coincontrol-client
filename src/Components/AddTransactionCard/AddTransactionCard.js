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
        // Calculate updated income based on the selected category
        let updatedIncome = authUser.income;
        let updatedCredit = authUser.credit;
        let updatedExpenses = authUser.expenses;

        if (values.category === "Credit") {
          updatedIncome += values.amount;
          updatedCredit += values.amount;
          setAuthUser({ ...authUser, income: updatedIncome, credit: updatedCredit });
        } else {
          updatedIncome -= values.amount;
          updatedExpenses += values.amount;
          setAuthUser({ ...authUser, income: updatedIncome, expenses: updatedExpenses });
        }

        setLoading(false);

        // Update the original income in the database
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
      <Formik initialValues={initialValues} onSubmit={onTransactionAddHandler}>
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
  );
};
