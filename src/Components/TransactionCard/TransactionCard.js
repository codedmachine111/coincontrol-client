import "./TransactionCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faEllipsis,
  faUtensils,
  faBus,
  faBook,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Button } from "../Button/Button";
import { CircularProgress } from "@mui/material";
import { useState, useContext } from "react";
import { UserContext } from "../../App";

export const TransactionCard = (props) => {
  const { id, category, amount, date } = props;
  const { authUser, setAuthUser } = useContext(UserContext);
  const [editAmount, setEditAmount] = useState(amount);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editCategory, setEditCategory] = useState(category);

  let iconType = "";
  if (editCategory === "Credit") {
    iconType = faPlus;
  } else if (editCategory === "hotels") {
    iconType = faUtensils;
  } else if (editCategory === "travel") {
    iconType = faBus;
  } else if (editCategory === "miscellaneous") {
    iconType = faEllipsis;
  } else if (editCategory === "groceries") {
    iconType = faCartShopping;
  } else {
    iconType = faBook;
  }

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  const onDeleteHandler = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `https://coincontrol-server.vercel.app/transactions/delete/${id}`,
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.message === "Transaction deleted successfully") {
        let updatedIncome = authUser.income;
        let updatedCredit = authUser.credit;
        let updatedExpenses = authUser.expenses;

        if (category === "Credit") {
          updatedCredit -= parseInt(amount);
          updatedIncome -= parseInt(amount);
        }else{
          updatedExpenses -= parseInt(amount);
          updatedIncome += parseInt(amount);
        }
        console.log(updatedIncome, updatedCredit, updatedExpenses);
        // UPDATE USER IN CONTEXT AND DB
        setAuthUser({
          ...authUser,
          income: updatedIncome,
          credit: updatedCredit,
          expenses: updatedExpenses,
        });
        const UserResponse = await axios.put("https://coincontrol-server.vercel.app/auth/update", {
          userId: authUser.userId,
          income: updatedIncome,
          credit: updatedCredit,
          expenses: updatedExpenses,
        },{
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        });
        if (UserResponse.data.message === "User Data updated successfully") {
          setLoading(false);
          alert("Transaction deleted successfully");
          window.location.reload();
        }else{
          alert("Failed to update User Data");
          setLoading(false);
        }
      } else {
        alert("Failed to delete transaction");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onEditHandler = () => {
    setEditing(true);
  };

  const onCancelEditHandler = () => {
    setEditing(false);
  };
  const onSaveEditHandler = async () => {
    setLoading(true);
    try {
      // UPDATE EDITED TRANSACTION with editAmount and editCategory

      const response = await axios.put(
        "https://coincontrol-server.vercel.app/transactions/update",
        {
          id: id,
          amount: editAmount,
          category: editCategory,
        },
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );
      // IF SUCCESSFUL, UPDATE USER IN CONTEXT AND DB
      if (response.data.message === "Transaction updated successfully") {
        let updatedIncome = authUser.income;
        let updatedCredit = authUser.credit;
        let updatedExpenses = authUser.expenses;

        if (editCategory === "Credit") {
          updatedCredit += parseInt(editAmount) - parseInt(amount);
          updatedIncome += parseInt(editAmount) - parseInt(amount);
        } else {
          updatedExpenses += parseInt(editAmount) - parseInt(amount);
          updatedIncome -= parseInt(editAmount) - parseInt(amount);
        }
        console.log(updatedIncome, updatedCredit, updatedExpenses);
        // UPDATE USER IN CONTEXT
        setAuthUser((prevAuthUser) => ({
          ...prevAuthUser,
          income: updatedIncome,
          credit: updatedCredit,
          expenses: updatedExpenses,
        }));
        // UPDATE USER IN DB
        const updateUserResponse = await axios.put(
          "https://coincontrol-server.vercel.app/auth/update",
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
        if (
          updateUserResponse.data.message === "User Data updated successfully"
        ) {
          alert("Transaction updated successfully");
          setEditing(false);
          setLoading(false);
          window.location.reload();
        } else {
          alert("Failed to update User Data");
          setLoading(false);
        }
      } else {
        alert("Failed to update transaction");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="transaction-card-container">
        {editing ? (
          <>
            {loading ? (
              <>
                <div id="tc-loading">
                  <CircularProgress id="tc-loadbar" />
                </div>
              </>
            ) : (
              <>
                <div className="tc-edit-form">
                  <select
                    id="tc-edit-form-select"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="">Transaction type</option>
                    <option value="Credit">Credit</option>
                    <option value="hotels">Hotels</option>
                    <option value="travel">Travel</option>
                    <option value="miscellaneous">Miscellaneous</option>
                    <option value="groceries">Groceries</option>
                    <option value="education">Education</option>
                  </select>
                  <input
                    type="number"
                    id="tc-edit-form-input"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                  <div className="edit-form-buttons">
                    <Button
                      title="Save"
                      onClick={onSaveEditHandler}
                      icon="faCheck"
                      id="save-icon"
                    />
                    <Button
                      title="Cancel"
                      onClick={onCancelEditHandler}
                      icon="faXmark"
                      id="cancel-icon"
                    />
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="tc-icon">
              <FontAwesomeIcon icon={iconType} />
            </div>
            <div className="tc-amount-content">
              <div className="tc-amount">
                {category === "Credit" ? (
                  <>
                    <p id="credit">+ ₹ {amount}</p>
                  </>
                ) : (
                  <>
                    <p id="debit">- ₹ {amount}</p>
                  </>
                )}
              </div>
              <div className="tc-date">
                <p>{formatDate(date)}</p>
              </div>
            </div>
            <div className="tc-buttons">
              <Button
                title="Delete"
                onClick={onDeleteHandler}
                icon="faTrashCan"
                id="trash-icon"
              />
              <Button
                title="Update"
                onClick={onEditHandler}
                icon="faPenToSquare"
                id="edit-icon"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};
