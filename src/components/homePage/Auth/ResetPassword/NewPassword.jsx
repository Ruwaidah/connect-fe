import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  clearChangePassword,
  requestNewPassword,
} from "../../../../reducers/usersSlice";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isAuthLoading,
    isAuthError,
    errorMessage,
  } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState({
    newPsw: false,
    retypePsw: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      newPsw: "",
      retypePsw: "",
    },
  });

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const newPassword = watch("newPsw", "");
  const confirmPassword = watch("retypePsw", "");

  const passwordsMatch =
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  const disableSubmit =
    !isValid ||
    !passwordsMatch ||
    isAuthLoading;

  const togglePassword = (field) => {
    setShowPassword((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const cancelChangePassword = () => {
    dispatch(clearChangePassword());
    navigate("/", { replace: true });
  };

  const onSubmit = async (data) => {
    try {
      await dispatch(
        requestNewPassword({
          password: data.newPsw,
        })
      ).unwrap();

      dispatch(clearChangePassword());
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const fieldClass = (hasError) => `
    flex h-12 w-full items-center
    rounded-xl border px-4
    bg-white/[0.05] transition
    ${
      hasError
        ? "border-rose-400/60"
        : "border-white/15 focus-within:border-sky-200/60"
    }
  `;

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
            <rect
              x="5"
              y="10"
              width="14"
              height="10"
              rx="2"
              strokeWidth="1.6"
            />

            <path
              d="M8 10V7a4 4 0 0 1 8 0v3"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="mt-4 text-xl font-semibold text-white">
          Create new password
        </h1>

        <p className="mt-1 text-sm text-white/60">
          Make sure it is strong and easy to remember.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 space-y-4"
      >
        <div>
          <label className="mb-1.5 block text-sm text-white/70">
            New password
          </label>

          <div className={fieldClass(Boolean(errors.newPsw))}>
            <input
              type={
                showPassword.newPsw
                  ? "text"
                  : "password"
              }
              placeholder="Enter new password"
              className="
                min-w-0 flex-1 bg-transparent
                text-sm text-white outline-none
                placeholder:text-white/30
              "
              {...register("newPsw", {
                required: "Password is required.",
                pattern: {
                  value: passwordPattern,
                  message:
                    "Use 8+ characters, uppercase, lowercase, number and special character.",
                },
              })}
            />

            <button
              type="button"
              onClick={() => togglePassword("newPsw")}
              className="text-sm text-white/55"
            >
              {showPassword.newPsw ? "Hide" : "Show"}
            </button>
          </div>

          {errors.newPsw ? (
            <p className="mt-1 text-xs text-rose-300">
              {errors.newPsw.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm text-white/70">
            Confirm password
          </label>

          <div
            className={fieldClass(
              Boolean(errors.retypePsw)
            )}
          >
            <input
              type={
                showPassword.retypePsw
                  ? "text"
                  : "password"
              }
              placeholder="Confirm new password"
              className="
                min-w-0 flex-1 bg-transparent
                text-sm text-white outline-none
                placeholder:text-white/30
              "
              {...register("retypePsw", {
                required: "Please confirm your password.",
                validate: (value) =>
                  value === getValues("newPsw") ||
                  "Passwords do not match.",
              })}
            />

            <button
              type="button"
              onClick={() => togglePassword("retypePsw")}
              className="text-sm text-white/55"
            >
              {showPassword.retypePsw ? "Hide" : "Show"}
            </button>
          </div>

          {errors.retypePsw ? (
            <p className="mt-1 text-xs text-rose-300">
              {errors.retypePsw.message}
            </p>
          ) : null}
        </div>

        {isAuthError && errorMessage ? (
          <div
            className="
              rounded-xl border border-rose-400/25
              bg-rose-500/10 px-4 py-3
              text-sm text-rose-200
            "
          >
            {errorMessage}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={disableSubmit}
          className={`
            h-11 w-full rounded-xl border
            text-sm font-semibold transition
            ${
              disableSubmit
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
          {isAuthLoading
            ? "Updating password..."
            : "Update password"}
        </button>

        <button
          type="button"
          onClick={cancelChangePassword}
          className="
            h-11 w-full rounded-xl
            border border-white/10
            bg-white/[0.03]
            text-sm text-white/65
            hover:bg-white/[0.06]
          "
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewPassword;