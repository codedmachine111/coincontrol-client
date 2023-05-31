import "./HomePage.scss";
import { UserContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { IncomeCard } from "../../Components/IncomeCard/IncomeCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { AmountWidget } from "../../Components/AmountWidget/AmountWidget";

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
          setAuthUser({ status: false, username: "", userId: 0, income: 0 });
          setLoading(false);
        } else {
          setAuthUser({
            status: true,
            username: res.data.user.username,
            userId: res.data.user.id,
            income: res.data.user.income,
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
        <div className="home-content">
          <div className="home-title">
            {loading ? (
              <>
                <div id="loading">
                  <CircularProgress id="loadbar" />
                </div>
              </>
            ) : (
              <>
                <h1>
                  Hello, <span id="diff">{authUser.username}!</span>
                </h1>
                <IncomeCard />
                <div className="amount-widgets">
                  <AmountWidget type="Income" icon="up" />
                  <AmountWidget type="Expenses" icon="down" />
                </div>
              </>
            )}
          </div>
          <div className="home-stats-container">
            
          </div>
          <div className="home-transactions-container">
            
          </div>
        </div>
      </div>
    </>
  );
};
