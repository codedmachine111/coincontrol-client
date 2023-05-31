import "./TransactionCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

export const TransactionCard = (props) => {
  const { category, amount, date } = props;

  let iconType = "";
  if (category === "Credit") {
    iconType = "plus";
  } else if (category === "hotels") {
    iconType = "utensils";
  } else if (category === "travel") {
    iconType = "bus";
  } else if (category === "miscellaneous") {
    iconType = "ellipsis";
  } else if (category === "groceries") {
    iconType = "cart-shopping";
  } else {
    iconType = "book";
  }

  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString("en-GB", options);
    return formattedDate;
  };

  return (
    <>
      <div className="transaction-card-container">
        {iconType !== "ellipsis" || iconType !== "cart-shopping" ? (
          <>
            <div className="tc-icon">
              <i className={`fa fa-${iconType}`}></i>
            </div>
          </>
        ) : (
          <>
            {iconType === "ellipsis" ? (
              <>
                <div className="tc-icon">
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </>
            ) : (
              <>
              <div className="tc-icon">
                <FontAwesomeIcon icon={faCartShopping} />
            </div>
              </>
            )}
          </>
        )}
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
      </div>
    </>
  );
};
