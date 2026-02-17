import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  checkOtp,
  clearChangePassword,
} from "../../../../reducers/usersSlice";
import { Link } from "react-router-dom";

const OTP = () => {
  const dispatch = useDispatch();
  const { otpErrorMessage, isOtpError, isOtpLoading, verifyEmail } =
    useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: { firstNum: "", secondtNum: "", thirdNum: "", fourthNum: "" },
    mode: "onSubmit",
  });

  useEffect(() => {
    const onKeyDown = (e) => {
      const ids = ["firstNum", "secondtNum", "thirdNum", "fourthNum"];
      if (!ids.includes(e.target.id)) return;

      if (e.key === "Enter") {
        e.preventDefault();
        handleSubmit(onSubmit)();
        return;
      }

      // BACKSPACE DELETE OR BACK TO PREV IF EMPTY 
      if (e.key === "Backspace") {
        e.preventDefault();
        const el = document.getElementById(e.target.id);
        if (!el) return;

        const name = e.target.id;
        const currentVal = getValues(name);

        if (currentVal) {
          el.value = "";
          setValue(name, "", { shouldDirty: true, shouldValidate: true });
          return;
        }

        const prev = el.previousElementSibling;
        if (prev?.id) {
          prev.focus();
          prev.value = "";
          setValue(prev.id, "", { shouldDirty: true, shouldValidate: true });
        }
      }
    };

    const onKeyPress = (e) => {
      const ids = ["firstNum", "secondtNum", "thirdNum", "fourthNum"];
      if (!ids.includes(e.target.id)) return;

      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        const el = document.getElementById(e.target.id);
        if (!el) return;

        el.value = e.key;
        setValue(e.target.id, e.key, { shouldDirty: true, shouldValidate: true });

        const next = el.nextElementSibling;
        if (next?.id) next.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keypress", onKeyPress);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keypress", onKeyPress);
    };
  }, [handleSubmit, setValue, getValues]);

  const onSubmit = (data) => {
    const numberCode = Object.values(data).join("");
    if (numberCode.length !== 4) return;
    if (isOtpLoading) return;
    dispatch(checkOtp(numberCode));
  }

  const notRightEmail = () => {
    dispatch(clearChangePassword());
  };

  return (
    <div className="OTP w-full min-h-[40vh] flex items-center justify-center px-2">
      <div
        className="w-full max-w-[360px]
                 rounded-3xl border border-white/15
                 bg-[#0b1220]/40 backdrop-blur-xl
                 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.35)]
                 p-5">
        <div className="mb-3">
          <p className="text-white font-semibold text-lg">Check your Email</p>
          <p className="text-white/70 text-sm mt-1 leading-relaxed">
            We sent you a 4-digit code to{" "}
            <span className="text-sky-200 font-medium break-all">{verifyEmail}</span>
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <span className="text-white/60">Not you?</span>
            <Link
              onClick={notRightEmail}
              className="text-sky-200 hover:text-sky-100 underline underline-offset-4"
            >
              Change Email
            </Link>
          </div>
        </div>
        <div className="min-h-[18px] mb-3">
          <p
            className={
              isOtpLoading
                ? "text-sky-200 text-xs"
                : isOtpError
                  ? "text-red-300 text-xs"
                  : ""
            }
          >
            {isOtpLoading ? "Loading ..." : isOtpError ? otpErrorMessage : null}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-2">
            <input
              id="firstNum"
              type="text"
              maxLength="1"
              className={`h-12 w-12 rounded-2xl text-center text-lg font-semibold
                        bg-white/[0.06] text-white outline-none
                        border ${errors.firstNum ? "border-red-400/60" : "border-white/12"}
                        focus:border-sky-200/50 focus:ring-2 focus:ring-sky-300/20
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]`}
              {...register("firstNum", {
                required: { value: true, message: "Require" },
                pattern: { value: /[0-9]/, message: "Only Numbers" },
              })}
            />
            <input
              id="secondtNum"
              type="text"
              maxLength="1"
              className={`h-12 w-12 rounded-2xl text-center text-lg font-semibold
                        bg-white/[0.06] text-white outline-none
                        border ${errors.secondtNum ? "border-red-400/60" : "border-white/12"}
                        focus:border-sky-200/50 focus:ring-2 focus:ring-sky-300/20
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]`}
              {...register("secondtNum", {
                required: { value: true, message: "Require" },
                pattern: { value: /[0-9]/, message: "Only Numbers" },
              })}
            />
            <input
              id="thirdNum"
              type="text"
              maxLength="1"
              className={`h-12 w-12 rounded-2xl text-center text-lg font-semibold
                        bg-white/[0.06] text-white outline-none
                        border ${errors.thirdNum ? "border-red-400/60" : "border-white/12"}
                        focus:border-sky-200/50 focus:ring-2 focus:ring-sky-300/20
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]`}
              {...register("thirdNum", {
                required: { value: true, message: "Require" },
                pattern: { value: /[0-9]/, message: "Only Numbers" },
              })}
            />
            <input
              id="fourthNum"
              type="text"
              maxLength="1"
              className={`h-12 w-12 rounded-2xl text-center text-lg font-semibold
                        bg-white/[0.06] text-white outline-none
                        border ${errors.fourthNum ? "border-red-400/60" : "border-white/12"}
                        focus:border-sky-200/50 focus:ring-2 focus:ring-sky-300/20
                        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]`}
              {...register("fourthNum", {
                required: { value: true, message: "Require" },
                pattern: { value: /[0-9]/, message: "Only Numbers" },
              })}
            />
          </div>
          <input id="submit-id" className="hidden" type="submit" value="Send Code" />
          <p className="mt-3 text-[11px] text-white/45 text-center">
            Tip: Press Enter to submit
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTP;
