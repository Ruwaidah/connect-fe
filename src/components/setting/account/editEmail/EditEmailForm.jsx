import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkEmail, clearEditCancel, updateUser } from "../../../../reducers/usersSlice";

const EditEmailForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isEmailAvailable, isUserUpdated, user,
    } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
        watch,
    } = useForm({
        defaultValues: { email: "" },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    useEffect(() => {
        if (user?.email) reset({ email: user.email });
    }, [user, reset]);

    const emailValue = watch("email") || "";
    const emailChanged = user?.email && emailValue.trim() !== user.email;

    const disableForEmail = emailChanged && isEmailAvailable === false;
    const isSubmitDisabled = disableForEmail || !isValid;


    useEffect(() => {
        if (!user?.email) return;
        if (errors.email) return;
        if (!emailChanged) return;

        dispatch(checkEmail({ email: emailValue.trim() }));
    }, [dispatch, user, emailValue, emailChanged, errors.email]);


    const onSubmit = (data) => {
        const email = (data.email || "").trim();
        dispatch(updateUser({ email }));
        reset({ email });
    };

    const cancelEdit = () => {
        dispatch(clearEditCancel());
        navigate(-1);
    };

    const inputClass = `w-full rounded-xl px-4 py-2 text-white placeholder-white/40
  bg-white/0 backdrop-blur-xs border focus:outline-none transition
  ${errors.email || (isDirty && emailChanged && isEmailAvailable === false)
            ? "border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]"
            : "border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]"
        }`;

    return (
        <form
            className="mt-14 w-full h-[60%] flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-col w-full justify-center items-center">
                <div className="w-[98%]">
                    <p className="mb-2 ml-1 text-md text-[#7a789a]">
                        Enter your new email address
                    </p>

                    <input
                        type="email"
                        onKeyDown={(e) => {
                            if (e.key === " ") e.preventDefault();
                        }}
                        className={inputClass}
                        {...register("email", {
                            setValueAs: (v) => (v || "").trim(),
                            required: { value: true, message: "Email is required" },
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email format",
                            },
                        })}
                    />

                    <div className="h-12 flex items-center">
                        {errors.email ? (
                            <p className="ml-2 text-sm text-[#ff5a5f] drop-shadow-[0_0_8px_rgba(255,90,95,0.5)]">
                                {errors.email.message}
                            </p>
                        ) : isDirty && emailChanged ? (
                            isEmailAvailable ? (
                                <p className="ml-2 text-sm text-[#3dff8f] drop-shadow-[0_0_8px_rgba(61,255,143,0.5)]">
                                    Email available
                                </p>
                            ) : (
                                <p className="ml-2 text-sm text-[#ff5a5f] drop-shadow-[0_0_8px_rgba(255,90,95,0.5)]">
                                    Email unavailable
                                </p>
                            )
                        ) : isUserUpdated ? (
                            <p className="flex items-center gap-2 rounded-xl bg-[#3dff8f]/10 px-4 py-3 text-[#3dff8f]
      shadow-[0_0_18px_rgba(61,255,143,0.35)]">
                                Email updated successfully 🚀
                            </p>
                        ) : null}
                    </div>

                </div>
            </div>

            <div className="w-full flex items-center justify-around">
                <input
                    type="submit"
                    value="Save"
                    disabled={isSubmitDisabled}
                    className={`
            rounded-xl px-10 py-1 text-white w-[48%] transition active:scale-[0.99]
            ${isSubmitDisabled
                            ? "bg-white/[0.03] opacity-50 cursor-not-allowed border border-white/10"
                            : "bg-sky-500/20 border border-sky-300/35 shadow-[0_0_0_1px_rgba(120,220,255,0.35),0_10px_30px_rgba(40,120,255,0.20),0_0_30px_rgba(80,200,255,0.18)] hover:bg-sky-400/25 hover:shadow-[0_0_0_1px_rgba(160,240,255,0.45),0_12px_34px_rgba(40,120,255,0.25),0_0_40px_rgba(80,200,255,0.22)]"
                        }
          `}
                />

                <button
                    className="
            rounded-xl px-10 py-1 text-white/60 w-[48%]
            bg-white/[0.03] border border-white/10
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
            hover:text-white/80 hover:border-white/15 transition"
                    type="button"
                    onClick={cancelEdit}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditEmailForm;
