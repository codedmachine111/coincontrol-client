import "./Navbar.scss";
import { Link } from "react-router-dom";
import { Button } from "../Button/Button";
import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import logo from '../../assets/logo.png'

export const Navbar = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(UserContext);

  const onSignoutHandler = () => {
    localStorage.removeItem("token");
    setAuthUser({ status: false, username: "", userId: 0 });
    navigate("/");
  };

  useEffect(() => {
    axios.get("https://pixtory-server.vercel.app/auth/verify",{
      headers: {
        accessToken: localStorage.getItem("token"),
      }
    }).then((res)=>{
      if(res.data.message === "User not Logged in"){
        setAuthUser({ status: false, username: "", userId: 0 });
      }else{
        setAuthUser({ status: true, username: res.data.user.username, userId: res.data.user.id });
      }
    })
  }, []);

  return (
    <nav>
      <div className="logo">
      <img src={logo} alt="" id="logo-icon"/>
      </div>

      <div className="nav-menu">
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <i className="fa fa-bars"></i>
        </label>
        <ul className="list">
          <li id="active">
            <Link to="/posts">Home</Link>
          </li>
          <li>
            <Link to="/create" id="d">
              Create
            </Link>
          </li>
          {!authUser.status ? (
            <li>
              <Link to="/auth" id="d">
                Sign-in
              </Link>
            </li>
          ) : (
            <li>
              <Button title="signout" id="signout" onClick={onSignoutHandler} />
            </li>
          )}
        </ul>
        {authUser.status ? (
            <Link to={`/profile/${authUser.userId}`}><Button title={authUser.username.charAt(0)} id="profile-btn"/></Link>
        ):(<></>)}
      </div>
    </nav>
  );
};
