import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import {
  checkOtp,
  clearChangePassword,
} from "../../../../reducers/usersSlice";

const fields = [
  "firstNum",
  "secondNum",
  "thirdNum",
  "fourthNum",
];

const OTP = () => {
  const dispatch = useDispatch();
  const inputRefs = useRef([]);

  const {
    otpErrorMessage,
    isOtpError,
    isOtpLoading,
    verifyEmail,
  } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    setFocus,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstNum: "",
      secondNum: "",
      thirdNum: "",
      fourthNum: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    setFocus("firstNum");
  }, [setFocus]);

  const onSubmit = (data) => {
    const code = fields.map((field) => data[field]).join("");

    if (code.length !== 4 || isOtpLoading) return;

    dispatch(checkOtp(code));
  };

  const handleInput = (event, index, fieldName) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(-1);

    setValue(fieldName, value, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (value && index < fields.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index, fieldName) => {
    if (event.key !== "Backspace") return;

    const currentValue = getValues(fieldName);

    if (currentValue) {
      setValue(fieldName, "", {
        shouldDirty: true,
        shouldValidate: true,
      });

      return;
    }

    if (index > 0) {
      const previousField = fields[index - 1];

      setValue(previousField, "", {
        shouldDirty: true,
        shouldValidate: true,
      });

      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const digits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4)
      .split("");

    fields.forEach((field, index) => {
      setValue(field, digits[index] || "", {
        shouldDirty: true,
        shouldValidate: true,
      });
    });

    const lastIndex = Math.min(digits.length - 1, 3);

    if (lastIndex >= 0) {
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <div className="w-full">
      <div className="text-center">
        <div
          className="
            mx-auto grid h-12 w-12 place-items-center
            rounded-2xl border border-sky-300/25
            bg-sky-500/10 text-sky-200
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
          Check your email
        </h1>

        <p className="mt-2 text-sm leading-6 text-white/60">
          We sent a 4-digit verification code to
        </p>

        <p className="mt-1 break-all text-sm font-medium text-sky-200">
          {verifyEmail}
        </p>

        <button
          type="button"
          onClick={() => dispatch(clearChangePassword())}
          className="
            mt-2 text-sm text-sky-200
            underline underline-offset-4
            hover:text-sky-100
          "
        >
          Use a different email
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6"
      >
        <div
          className="flex justify-center gap-3"
          onPaste={handlePaste}
        >
          {fields.map((fieldName, index) => {
            const registration = register(fieldName, {
              required: true,
              pattern: /^[0-9]$/,
            });

            return (
              <input
                key={fieldName}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className={`
                  h-14 w-14 rounded-2xl
                  border bg-white/[0.06]
                  text-center text-xl font-semibold
                  text-white outline-none transition
                  ${errors[fieldName]
                    ? "border-rose-400/60"
                    : "border-white/15 focus:border-sky-200/60"
                  }
                `}
                {...registration}
                ref={(element) => {
                  registration.ref(element);
                  inputRefs.current[index] = element;
                }}
                onChange={(event) => {
                  registration.onChange(event);
                  handleInput(event, index, fieldName);
                }}
                onKeyDown={(event) =>
                  handleKeyDown(event, index, fieldName)
                }
              />
            );
          })}
        </div>

        <div className="mt-3 min-h-5 text-center">
          {isOtpLoading ? (
            <p className="text-xs text-sky-200">
              Verifying code...
            </p>
          ) : isOtpError ? (
            <p className="text-xs text-rose-300">
              {otpErrorMessage}
            </p>
          ) : (
            <p className="text-xs text-white/40">
              Enter all four digits.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isOtpLoading}
          className={`
            mt-4 h-11 w-full rounded-xl border
            text-sm font-semibold transition
            ${!isValid || isOtpLoading
              ? `
                  cursor-not-allowed
                  border-white/10
                  bg-white/[0.04]
                  text-white/35
                `
              : `
                  border-sky-300/35
                  bg-sky-500/20
                  text-white
                  hover:bg-sky-400/25
                `
            }
          `}
        >
          {isOtpLoading ? "Verifying..." : "Verify code"}
        </button>
      </form>
    </div>
  );
};

export default OTP;