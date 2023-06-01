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

export const TransactionCard = (props) => {
  const { id, category, amount, date } = props;
  let iconType = "";
  if (category === "Credit") {
    iconType = faPlus;
  } else if (category === "hotels") {
    iconType = faUtensils;
  } else if (category === "travel") {
    iconType = faBus;
  } else if (category === "miscellaneous") {
    iconType = faEllipsis;
  } else if (category === "groceries") {
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
    try {
      const response = await axios.delete(
        `http://localhost:3001/transactions/delete/${id}`,
        {
          headers: {
            accessToken: localStorage.getItem("token"),
          },
        }
      );

      if (response.data.message === "Transaction deleted successfully") {
        alert("Transaction deleted successfully");
        window.location.reload();
      } else {
        alert("Failed to delete transaction");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="transaction-card-container">
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
        <div className="tc-delete-button">
          <Button title="Delete" onClick={onDeleteHandler} />
        </div>
      </div>
    </>
  );
};
