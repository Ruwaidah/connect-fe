import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  clearChangePassword,
  resetPassword,
} from "../../../../reducers/usersSlice";

const InputEmailForm = ({ setIsResetPassword }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    isResetPasswordLoading,
    isResetPasswordError,
    resetPasswordErrorMessage,
  } = useSelector((state) => state.user);

  useGSAP(() => {
    gsap.to(".InputEmailForm", {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: "power2.out",
    });
  }, []);

  const emailValue = watch("email")?.trim() || "";

  const disabled =
    !isValid ||
    !emailValue ||
    isResetPasswordLoading;

  const cancelChangePassword = () => {
    dispatch(clearChangePassword());
    navigate("/", { replace: true });
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        resetPassword({
          email: data.email.trim().toLowerCase(),
        })
      ).unwrap();

      setIsResetPassword(true);
    } catch (error) {
      console.error("Reset password request failed:", error);
    }
  };

  return (
    <div className="InputEmailForm w-full translate-y-2 opacity-0">
      <div className="mb-5 text-center">
        <div
          className="
            mx-auto grid h-12 w-12 place-items-center
            rounded-2xl border border-sky-300/25
            bg-sky-500/10 text-sky-200
            shadow-[0_0_22px_rgba(60,170,255,0.16)]
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M4 6h16v12H4V6Z"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />

            <path
              d="m4 7 8 6 8-6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="mt-4 text-xl font-semibold text-white">
          Reset your password
        </h1>

        <p className="mt-1 text-sm leading-6 text-white/55">
          Enter the email connected to your account and we’ll send you a
          verification code.
        </p>
      </div>

      {isResetPasswordError && resetPasswordErrorMessage ? (
        <div
          role="alert"
          className="
            mb-4 rounded-xl
            border border-rose-400/25
            bg-rose-500/10 px-4 py-3
            text-sm text-rose-200
          "
        >
          {resetPasswordErrorMessage}
        </div>
      ) : null}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="reset-email"
            className="mb-1.5 ml-1 block text-sm font-medium text-white/70"
          >
            Email address
          </label>

          <div
            className={`
              flex h-12 w-full items-center
              rounded-xl border px-4
              bg-white/[0.035] backdrop-blur-md
              transition
              ${
                errors.email
                  ? `
                    border-rose-400/55
                    shadow-[0_0_0_1px_rgba(255,90,95,0.30),0_0_18px_rgba(255,90,95,0.16)]
                  `
                  : `
                    border-sky-300/25
                    shadow-[0_0_0_1px_rgba(110,200,255,0.16),0_0_18px_rgba(60,160,255,0.10)]
                    focus-within:border-sky-200/55
                    focus-within:bg-white/[0.05]
                    focus-within:shadow-[0_0_0_1px_rgba(140,230,255,0.32),0_0_24px_rgba(60,170,255,0.18)]
                  `
              }
            `}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="shrink-0 text-white/45"
            >
              <path
                d="M4 6h16v12H4V6Z"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />

              <path
                d="m4 7 8 6 8-6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input
              id="reset-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className="
                h-full min-w-0 flex-1
                bg-transparent px-3
                text-sm text-white outline-none
                placeholder:text-white/30
              "
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address.",
                },
              })}
            />
          </div>

          <div className="mt-1.5 min-h-5 pl-1">
            {errors.email ? (
              <p className="text-xs text-rose-300">
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={`
            flex h-11 w-full items-center justify-center
            rounded-xl border
            text-sm font-semibold transition
            active:scale-[0.99]
            ${
              disabled
                ? `
                  cursor-not-allowed
                  border-white/10
                  bg-white/[0.04]
                  text-white/35
                  shadow-none
                `
                : `
                  border-sky-300/35
                  bg-sky-500/20
                  text-white
                  shadow-[0_0_0_1px_rgba(120,220,255,0.25),0_10px_30px_rgba(40,120,255,0.18),0_0_28px_rgba(80,200,255,0.14)]
                  hover:bg-sky-400/25
                  hover:border-sky-200/50
                `
            }
          `}
        >
          {isResetPasswordLoading ? (
            <span className="flex items-center gap-2">
              <span
                className="
                  h-4 w-4 animate-spin rounded-full
                  border-2 border-white/25
                  border-t-white
                "
              />

              Sending code...
            </span>
          ) : (
            "Send verification code"
          )}
        </button>

        <button
          type="button"
          onClick={cancelChangePassword}
          disabled={isResetPasswordLoading}
          className="
            h-11 w-full rounded-xl
            border border-white/10
            bg-white/[0.03]
            text-sm font-medium text-white/65
            transition
            hover:border-white/20
            hover:bg-white/[0.06]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Cancel
        </button>
      </form>

      <p className="mt-5 text-center text-xs leading-5 text-white/40">
        Check your spam or junk folder if you don’t see the email.
      </p>
    </div>
  );
};

export default InputEmailForm;