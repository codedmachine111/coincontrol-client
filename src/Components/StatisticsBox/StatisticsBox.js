import "./StatisticsBox.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export const StatisticsBox = () => {
  const [transactionsData, setTransactionsData] = useState(null);
  const chart = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://coincontrol-server.vercel.app/transactions", {
        headers: {
          accessToken: localStorage.getItem("token"),
        },
      });
      const transactions = response.data.listOfTransactions;
      setTransactionsData(transactions);
      // CALCULATE THE EXPENSES BY CATEGORY
      const expenseByCategory = transactions.reduce((acc, transaction) => {
        if (transaction.category === "Credit") return acc;
        if (transaction.category in acc) {
          acc[transaction.category] += parseInt(transaction.amount);
        } else {
          acc[transaction.category] = parseInt(transaction.amount);
        }
        return acc;
      }, {});

      if(chart.current !== null) chart.current.destroy();
      const chartCanvas = document.getElementById("test").getContext("2d");
      // PREPARE THE CHART
      new Chart(chartCanvas, {
        type: "doughnut",
        data: {
          labels: Object.keys(expenseByCategory),
          datasets: [
            {
              label: "Expenses",
              backgroundColor: [
                "#FF6384",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF8C42",
              ],
              data: Object.values(expenseByCategory),
            },
          ],
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <p id="title">Spendings</p>
      <div className="statistics-box-container">
        {transactionsData !== null ? (
          <>
            <div className="sb-charts-holder">
              <canvas id="test"></canvas>
            </div>
          </>
        ) : (
          <>
            <div className="sb-charts-holder">
              <p>No spendings yet.</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
