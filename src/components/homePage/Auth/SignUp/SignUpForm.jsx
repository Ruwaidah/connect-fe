import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../formInput/Icon";
import { signUp } from "../../../../reducers/usersSlice";

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmNewPassword: false,
    });

    const {
        isAuthError,
        errorMessage,
        isAuthLoading,
    } = useSelector((state) => state.user);

    const {
        trigger,
        register,
        watch,
        getValues,
        handleSubmit,
        formState: {
            errors,
            touchedFields,
            isValid,
        },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmNewPassword: "",
        },
    });

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const passwordValue = watch("password");

    useEffect(() => {
        if (touchedFields.confirmNewPassword) {
            trigger("confirmNewPassword");
        }
    }, [
        passwordValue,
        touchedFields.confirmNewPassword,
        trigger,
    ]);

    const togglePassword = (field) => {
        setShowPassword((current) => ({
            ...current,
            [field]: !current[field],
        }));
    };

    const onSubmit = (data) => {
        dispatch(
            signUp({
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                username: data.username.trim(),
                password: data.password,
                email: data.email.trim().toLowerCase(),
            })
        );
    };

    const firstError =
        errors.firstName?.message ||
        errors.lastName?.message ||
        errors.username?.message ||
        errors.email?.message ||
        errors.password?.message ||
        errors.confirmNewPassword?.message ||
        (isAuthError && errorMessage) ||
        "";

    const normalField =
        "border-sky-300/35 " +
        "shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] " +
        "focus-within:border-sky-200/70 " +
        "focus-within:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]";

    const errorField =
        "border-[#ff5a5f]/60 " +
        "shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]";

    if (localStorage.getItem("token")) {
        return <Navigate to="/messages" replace />;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex w-full flex-col"
        >
            {/* First name */}
            <div
                className={`
          mb-3 flex h-11 w-full items-center rounded-xl
          border bg-white/[0.03] px-4 text-white
          backdrop-blur-md transition
          ${errors.firstName
                        ? errorField
                        : normalField
                    }
        `}
            >
                <Icon kind="user" />

                <input
                    type="text"
                    autoComplete="given-name"
                    placeholder="First Name"
                    className="
            h-full w-full bg-transparent px-3
            text-sm text-white outline-none
            placeholder:text-white/35
          "
                    {...register("firstName", {
                        required: "First name is required.",
                        minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters.",
                        },
                    })}
                />
            </div>

            {/* Last name */}
            <div
                className={`
          mb-3 flex h-11 w-full items-center rounded-xl
          border bg-white/[0.03] px-4 text-white
          backdrop-blur-md transition
          ${errors.lastName
                        ? errorField
                        : normalField
                    }
        `}
            >
                <Icon kind="user" />

                <input
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last Name"
                    className="
            h-full w-full bg-transparent px-3
            text-sm text-white outline-none
            placeholder:text-white/35
          "
                    {...register("lastName", {
                        required: "Last name is required.",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters.",
                        },
                    })}
                />
            </div>

            {/* Username */}
            <div
                className={`
          mb-3 flex h-11 w-full items-center rounded-xl
          border bg-white/[0.03] px-4 text-white
          backdrop-blur-md transition
          ${errors.username
                        ? errorField
                        : normalField
                    }
        `}
            >
                <Icon kind="user" />

                <input
                    type="text"
                    autoComplete="username"
                    placeholder="Username"
                    className="
            h-full w-full bg-transparent px-3
            text-sm text-white outline-none
            placeholder:text-white/35
          "
                    {...register("username", {
                        required: "Username is required.",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters.",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_.]+$/,
                            message:
                                "Username can only contain letters, numbers, dots, and underscores.",
                        },
                    })}
                />
            </div>

            {/* Email */}
            <div
                className={`
          mb-3 flex h-11 w-full items-center rounded-xl
          border bg-white/[0.03] px-4 text-white
          backdrop-blur-md transition
          ${errors.email
                        ? errorField
                        : normalField
                    }
        `}
            >
                <Icon kind="mail" />

                <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="
            h-full w-full bg-transparent px-3
            text-sm text-white outline-none
            placeholder:text-white/35
          "
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email address.",
                        },
                    })}
                />
            </div>

            {/* Password */}
            <div
                className={`
          mb-3 flex h-11 w-full items-center rounded-xl
          border bg-white/[0.03] px-4 text-white
          backdrop-blur-md transition
          ${errors.password
                        ? errorField
                        : normalField
                    }
        `}
            >
                <Icon kind="lock" />

                <input
                    type={
                        showPassword.password
                            ? "text"
                            : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Password"
                    className="
            h-full min-w-0 flex-1 bg-transparent px-3
            text-sm text-white outline-none
            placeholder:text-white/35
          "
                    {...register("password", {
                        required: "Password is required.",
                        pattern: {
                            value: passwordPattern,
                            message:
                                "Password must be 8+ characters with uppercase, lowercase, number, and special character.",
                        },
                    })}
                />

                <button
                    type="button"
                    onClick={() =>
                        togglePassword("password")
                    }
                    className="
            grid h-8 w-9 shrink-0 place-items-center
            rounded-lg border border-white/10
            bg-white/[0.05] text-white/60
            transition hover:bg-white/10 hover:text-white
          "
                    aria-label={
                        showPassword.password
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    <Icon
                        kind={
                            showPassword.password
                                ? "eyeOff"
                                : "eye"
                        }
                    />
                </button>
            </div>

            {/* Confirm password */}
            <div
                className={`
          flex h-11 w-full items-center rounded-xl
          border bg-white/[0.03] px-4 text-white
          backdrop-blur-md transition
          ${errors.confirmNewPassword
                        ? errorField
                        : normalField
                    }
        `}
            >
                <Icon kind="lock" />

                <input
                    type={
                        showPassword.confirmNewPassword
                            ? "text"
                            : "password"
                    }
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    className="
            h-full min-w-0 flex-1 bg-transparent px-3
            text-sm text-white outline-none
            placeholder:text-white/35
          "
                    {...register("confirmNewPassword", {
                        required:
                            "Please confirm your password.",
                        validate: (value) =>
                            value === getValues("password") ||
                            "Passwords must match.",
                    })}
                />

                <button
                    type="button"
                    onClick={() =>
                        togglePassword(
                            "confirmNewPassword"
                        )
                    }
                    className="
            grid h-8 w-9 shrink-0 place-items-center
            rounded-lg border border-white/10
            bg-white/[0.05] text-white/60
            transition hover:bg-white/10 hover:text-white
          "
                    aria-label={
                        showPassword.confirmNewPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    <Icon
                        kind={
                            showPassword.confirmNewPassword
                                ? "eyeOff"
                                : "eye"
                        }
                    />
                </button>
            </div>

            {/* Error message */}
            <div
                className="
          mt-2 min-h-6 w-full
          text-sm leading-5 text-[#ff7a7e]
        "
                role={firstError ? "alert" : undefined}
            >
                {firstError}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={!isValid || isAuthLoading}
                className={`
          mt-3 h-11 w-full rounded-xl
          border px-6 text-sm font-semibold
          transition active:scale-[0.99]
          ${!isValid || isAuthLoading
                        ? `
                cursor-not-allowed
                border-white/10 bg-white/[0.04]
                text-white/40 shadow-none
              `
                        : `
                border-sky-300/35
                bg-sky-500/20 text-white
                shadow-[0_0_0_1px_rgba(120,220,255,0.35),0_10px_30px_rgba(40,120,255,0.20),0_0_30px_rgba(80,200,255,0.18)]
                hover:bg-sky-400/25
                hover:shadow-[0_0_0_1px_rgba(160,240,255,0.45),0_12px_34px_rgba(40,120,255,0.25),0_0_40px_rgba(80,200,255,0.22)]
              `
                    }
        `}
            >
                {isAuthLoading
                    ? "Creating account..."
                    : "Sign Up"}
            </button>

            {/* Login link */}
            <p className="mt-4 text-center text-sm text-white/60">
                Already have an account?{" "}
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="
            font-semibold text-sky-300
            transition hover:text-sky-200
          "
                >
                    Log in
                </button>
            </p>
        </form>
    );
};

export default SignUpForm;