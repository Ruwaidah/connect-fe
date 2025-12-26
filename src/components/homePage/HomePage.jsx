// import "./HomePage.css";
import { useGSAP } from "@gsap/react";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import LoginWithGoogle from "./Auth/Login/LoginInWithGoogle";
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
    // <div className="HomePage">
    <div className="w-full flex flex-col h-[100vh] justify-between items-center">
      <Header />
      {/* <div className={isLoginForm ? "section loginForm" : "section signupForm"}> */}
      <div className={`w-[600px] flex justify-center shadow-xl ${isLoginForm ? 'h-[40vh]' : 'h-[50vh]'}`}>
        {/* <div
          className={
            isLoginForm ? "section-auth login-auth" : "section-auth signup-auth"
          }
        > */}
        <div
          className="flex flex-col w-full rounded-sm bg-gray-200 p-10 justify-between">
          <div id="googleLogin">
            {/* <GoogleLogin
              // cookiePolicy={"single_host_origin"}
              onSuccess={googleLogin}
              onError={errorLoginGoogle}
            /> */}
            <LoginWithGoogle />
          </div>{" "}
          {isLoginForm ? (
            // <div className="login-div forms-div">
            <div className="flex flex-col">
              <Login />
              {/* <div className="forgot-password-div"> */}
              <div className="flex my-1">
                <Link className="forgot-password-para" to="/reset-password">
                  Forgot Password
                </Link>
              </div>{" "}
              <p className="have-account-para">
                Don't Have account?{" "}
                <button className="cursor-pointer px-1 text-cyan-900" onClick={createAccount}>SignUp</button>{" "}
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
        {/* <div className="img-sections">
          <img src="./assets/msg-01.png"  className="msg-01" />
          <img src="./assets/msg-02.png" className="msg-02" />
          <img src="./assets/msg-03.png" className="msg-03" />
          <img src="./assets/msg-04.png" className="msg-04" />
          <img src="./assets/msg-05.png" className="msg-05" />
          <img src="./assets/msg-06.png" className="msg-06" />
          <img src="./assets/msg-07.png" className="msg-07" />
        </div> */}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
