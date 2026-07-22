import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import OTP from "./OTP";
import InputEmailForm from "./InputEmailForm";
import NewPassword from "./NewPassword";

const ResetPassword = () => {
  const { isNewPassword, isOTPPage } = useSelector(
    (state) => state.user
  );

  useGSAP(() => {
    gsap.to(".ResetPassword-component", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  }, []);

  return (
    <main
      className="
        flex min-h-screen w-full
        items-start justify-center
        px-4 pb-10 pt-[120px]
      "
    >
      <div
        className="
          ResetPassword-component
          w-full max-w-[390px]
          translate-y-3 opacity-0
        "
      >
        {/* ONLY CARD BACKGROUND */}
        <div
          className="
            w-full rounded-3xl
            border border-sky-300/20
            bg-[#173568]/75
            px-6 py-7
            backdrop-blur-xl
            shadow-[0_20px_70px_rgba(0,0,0,0.42),0_0_35px_rgba(60,170,255,0.16)]
          "
        >
          {isOTPPage ? (
            <OTP />
          ) : isNewPassword ? (
            <NewPassword />
          ) : (
            <InputEmailForm />
          )}
        </div>

        <p className="mt-4 text-center text-xs text-white/40">
          Secure recovery • Connect
        </p>
      </div>
    </main>
  );
};

export default ResetPassword;