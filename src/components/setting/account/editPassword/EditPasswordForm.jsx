import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../../../homePage/Auth/formInput/Icon";

import {
    clearEditCancel,
    updateUserPassword,
} from "../../../../reducers/usersSlice";

const EditPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isPasswordUpdated,
        isUpdatePasswordError,
        isUpdatePasswordErrorMessage,
        isUpdatePasswordLoading,
    } = useSelector((state) => state.user);

    const [showPassword, setShowPassword] = useState({
        password: false,
        newPassword: false,
        confirmNewPassword: false,
    });

    const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const {
        register,
        watch,
        handleSubmit,
        reset,
        getValues,
        formState: {
            errors,
            isValid,
        },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    const newPasswordValue = watch("newPassword", "");
    const confirmValue = watch("confirmNewPassword", "");

    const passwordChecks = {
        length: newPasswordValue.length >= 8,
        uppercase: /[A-Z]/.test(newPasswordValue),
        lowercase: /[a-z]/.test(newPasswordValue),
        number: /\d/.test(newPasswordValue),
        special: /[@$!%*?&]/.test(newPasswordValue),
    };

    const passwordsMatch =
        confirmValue.length > 0 &&
        newPasswordValue === confirmValue;

    const isSubmitDisabled =
        !isValid ||
        !passwordsMatch ||
        isUpdatePasswordLoading;

    useEffect(() => {
        if (!isPasswordUpdated) return;

        reset({
            password: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    }, [isPasswordUpdated, reset]);

    const togglePassword = (field) => {
        setShowPassword((current) => ({
            ...current,
            [field]: !current[field],
        }));
    };

    const onSubmit = async (data) => {
        if (isSubmitDisabled) return;

        try {
            await dispatch(
                updateUserPassword({
                    password: data.password,
                    newPassword: data.newPassword,
                })
            ).unwrap();
        } catch (error) {
            console.error("Password update failed:", error);
        }
    };

    const cancelEdit = () => {
        dispatch(clearEditCancel());
        navigate(-1);
    };

    const fieldClass = (hasError) => `
    flex h-12 w-full items-center
    rounded-xl border px-4
    bg-white/[0.05]
    backdrop-blur-md transition
    ${hasError
            ? `
          border-rose-400/55
          shadow-[0_0_0_1px_rgba(255,90,95,0.25),0_0_18px_rgba(255,90,95,0.14)]
        `
            : `
          border-white/15
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
          focus-within:border-sky-200/55
          focus-within:bg-white/[0.07]
          focus-within:ring-2
          focus-within:ring-sky-300/15
        `
        }
  `;

    const Requirement = ({ complete, children }) => {
        return (
            <li
                className={`flex items-center gap-2 ${complete
                    ? "text-emerald-300"
                    : "text-white/50"
                    }`}
            >
                <span
                    className={`
                        grid h-4 w-4 shrink-0 place-items-center
                        rounded-full border text-[10px]
            ${complete
                            ? `
                  border-emerald-300/40
                  bg-emerald-400/15
                `
                            : `
                  border-white/15
                  bg-white/[0.03]
                `
                        }
          `}
                >
                    {complete ? "✓" : ""}
                </span>

                <span>{children}</span>
            </li>
        );
    };

    if (isPasswordUpdated) {
        return (
            <div
                className="
                    flex items-center gap-3
                    rounded-2xl border border-emerald-400/20
                    bg-emerald-500/10 px-4 py-4
                    text-sm text-emerald-200
                    backdrop-blur-xl">
                <div
                    className="
                        grid h-9 w-9 shrink-0 place-items-center
                        rounded-xl bg-emerald-400/10"
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            d="m5 12 4 4L19 6"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div>
                    <p className="font-semibold">
                        Password updated
                    </p>

                    <p className="mt-0.5 text-xs text-emerald-100/65">
                        Your new password is now active.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-5"
        >
            <p className="text-sm leading-6 text-white/50">
                Enter your current password, then choose a new
                secure password.
            </p>

            <section
                className="
                    space-y-4 rounded-2xl
                    border border-white/10
                    bg-[#0b1220]/35 p-5
                    backdrop-blur-xl
                    shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]">
                {/* Current password */}
                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block text-sm font-medium text-white/75"
                    >
                        Current password
                    </label>

                    <div className={fieldClass(Boolean(errors.password))}>
                        <Icon kind="lock" />

                        <input
                            id="password"
                            type={
                                showPassword.password
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="current-password"
                            placeholder="Enter current password"
                            className="
                                h-full min-w-0 flex-1
                                bg-transparent px-3
                                text-sm text-white outline-none
                                placeholder:text-white/30"
                            {...register("password", {
                                required:
                                    "Current password is required.",
                            })}
                        />

                        <button
                            type="button"
                            onClick={() => togglePassword("password")}
                            className="
                                grid h-8 w-9 shrink-0 place-items-center
                                rounded-lg border border-white/10
                                bg-white/[0.04] text-white/55
                                transition
                                hover:bg-white/[0.08]
                                hover:text-white"
                            aria-label={
                                showPassword.password
                                    ? "Hide current password"
                                    : "Show current password"
                            }>
                            <Icon
                                kind={
                                    showPassword.password
                                        ? "eyeOff"
                                        : "eye"
                                }
                            />
                        </button>
                    </div>

                    {errors.password ? (
                        <p className="mt-1.5 pl-1 text-xs text-rose-300">
                            {errors.password.message}
                        </p>
                    ) : null}
                </div>

                {/* New password */}
                <div>
                    <label
                        htmlFor="newPassword"
                        className="mb-2 block text-sm font-medium text-white/75"
                    >
                        New password
                    </label>

                    <div className={fieldClass(Boolean(errors.newPassword))}>
                        <Icon kind="lock" />

                        <input
                            id="newPassword"
                            type={
                                showPassword.newPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            placeholder="Enter new password"
                            className="
                            h-full min-w-0 flex-1
                            bg-transparent px-3
                            text-sm text-white outline-none
                            placeholder:text-white/30"
                            {...register("newPassword", {
                                required:
                                    "New password is required.",
                                pattern: {
                                    value: passwordPattern,
                                    message:
                                        "Password does not meet all requirements.",
                                },
                                validate: (value) =>
                                    value !== getValues("password") ||
                                    "New password must be different from your current password.",
                            })}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                togglePassword("newPassword")
                            }
                            className="
                                    grid h-8 w-9 shrink-0 place-items-center
                                    rounded-lg border border-white/10
                                    bg-white/[0.04] text-white/55
                                    transition
                                    hover:bg-white/[0.08]
                                    hover:text-white"
                            aria-label={
                                showPassword.newPassword
                                    ? "Hide new password"
                                    : "Show new password"
                            }
                        >
                            <Icon
                                kind={
                                    showPassword.newPassword
                                        ? "eyeOff"
                                        : "eye"
                                }
                            />
                        </button>
                    </div>

                    {errors.newPassword ? (
                        <p className="mt-1.5 pl-1 text-xs text-rose-300">
                            {errors.newPassword.message}
                        </p>
                    ) : null}
                </div>

                {/* Confirm password */}
                <div>
                    <label
                        htmlFor="confirmNewPassword"
                        className="mb-2 block text-sm font-medium text-white/75"
                    >
                        Confirm new password
                    </label>

                    <div
                        className={fieldClass(
                            Boolean(errors.confirmNewPassword)
                        )}
                    >
                        <Icon kind="lock" />

                        <input
                            id="confirmNewPassword"
                            type={
                                showPassword.confirmNewPassword
                                    ? "text"
                                    : "password"
                            }
                            autoComplete="new-password"
                            placeholder="Confirm new password"
                            className="
                                h-full min-w-0 flex-1
                                bg-transparent px-3
                                text-sm text-white outline-none
                                placeholder:text-white/30"
                            {...register("confirmNewPassword", {
                                required:
                                    "Please confirm your new password.",
                                validate: (value) =>
                                    value === getValues("newPassword") ||
                                    "New passwords do not match.",
                            })}
                        />

                        <button
                            type="button"
                            onClick={() =>
                                togglePassword("confirmNewPassword")
                            }
                            className="
                                grid h-8 w-9 shrink-0 place-items-center
                                rounded-lg border border-white/10
                                bg-white/[0.04] text-white/55
                                transition
                                hover:bg-white/[0.08]
                                hover:text-white"
                            aria-label={
                                showPassword.confirmNewPassword
                                    ? "Hide confirmed password"
                                    : "Show confirmed password"
                            }>
                            <Icon
                                kind={
                                    showPassword.confirmNewPassword
                                        ? "eyeOff"
                                        : "eye"
                                }
                            />
                        </button>
                    </div>

                    {errors.confirmNewPassword ? (
                        <p className="mt-1.5 pl-1 text-xs text-rose-300">
                            {errors.confirmNewPassword.message}
                        </p>
                    ) : null}
                </div>
            </section>

            {/* Password requirements */}
            <section
                className="
                    rounded-2xl border border-white/10
                    bg-[#0b1220]/30 p-4
                    backdrop-blur-xl"
            >
                <p className="text-sm font-medium text-white/70">
                    Your new password must include:
                </p>

                <ul className="mt-3 space-y-2 text-xs">
                    <Requirement complete={passwordChecks.length}>
                        At least 8 characters
                    </Requirement>

                    <Requirement complete={passwordChecks.uppercase}>
                        One uppercase letter
                    </Requirement>

                    <Requirement complete={passwordChecks.lowercase}>
                        One lowercase letter
                    </Requirement>

                    <Requirement complete={passwordChecks.number}>
                        One number
                    </Requirement>

                    <Requirement complete={passwordChecks.special}>
                        One special character: @ $ ! % * ? &
                    </Requirement>

                    <Requirement complete={passwordsMatch}>
                        Both new passwords match
                    </Requirement>
                </ul>
            </section>

            {isUpdatePasswordError ? (
                <div
                    role="alert"
                    className="
                        rounded-xl border border-rose-400/25
                        bg-rose-500/10 px-4 py-3
                        text-sm text-rose-200"
                >
                    {isUpdatePasswordErrorMessage ||
                        "Unable to update your password."}
                </div>
            ) : null}

            <div className="space-y-3">
                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`
                        flex h-12 w-full items-center
                        justify-center rounded-xl border
                        text-sm font-semibold transition
                        active:scale-[0.99]
                        ${isSubmitDisabled
                            ? `
                        cursor-not-allowed
                        border-white/10
                        bg-[#111827]/70
                        text-white/35`
                            : `
                        border-sky-300/35
                        bg-sky-500/25
                        text-white
                        shadow-[0_10px_30px_rgba(40,120,255,0.18)]
                        hover:bg-sky-400/30`
                        }`}>
                    {isUpdatePasswordLoading ? (
                        <span className="flex items-center gap-2">
                            <span
                                className="
                                    h-4 w-4 animate-spin rounded-full
                                    border-2 border-white/25
                                    border-t-white"/>

                            Updating password...
                        </span>
                    ) : (
                        "Save Password"
                    )}
                </button>

                <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={isUpdatePasswordLoading}
                    className="
                        h-12 w-full rounded-xl
                        border border-white/10
                        bg-[#111827]/65
                        text-sm font-medium text-white/70
                        transition
                        hover:bg-[#182033]/80
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-50">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditPasswordForm;