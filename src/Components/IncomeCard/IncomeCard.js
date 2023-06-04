import "./IncomeCard.scss";
import { Button } from "../Button/Button";
import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export const IncomeCard = () => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const initialValues = {
    income: 0,
  };

  // FUNCTION TO HANDLE INCOME ADDITION
  const onIncomeAddHandler = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:3001/auth/update",
        {
          userId: authUser.userId,
          income: values.income,
        },
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );

      // IF INCOME IS UPDATED SUCCESSFULLY, UPDATE THE AUTHUSER STATE
      if (response.data.message === "User Data updated successfully") {
        setAuthUser({ ...authUser, income: values.income });
        setLoading(false);
      } else {
        alert("Failed to update income");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="income-card">
      <div className="income-card-title">
        <h2>Total balance</h2>
        {authUser.income === 0 ? (
          <Formik initialValues={initialValues} onSubmit={onIncomeAddHandler}>
            <Form className="income-form">
              <Field
                id="income-form-input"
                name="income"
                type="number"
                placeholder="Enter your income"
                required={true}
              />
              {!loading ? (
                <>
                  <div id="loading">
                    <CircularProgress id="loadbar" />
                  </div>
                </>
              ) : (
                <Button type="submit" title="Add" />
              )}
            </Form>
          </Formik>
        ) : (
          <p>₹ {authUser.income}</p>
        )}
      </div>
    </div>
  );
};
