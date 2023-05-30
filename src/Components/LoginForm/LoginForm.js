import "./LoginForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { Button } from "../../Components/Button/Button";
import { UserContext } from "../../App";
import { useContext } from "react";
import {useNavigate, Link} from "react-router-dom";

export const LoginForm = (props) => {

  const { setAuthUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetFormFields = () => {
    document.getElementsByClassName("login-form")[0].reset();
  };

  const initialValues = {
    username: "",
    password: "",
  };
  const onLoginSubmitHandler = async (values) => {
    const userObject = {
      username: values.username,
      password: values.password,
    };

    axios.post(`https://coincontrol-server.vercel.app/auth/login`, userObject).then((res) => {
      if (res.data.message === "Login Successful") {
        resetFormFields();
        setAuthUser({
          status: true,
          username: res.data.username,
          userId : res.data.userId
        });
        localStorage.setItem("token", res.data.accessToken);
        navigate("/posts");
      }else{
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={onLoginSubmitHandler}>
        <Form className="login-form">
          <h2>Have an account?</h2>
          <p><span id="bold">Login</span> to enter and manage your money.</p>
          <Field
            id="login-input"
            name="username"
            type="text"
            placeholder="Username"
            required={true}
          />
          <ErrorMessage name="username" />
          <Field
            id="login-input"
            name="password"
            type="password"
            placeholder="Password"
            required={true}
          />
          <ErrorMessage name="password" />

          <Button type="submit" title="LOGIN" onSubmit={onLoginSubmitHandler} />

          <p id="auth-redirect">Don't have an account? <Link to="/auth" onClick={()=> props.toggleAuth()}>Signup</Link></p>
        </Form>
      </Formik>
    </>
  );
};
