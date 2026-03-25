import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, updateUser, clearEditCancel } from "../../../../reducers/usersSlice";
import { useNavigate } from "react-router-dom";

const EditUsernameForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isUsernameAvailable, isUserUpdated, user } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        watch,
    } = useForm({
        defaultValues: { username: user?.username || "" },
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const usernameValue = watch("username");
    const usernameChanged = usernameValue && user && usernameValue !== user.username;

    const disableForUsername = usernameChanged && isUsernameAvailable === false;
    const disableForErrors = Object.keys(errors).length > 0;
    const isSubmitDisabled = disableForUsername || disableForErrors || !usernameChanged;

    useEffect(() => {
        if (!user) return;
        if (errors.username) return;
        if (!usernameChanged) return;

        dispatch(checkUsername({ username: usernameValue }));
    }, [dispatch, user, usernameValue, usernameChanged, errors.username]);

    const onSubmit = (data) => {
        dispatch(updateUser(data));
        reset({ username: data.username }); // resets dirty state
    };

    const cancelEdit = () => {
        dispatch(clearEditCancel());
        navigate(-1);
    };

    return (
        <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleSubmit(onSubmit)}>
            {/* Input card */}
            <div
                className="w-[98%] rounded-3xl border border-white/12 bg-white/[0.04] backdrop-blur-xl p-4
                   shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_55px_rgba(0,0,0,0.35)]"
            >
                <p className="mb-2 text-sm text-white/80">New Username</p>

                <input
                    type="text"
                    onKeyDown={(e) => {
                        if (e.key === " ") e.preventDefault();
                    }}
                    className={`w-full rounded-2xl px-4 py-3 text-sm outline-none bg-white/[0.06]
            placeholder-white/50 border transition
            ${errors.username || (isDirty && usernameChanged && isUsernameAvailable === false)
                            ? "text-[#ff5a5f] border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.45),0_0_18px_rgba(255,90,95,0.20)]"
                            : isDirty && usernameChanged && isUsernameAvailable === true
                                ? "text-white border-emerald-400/60 shadow-[0_0_0_1px_rgba(52,211,153,0.45),0_0_18px_rgba(52,211,153,0.18)]"
                                : "text-white border-sky-300/25 shadow-[0_0_0_1px_rgba(110,200,255,0.20),0_0_18px_rgba(60,170,255,0.10)]"
                        }`}
                    {...register("username", {
                        required: { value: true, message: "Require" },
                        minLength: { value: 3, message: "Invalid Username" },
                        maxLength: { value: 20, message: "Invalid Username" },
                        pattern: {
                            value: /^(?!.*\s)(?=.{3,20}$)[a-zA-Z0-9._]+$/,
                            message: "Invalid Username",
                        },
                    })}
                />

                {isDirty && usernameChanged && (
                    <p
                        className={`mt-2 text-sm ${errors.username
                                ? "text-[#ff5a5f] drop-shadow-[0_0_8px_rgba(255,90,95,0.5)]"
                                : isUsernameAvailable
                                    ? "text-[#3dff8f] drop-shadow-[0_0_8px_rgba(61,255,143,0.5)]"
                                    : "text-[#ff5a5f] drop-shadow-[0_0_8px_rgba(255,90,95,0.5)]"
                            }`}
                    >
                        {errors.username?.message ||
                            (isUsernameAvailable ? "Username Available" : "Username Unavailable")}
                    </p>
                )}
            </div>

            {/* Rules */}
            <ol
                className="w-[98%] list-disc list-inside text-xs rounded-3xl
                   border border-white/12 bg-white/[0.04] backdrop-blur-xl p-4
                   shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_55px_rgba(0,0,0,0.35)]"
            >
                <li className="list-none mb-2 text-white/80">Username must be:</li>
                <li>3–20 characters</li>
                <li>Letters, numbers, dots (.), underscores (_)</li>
                <li>No spaces</li>
            </ol>

            {/* Success */}
            {isUserUpdated ? (
                <div className="w-[98%] flex items-center justify-center gap-2 rounded-2xl
                        bg-[#3dff8f]/10 px-4 py-3 text-[#3dff8f]
                        shadow-[0_0_18px_rgba(61,255,143,0.35)]">
                    Username updated successfully 🚀
                </div>
            ) : null}

            {/* Buttons */}
            <div className="w-full flex flex-col items-center gap-2">
                <button
                    type="submit"
                    disabled={isSubmitDisabled}
                    className={`w-[96%] h-11 rounded-2xl border border-sky-300/25
                backdrop-blur-md text-sm text-white transition active:scale-[0.99]
                ${isSubmitDisabled
                            ? "bg-white/[0.03] opacity-50 cursor-not-allowed shadow-none"
                            : "bg-white/[0.06] shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)] hover:border-sky-200/45 hover:bg-white/[0.08]"
                        }`}
                >
                    Save Username
                </button>

                <button
                    type="button"
                    onClick={cancelEdit}
                    className="w-[96%] h-11 rounded-2xl border border-white/12
                     bg-white/[0.03] backdrop-blur-md text-sm text-white/70
                     hover:text-white hover:bg-white/[0.05] hover:border-white/18 transition"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default EditUsernameForm;