import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    checkEmail,
    clearEditCancel,
    updateUser,
} from "../../../../reducers/usersSlice";

const EditEmailForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user,
        isEmailAvailable,
        isUserUpdated,
        isUserUpdateLoading,
        isUserUpdateError,
        userUpdateErrorMessage,
    } = useSelector((state) => state.user);

    const [isCheckingEmail, setIsCheckingEmail] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors,
            isDirty,
            isValid,
        },
    } = useForm({
        defaultValues: {
            email: "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (!user?.email) return;

        reset({
            email: user.email,
        });
    }, [user?.email, reset]);

    const emailValue = watch("email", "").trim();

    const originalEmail =
        user?.email?.trim().toLowerCase() || "";

    const normalizedEmail =
        emailValue.toLowerCase();

    const emailChanged =
        Boolean(originalEmail) &&
        normalizedEmail !== originalEmail;

    useEffect(() => {
        if (!emailChanged || errors.email || !emailValue) {
            setIsCheckingEmail(false);
            return;
        }

        setIsCheckingEmail(true);

        const timer = setTimeout(async () => {
            try {
                await dispatch(
                    checkEmail({
                        email: normalizedEmail,
                    })
                ).unwrap();
            } catch (error) {
                console.error("Email check failed:", error);
            } finally {
                setIsCheckingEmail(false);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [
        dispatch,
        normalizedEmail,
        emailValue,
        emailChanged,
        errors.email,
    ]);

    const emailUnavailable =
        emailChanged &&
        !isCheckingEmail &&
        isEmailAvailable === false;

    const emailAvailable =
        emailChanged &&
        !isCheckingEmail &&
        isEmailAvailable === true;

    const submitDisabled =
        !isDirty ||
        !emailChanged ||
        !isValid ||
        !emailAvailable ||
        isCheckingEmail ||
        isUserUpdateLoading;

    const onSubmit = async (data) => {
        const email = data.email.trim().toLowerCase();

        if (submitDisabled) return;

        try {
            await dispatch(
                updateUser({
                    email,
                })
            ).unwrap();

            reset({
                email,
            });
        } catch (error) {
            console.error("Email update failed:", error);
        }
    };

    const cancelEdit = () => {
        dispatch(clearEditCancel());
        navigate(-1);
    };

    const inputClass = `
    h-12 w-full rounded-xl border
    bg-white/[0.05] px-4
    text-sm text-white
    outline-none backdrop-blur-md
    transition
    placeholder:text-white/30
    ${errors.email || emailUnavailable
            ? `
          border-rose-400/55
          shadow-[0_0_0_1px_rgba(255,90,95,0.25),0_0_18px_rgba(255,90,95,0.14)]`
            : emailAvailable
                ? `
            border-emerald-400/45
            shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_0_18px_rgba(52,211,153,0.12)]`
                : `
            border-white/15
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
            focus:border-sky-200/55
            focus:bg-white/[0.07]
            focus:ring-2
            focus:ring-sky-300/15`}`;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-auto w-full max-w-[460px] space-y-5"
        >
            <section
                className="
          rounded-2xl border border-white/10
          bg-[#0b1220]/35 p-5
          backdrop-blur-xl
          shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
        "
            >
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-white/75"
                >
                    New email address
                </label>

                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@example.com"
                    className={inputClass}
                    onKeyDown={(event) => {
                        if (event.key === " ") {
                            event.preventDefault();
                        }
                    }}
                    {...register("email", {
                        setValueAs: (value) =>
                            String(value || "")
                                .trim()
                                .toLowerCase(),
                        required: "Email is required.",
                        pattern: {
                            value:
                                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message:
                                "Enter a valid email address.",
                        },
                    })}
                />

                <div className="mt-2 min-h-5 px-1">
                    {errors.email ? (
                        <p className="text-xs text-rose-300">
                            {errors.email.message}
                        </p>
                    ) : isCheckingEmail ? (
                        <p className="flex items-center gap-2 text-xs text-white/50">
                            <span
                                className="
                            h-3.5 w-3.5 animate-spin
                            rounded-full border-2
                            border-white/20 border-t-sky-200"/>
                            Checking email availability...
                        </p>
                    ) : emailUnavailable ? (
                        <p className="flex items-center gap-1.5 text-xs text-rose-300">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    strokeWidth="1.7"
                                />

                                <path
                                    d="m9 9 6 6m0-6-6 6"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>

                            This email is already in use.
                        </p>
                    ) : emailAvailable ? (
                        <p className="flex items-center gap-1.5 text-xs text-emerald-300">
                            <svg
                                width="14"
                                height="14"
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

                            Email is available.
                        </p>
                    ) : !emailChanged && emailValue ? (
                        <p className="text-xs text-white/35">
                            This is your current email address.
                        </p>
                    ) : (
                        <p className="text-xs text-white/35">
                            We will use this address for account
                            notifications and recovery.
                        </p>
                    )}
                </div>
            </section>

            {isUserUpdated ? (
                <div
                    className="
                    flex items-center gap-3
                    rounded-xl border border-emerald-400/20
                    bg-emerald-500/10 px-4 py-3
                    text-sm text-emerald-200">
                    <div
                        className="
                    grid h-8 w-8 shrink-0 place-items-center
                    rounded-lg bg-emerald-400/10">
                        <svg
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor">
                            <path
                                d="m5 12 4 4L19 6"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    Email updated successfully.
                </div>
            ) : null}

            {isUserUpdateError ? (
                <div
                    role="alert"
                    className="
            rounded-xl border border-rose-400/25
            bg-rose-500/10 px-4 py-3
            text-sm text-rose-200
          "
                >
                    {userUpdateErrorMessage ||
                        "Unable to update your email."}
                </div>
            ) : null}

            <div className="space-y-3">
                <button
                    type="submit"
                    disabled={submitDisabled}
                    className={`
                    flex h-12 w-full items-center justify-center
                    rounded-xl border text-sm font-semibold transition
                    active:scale-[0.99]
                    ${submitDisabled
                            ? `
                    cursor-not-allowed
                    border-white/10
                    bg-[#111827]/70
                    text-white/35
                        `: `
                    border-sky-300/35
                    bg-sky-500/25
                    text-white
                    shadow-[0_10px_30px_rgba(40,120,255,0.18)]
                    hover:bg-sky-400/30`}`}>
                    {isUserUpdateLoading ? "Saving email..." : "Save Email"}
                </button>
                <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={isUserUpdateLoading}
                    className="
                    h-12 w-full rounded-xl
                    border border-white/10
                    bg-[#111827]/65
                    text-sm font-medium text-white/70
                    transition
                    hover:bg-[#182033]/80
                    hover:text-white">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditEmailForm;