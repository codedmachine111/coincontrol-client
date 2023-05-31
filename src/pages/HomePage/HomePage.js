import "./HomePage.scss";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { IncomeCard } from "../../Components/IncomeCard/IncomeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AmountWidget } from "../../Components/AmountWidget/AmountWidget";
import { AddTransactionCard } from "../../Components/AddTransactionCard/AddTransactionCard";
import { TransactionsBox } from "../../Components/TransactionsBox/TransactionsBox";

export const HomePage = () => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/auth/verify", {
        headers: {
          accessToken: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          console.log(res.data.error);
          setAuthUser({ status: false, username: "", userId: 0, income: 0, credit: 0, expenses: 0 });
          setLoading(false);
        } else {
          setAuthUser({
            status: true,
            username: res.data.user.username,
            userId: res.data.user.id,
            income: res.data.user.income,
            credit: res.data.user.credit,
            expenses: res.data.user.expenses,
          });
          setLoading(false);
        }
      });
  }, []);
  const onSignoutHandler = () => {
    localStorage.removeItem("token");
    setAuthUser({ status: false, username: "", userId: 0 });
    navigate("/");
  };

  return (
    <>
      <div className="home-container">
        {loading ? (
          <>
            <div id="loading">
              <CircularProgress id="loadbar" />
            </div>
          </>
        ) : (
          <>
            <div className="home-content">
              <div className="home-title">
                <h1>
                  Hello, <span id="diff">{authUser.username}!</span>
                </h1>
                <IncomeCard />
                <div className="amount-widgets">
                  <AmountWidget type="Income" icon="up" />
                  <AmountWidget type="Expenses" icon="down" />
                </div>
              </div>
              <div className="home-stats-container"></div>
              <div className="home-transactions-container">
                <AddTransactionCard />
                <TransactionsBox />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
