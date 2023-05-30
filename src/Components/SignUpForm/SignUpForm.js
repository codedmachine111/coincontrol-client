import "./SignUpForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../Components/Button/Button";
import { UserContext } from "../../App";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

export const SignUpForm = (props) => {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(UserContext);

  const resetFormFields = () => {
    document.getElementsByClassName("signup-form")[0].reset();
  };

  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  const onSignupSubmitHandler = async (values) => {
    const userObject = {
      username: values.username,
      password: values.password,
    };

    if (values.password === values.confirmPassword) {
      axios.post(`https://coincontrol-server.vercel.app/auth/signup`, userObject).then((res) => {
        if (res.data.message === "User Created!") {
          alert(res.data.message);
          props.toggleAuth();
        }
      });
    } else{
      alert("Passwords don't match");
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onSignupSubmitHandler}>
        <Form className="signup-form">
          <h2>Create new account</h2>
          <p>
            <span id="bold">Signup</span> to create an account and manage your funds effortlessly.
          </p>
          <Field
            id="signup-input"
            name="username"
            type="text"
            autoComplete="off"
            placeholder="Choose a cool username"
          />
          <ErrorMessage name="username" />
          <Field
            id="signup-input"
            name="password"
            type="password"
            autoComplete="off"
            minLength="8"
            placeholder="Password"
          />
          <ErrorMessage name="password" />
          <Field
            id="signup-input"
            name="confirmPassword"
            autoComplete="off"
            type="password"
            minLength="8"
            placeholder="Confirm password"
          />
          <ErrorMessage name="confirmPassword" />

          <Button
            type="submit"
            title="SIGNUP"
            onSubmit={onSignupSubmitHandler}
          />

          <p id="auth-redirect">
            Have an account?{" "}
            <Link to="/auth" onClick={() => props.toggleAuth()}>
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
};
