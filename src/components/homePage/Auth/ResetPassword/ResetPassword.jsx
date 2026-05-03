import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import OTP from "./OTP";
import InputEmailForm from "./InputEmailForm";
import NewPassword from "./NewPassword";

const ResetPassword = () => {
  const { isNewPassword, isOTPPage } = useSelector((state) => state.user);
  const [setIsResetPassword] = useState(false);

  useGSAP(() => {
    gsap.to(".ResetPassword-component", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-3">
      <div className="ResetPassword-component opacity-0 w-full max-w-[420px]">
        <div className="relative rounded-3xl p-[1px]
          bg-gradient-to-b from-sky-300/30 via-indigo-300/10 to-white/10
          shadow-[0_0_0_1px_rgba(140,230,255,0.10),0_0_40px_rgba(60,170,255,0.12)]">

          <div className={`relative rounded-3xl border border-white/10
            bg-white/[0.04] backdrop-blur-xl
            ${isOTPPage ? 'px-0' : 'px-4'} py-6`}>

            <div className="mb-5">
              <p className={`${isOTPPage ? 'px-4' : 'px-0'} text-white font-semibold text-lg`}>Reset password</p>
              <p className={`${isOTPPage ? 'px-4' : 'px-0'} text-white/55 text-sm mt-1`}>
                {isOTPPage
                  ? "Enter the code we sent to your email."
                  : isNewPassword
                    ? "Create a new password for your account."
                    : "Enter your email and we’ll send you a code."}
              </p>
            </div>

            {isOTPPage ? (
              <OTP />
            ) : isNewPassword ? (
              <NewPassword />
            ) : (
              <InputEmailForm setIsResetPassword={setIsResetPassword} />
            )}
          </div>
        </div>
        <p className="text-center text-xs text-white/40 mt-4">
          Secure recovery • Connect
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
