import "./LandingPage.scss";
import { Button } from "../../Components/Button/Button";
import { LoginForm } from "../../Components/LoginForm/LoginForm";
// import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <div className="landing-container">
        <div className="landing-content">
          <div className="content">
            <h1>Coin Control</h1>
            <p>
              Take control of your finances with CoinControl, the all-in-one
              personal finance tracker that empowers you to effortlessly manage
              your income, expenses, and savings.
            </p>
            <Link to="/auth">
              <Button title="get started" />
            </Link>
          </div>
        </div>
        <div className="landing-timer-container">
          {/* <img src={logo} alt="CC" id="logo-icon" /> */}
          <LoginForm />
        </div>
      </div>
    </>
  );
};
