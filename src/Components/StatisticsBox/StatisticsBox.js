import "./StatisticsBox.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export const StatisticsBox = () => {
  const [transactionsData, setTransactionsData] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/transactions", {
        headers: {
          accessToken: localStorage.getItem("token"),
        },
      });
      const transactions = response.data.listOfTransactions;
      setTransactionsData(transactions);
      // Calculate the total expense for each category
      const expenseByCategory = transactions.reduce((acc, transaction) => {
        if (transaction.category === "Credit") return acc;
        if (transaction.category in acc) {
          acc[transaction.category] += transaction.amount;
        } else {
          acc[transaction.category] = transaction.amount;
        }
        return acc;
      }, {});

      // Prepare the data for the pie chart
      new Chart(document.getElementById("test"), {
        type: "doughnut",
        data: {
          labels: Object.keys(expenseByCategory),
          datasets: [
            {
              label: "Expenses",
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
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
        {transactionsData ? (
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
