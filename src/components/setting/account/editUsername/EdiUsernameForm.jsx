import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    checkUsername,
    updateUser,
    clearEditCancel,
} from "../../../../reducers/usersSlice";

const EditUsernameForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        user,
        isUsernameAvailable,
        isUserUpdated,
        isUserUpdateLoading,
        isUserUpdateError,
        userUpdateErrorMessage,
    } = useSelector((state) => state.user);

    const [isCheckingUsername, setIsCheckingUsername] =
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
            username: user?.username || "",
        },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (!user?.username) return;

        reset({
            username: user.username,
        });
    }, [user?.username, reset]);

    const usernameValue = watch("username", "").trim();

    const originalUsername =
        user?.username?.trim().toLowerCase() || "";

    const normalizedUsername =
        usernameValue.toLowerCase();

    const usernameChanged =
        Boolean(originalUsername) &&
        normalizedUsername !== originalUsername;

    useEffect(() => {
        if (
            !usernameChanged ||
            errors.username ||
            !usernameValue
        ) {
            setIsCheckingUsername(false);
            return;
        }

        setIsCheckingUsername(true);

        const timer = setTimeout(async () => {
            try {
                await dispatch(
                    checkUsername({
                        username: normalizedUsername,
                    })
                ).unwrap();
            } catch (error) {
                console.error(
                    "Username check failed:",
                    error
                );
            } finally {
                setIsCheckingUsername(false);
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [
        dispatch,
        normalizedUsername,
        usernameValue,
        usernameChanged,
        errors.username,
    ]);

    const usernameUnavailable =
        usernameChanged &&
        !isCheckingUsername &&
        isUsernameAvailable === false;

    const usernameAvailable =
        usernameChanged &&
        !isCheckingUsername &&
        isUsernameAvailable === true;

    const submitDisabled =
        !isDirty ||
        !usernameChanged ||
        !isValid ||
        !usernameAvailable ||
        isCheckingUsername ||
        isUserUpdateLoading;

    const onSubmit = async (data) => {
        const username = data.username
            .trim()
            .toLowerCase();

        if (submitDisabled) return;

        try {
            await dispatch(
                updateUser({
                    username,
                })
            ).unwrap();

            reset({
                username,
            });
        } catch (error) {
            console.error(
                "Username update failed:",
                error
            );
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
    ${errors.username || usernameUnavailable
            ? `
          border-rose-400/55
          shadow-[0_0_0_1px_rgba(255,90,95,0.25),0_0_18px_rgba(255,90,95,0.14)]
        `
            : usernameAvailable
                ? `
            border-emerald-400/45
            shadow-[0_0_0_1px_rgba(52,211,153,0.18),0_0_18px_rgba(52,211,153,0.12)]
          `
                : `
            border-white/15
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
            focus:border-sky-200/55
            focus:bg-white/[0.07]
            focus:ring-2
            focus:ring-sky-300/15
          `
        }
  `;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full space-y-5"
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
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-white/75"
                >
                    New username
                </label>

                <div className="relative">
                    <span
                        className="
              pointer-events-none absolute
              left-4 top-1/2 -translate-y-1/2
              text-sm text-white/35
            "
                    >
                        @
                    </span>

                    <input
                        id="username"
                        type="text"
                        autoComplete="username"
                        placeholder="username"
                        className={`${inputClass} pl-9`}
                        onKeyDown={(event) => {
                            if (event.key === " ") {
                                event.preventDefault();
                            }
                        }}
                        {...register("username", {
                            setValueAs: (value) =>
                                String(value || "")
                                    .trim()
                                    .toLowerCase(),
                            required: "Username is required.",
                            minLength: {
                                value: 3,
                                message:
                                    "Username must have at least 3 characters.",
                            },
                            maxLength: {
                                value: 20,
                                message:
                                    "Username cannot exceed 20 characters.",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._]+$/,
                                message:
                                    "Use only letters, numbers, dots and underscores.",
                            },
                        })}
                    />
                </div>

                <div className="mt-2 min-h-5 px-1">
                    {errors.username ? (
                        <p className="text-xs text-rose-300">
                            {errors.username.message}
                        </p>
                    ) : isCheckingUsername ? (
                        <p className="flex items-center gap-2 text-xs text-white/50">
                            <span
                                className="
                  h-3.5 w-3.5 animate-spin
                  rounded-full border-2
                  border-white/20 border-t-sky-200
                "
                            />

                            Checking username availability...
                        </p>
                    ) : usernameUnavailable ? (
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

                            This username is unavailable.
                        </p>
                    ) : usernameAvailable ? (
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

                            Username is available.
                        </p>
                    ) : !usernameChanged &&
                        usernameValue ? (
                        <p className="text-xs text-white/35">
                            This is your current username.
                        </p>
                    ) : (
                        <p className="text-xs text-white/35">
                            Your username will be visible to other
                            users.
                        </p>
                    )}
                </div>
            </section>

            <section
                className="
          rounded-2xl border border-white/10
          bg-[#0b1220]/30 p-4
          backdrop-blur-xl
        "
            >
                <p className="text-sm font-medium text-white/70">
                    Username requirements
                </p>

                <ul className="mt-3 space-y-2 text-xs text-white/50">
                    <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300/60" />
                        Between 3 and 20 characters
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300/60" />
                        Letters, numbers, dots and underscores
                    </li>

                    <li className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-300/60" />
                        No spaces
                    </li>
                </ul>
            </section>

            {isUserUpdated ? (
                <div
                    className="
            flex items-center gap-3
            rounded-xl border border-emerald-400/20
            bg-emerald-500/10 px-4 py-3
            text-sm text-emerald-200
          "
                >
                    <div
                        className="
              grid h-8 w-8 shrink-0 place-items-center
              rounded-lg bg-emerald-400/10
            "
                    >
                        <svg
                            width="17"
                            height="17"
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

                    Username updated successfully.
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
                        "Unable to update your username."}
                </div>
            ) : null}

            <div className="space-y-3">
                <button
                    type="submit"
                    disabled={submitDisabled}
                    className={`
            flex h-12 w-full items-center
            justify-center rounded-xl border
            text-sm font-semibold transition
            active:scale-[0.99]
            ${submitDisabled
                            ? `
                  cursor-not-allowed
                  border-white/10
                  bg-[#111827]/70
                  text-white/35
                `
                            : `
                  border-sky-300/35
                  bg-sky-500/25
                  text-white
                  shadow-[0_10px_30px_rgba(40,120,255,0.18)]
                  hover:bg-sky-400/30
                `
                        }
          `}
                >
                    {isUserUpdateLoading
                        ? "Saving username..."
                        : "Save Username"}
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
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditUsernameForm;