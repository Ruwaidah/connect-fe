import "./HomePage.css";
import { useGSAP } from "@gsap/react";
import { GoogleLogin } from "@react-oauth/google";
import {
  loginWithGoogle,
  clearChangePassword,
} from "../../reducers/usersSlice";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const HomePage = () => {
  const { isAuthLoading, isAuthError, errorMessage, user } = useSelector(
    (state) => state.user
  );
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearChangePassword());
  }, []);

  useGSAP(() => {
    gsap.to(".welcome-h4", {
      opacity: 1,
      duration: 3,
      ease: "power1.inOut",
    });
  }, {});

  const googleLogin = (data) => {
    dispatch(loginWithGoogle(data));
  };

  const errorLoginGoogle = (data) => {
    return
  };

  // ************************ CLICK SIGNUP BUTTON ********************
  const createAccount = () => setIsLoginForm(false);

  // ************************ CLICK LOGIN BUTTON ********************
  const clickLoginButton = () => setIsLoginForm(true);

  return (
    <div className="HomePage">
      <Header />
      <div className={isLoginForm ? "section loginForm" : "section signupForm"}>
        <div
          className={
            isLoginForm ? "section-auth login-auth" : "section-auth signup-auth"
          }
        >
          <div id="googleLogin">
            <GoogleLogin
              cookiePolicy={"single_host_origin"}
              onSuccess={googleLogin}
              onError={errorLoginGoogle}
            />
          </div>{" "}
          {isLoginForm ? (
            <div className="login-div forms-div">
              <Login />
              <div className="forgot-password-div">
                <Link className="forgot-password-para" to="/reset-password">
                  Forgot Password
                </Link>
              </div>{" "}
              <p className="have-account-para">
                Don't Have account?{" "}
                <button onClick={createAccount}>SignUp</button>{" "}
              </p>
            </div>
          ) : (
            <div className="signup-div forms-div">
              <SignUp />
              <p className="have-account-para">
                Already have account?{" "}
                <button onClick={clickLoginButton}>Login</button>
              </p>
            </div>
          )}
        </div>
        <div className="img-sections">
          <img src="./assets/msg-01.png"  className="msg-01" />
          <img src="./assets/msg-02.png" className="msg-02" />
          <img src="./assets/msg-03.png" className="msg-03" />
          <img src="./assets/msg-04.png" className="msg-04" />
          <img src="./assets/msg-05.png" className="msg-05" />
          <img src="./assets/msg-06.png" className="msg-06" />
          <img src="./assets/msg-07.png" className="msg-07" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
