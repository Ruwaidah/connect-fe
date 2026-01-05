import { useGSAP } from "@gsap/react";
import {
  loginWithGoogle,
  clearChangePassword,
} from "../../reducers/usersSlice";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Auth/Login/Login";
import SignUp from "./Auth/SignUp/SignUp";
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


  // useGSAP(() => {
  //   gsap.to(".welcome-h4", {
  //     opacity: 1,
  //     duration: 3,
  //     ease: "power1.inOut",
  //   });
  // }, {});

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
    <div className={`w-[600px] flex justify-center items-center shadow-xl
                      border border-gray-300 rounded-sm`}>
      {isLoginForm ? (
        <Login createAccount={createAccount} />
      ) : (
        <SignUp clickLoginButton={clickLoginButton} />
      )}
    </div>
  );
};

export default HomePage;
