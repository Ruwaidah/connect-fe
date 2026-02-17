import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkUsername, updateUser, clearEditCancel } from "../../../../reducers/usersSlice";
import { useNavigate } from "react-router-dom";


const EditUsernameForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        isGettingUserLoading,
        isGettingUserError,
        isGettingUserErrorMessage,
        isUsernameAvailable,
        isUserUpdated,
        user,
    } = useSelector((state) => state.user);
    const { register, handleSubmit, formState, reset, watch } = useForm({
        defaultValues: { username: user?.username || "" },
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const { errors, isDirty } = formState;

    const usernameValue = watch("username");

    // user changed username
    const usernameChanged = usernameValue && user && usernameValue !== user.username;

    // Disable submit if changed and not available
    const disableForUsername = usernameChanged && isUsernameAvailable === false;

    //  Disable submit if any form errors
    const disableForErrors = Object.keys(errors).length > 0;

    const isSubmitDisabled = disableForUsername || disableForErrors;

    useEffect(() => {
        if (!user) return;

        if (errors.username) return;

        if (!usernameChanged) return;

        dispatch(checkUsername({ username: usernameValue }));
    }, [dispatch, user, usernameValue, usernameChanged, errors.username]);


    const onSubmit = (data) => {
        dispatch(updateUser(data));
        reset({ username: data.username });
    }

    const cancelEdit = () => {
        dispatch(clearEditCancel())
        navigate(-1)
    }

    return <form className="mt-10 w-full h-[60%] flex flex-col justify-between items-center"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full justify-center items-center">
            <div className="rounded-2xl border border-white/15 mb-2
                            bg-white/5 backdrop-blur-md w-[98%] p-4
                            shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.08)]">
                <p className="mb-2 text-sm">
                    New Username
                </p>
                <input type="text"
                    onKeyDown={(e) => {
                        if (e.key === " ") e.preventDefault();
                    }}

                    className={`w-full rounded-xl bg-white/5 px-4 py-3 placeholder-white/60 border focus:outline-none
                                    ${errors.username || (isDirty && !isUsernameAvailable)
                            ? "text-[#ff5a5f] border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]"
                            : isDirty && isUsernameAvailable
                                ? "bg-black/30 text-white border-emerald-400/60 shadow-[0_0_0_1px_rgba(52,211,153,0.55),0_0_12px_rgba(52,211,153,0.35),0_0_28px_rgba(52,211,153,0.22)]"
                                : "text-white border-white/15"
                        }`}

                    {...register("username", {
                        required: {
                            value: true,
                            message: "Require",
                        },
                        minLength: {
                            value: 3,
                            message: "Invaild Username"
                        },
                        maxLength: { value: 20, message: "Invaild Username" },
                        pattern: {
                            value: /^(?!.*\s)(?=.{3,20}$)[a-zA-Z0-9._]+$/,
                            message: "Invaild Username",
                        },
                    })} />
                {isDirty && usernameChanged && (
                    <p
                        className={`mt-2 text-sm drop-shadow-[0_0_8px_rgba(0,0,0,0.2)]
                            ${errors.username
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
            <ol className="list-disc list-inside text-xs rounded-2xl
                                        border border-white/15 bg-white/5 backdrop-blur-md
                                        w-[98%] p-4
                                        shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.08)]">
                <li className="list-none mb-2 text-white/80">Username must be:</li>
                <li>3–20 characters</li>
                <li>Letters, numbers, dots (.), underscores (_)</li>
                <li>No spaces</li>
            </ol>
        </div>
        {isUserUpdated ? <div
            className="flex items-center gap-2 rounded-xl
                            bg-[#3dff8f]/10 px-4 py-3
                            text-[#3dff8f]
                            shadow-[0_0_18px_rgba(61,255,143,0.35)]">
            Username updated successfully 🚀
        </div> : null}
        <div className="w-full flex flex-col items-center text-sm">
            <input type="submit" value="Save Username"
                disabled={isSubmitDisabled}
                className={` mb-1 w-[96%] mt-4 h-11 rounded-xl border border-sky-300/25
                    backdrop-blur-md text-sm text-white transition active:scale-[0.99]
                    ${isSubmitDisabled
                        ? "bg-white/[0.03] opacity-50 cursor-not-allowed shadow-none"
                        : "bg-white/[0.06] shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)] hover:border-sky-200/45 hover:bg-white/[0.08]"
                    }`} />
            <button type="button" className="h-11 rounded-xl border border-white/15 mb-2
                                    bg-white/5 backdrop-blur-md w-[96%] p-2
                                    shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.08)]"
                onClick={cancelEdit}>
                Cancel
            </button>
        </div>
    </form>
}

export default EditUsernameForm