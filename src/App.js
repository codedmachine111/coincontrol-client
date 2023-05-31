import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { createContext, useEffect } from "react";
import { useState } from "react";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { HomePage } from "./pages/HomePage/HomePage";

export const UserContext = createContext();
export const TransactionContext = createContext();
function App() {
  const [authUser, setAuthUser] = useState({
    status: false,
    username: "",
    userId: 0,
    income: 0,
    credit: 0,
    expenses: 0,
  });
  const [listOfTransactions, setListOfTransactions] = useState([]);

  return (
    <div className="App">
      <UserContext.Provider value={{ authUser, setAuthUser }}>
        <TransactionContext.Provider value={{ listOfTransactions, setListOfTransactions }}>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </TransactionContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
