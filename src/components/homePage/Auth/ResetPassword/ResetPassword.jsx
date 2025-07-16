import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ResetPassword.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../../../reducers/usersSlice";
import Footer from "../../../footer/Footer";
import Loading from "../../../loading/Loading";
import { useState } from "react";
import OTP from "./OTP";
import Header from "../../../header/Header";
import InputEmailForm from "./InputEmailForm";
import NewPassword from "./NewPassword";

const ResetPassword = () => {
  const { isNewPassword, isOTPPage } = useSelector(
    (state) => state.user
  );
  const [isResetPassword, setIsResetPassword] = useState(false);

  useGSAP(() => {
    gsap.to(".ResetPassword-component", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});

  return (
    <div className="ResetPassword-component">
      <Header />
      {/* {isResetPassword && !isChangePasswword ? ( */}
      {isOTPPage ? (
        <OTP />
      ) : isNewPassword ? (
        <NewPassword />
      ) : (
        <InputEmailForm setIsResetPassword={setIsResetPassword} />
      )}
      <Footer />
    </div>
  );
};

export default ResetPassword;
