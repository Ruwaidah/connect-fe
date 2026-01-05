import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../../../reducers/usersSlice";
import Loading from "../../../loading/Loading";
import { useState } from "react";
import OTP from "./OTP";
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
    <div className="flex justisy-center items-center w-full">
      {isOTPPage ? (
        <OTP />
      ) : isNewPassword ? (
        <NewPassword />
      ) : (
        <InputEmailForm setIsResetPassword={setIsResetPassword} />
      )}
    </div>
  );
};

export default ResetPassword;
