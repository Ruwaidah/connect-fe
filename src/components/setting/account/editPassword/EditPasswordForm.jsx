import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import Icon from "../../../homePage/Auth/formInput/Icon"
import { clearEditCancel, updateUserPassword } from "../../../../reducers/usersSlice"



const EditPasswordForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState({
        newPassword: false,
        confirmNewPassword: false
    });
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const {
        isPasswordUpdated,
        isUpdatePasswordError,
        isUpdatePasswordErrorMessage,
        user,
    } = useSelector((state) => state.user);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });
    const newPasswordValue = watch("newPassword");

    const hasError = Boolean(errors.newPassword || errors.confirmNewPassword);


    const eyeOnEyeOff = (data) => {
        const eye = !showPassword[data]
        setShowPassword({ ...showPassword, [data]: eye })
    }

    const onSubmit = (data) => {
        dispatch(updateUserPassword({ password: data.password, newPassword: data.newPassword }))

    }
    const cancelEdit = () => {
        dispatch(clearEditCancel())
        navigate(-1)
    }
    return <div className="flex flex-col w-full items-center">
        <p className="text-xs text-[#7a789a] text-center w-[80%]">Enter your current password and a new password to change it</p>
        <form className="mt-24 w-full flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[96%] mb-4 flex flex-col justify-center items-center">
                <label className="w-full text-start mb-1 ml-1 text-sm text-[#7a789a]">Current Password</label>
                <div className={` flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.password ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                        'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
                    }
                                `}>
                    <Icon kind="lock" />
                    <input type={showPassword.password ? "text" : "password"}
                        className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Require",
                            },
                        })} />

                    <button
                        type="button"
                        onClick={() => eyeOnEyeOff('password')}
                        className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition"
                        aria-label={showPassword.password ? "Hide password" : "Show password"}
                    >
                        <Icon kind={showPassword.password ? "eyeOff" : "eye"} />
                    </button>
                </div>
            </div>
            <div className="flex flex-col w-full items-center">
                <div className="w-[96%] mb-4 flex flex-col justify-center items-center">
                    <label className="w-full text-start mb-1 ml-1 text-sm text-[#7a789a]">New Password</label>
                    <div className={` flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.newPassword ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                            'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
                        }
                                `}>
                        <Icon kind="lock" />
                        <input type={showPassword.newPassword ? "text" : "password"}
                            className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40"
                            {...register("newPassword", {
                                required: {
                                    value: true,
                                    message: "Require",
                                },
                                pattern: {
                                    value: passwordPattern,
                                    message:
                                        "Password must be 8+ chars and include uppercase, lowercase, number, and special (@$!%*?&).",
                                },

                            })} />

                        <button
                            type="button"
                            onClick={() => eyeOnEyeOff('newPassword')}
                            className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition"
                            aria-label={showPassword.newPassword ? "Hide password" : "Show password"}
                        >
                            <Icon kind={showPassword.newPassword ? "eyeOff" : "eye"} />
                        </button>
                    </div>
                </div>
                <div className="w-[96%] mb-4 flex flex-col justify-center items-center">
                    <label className="w-full text-start mb-1 ml-1 text-sm text-[#7a789a]">Confirm New Password</label>
                    <div className={` flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.confirmNewPassword ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                            'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
                        }
                                `}>
                        <Icon kind="lock" />
                        <input type={showPassword.confirmNewPassword ? "text" : "password"}
                            className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40"
                            {...register("confirmNewPassword", {
                                required: {
                                    value: true,
                                    message: "Require",
                                },
                                pattern: {
                                    value: passwordPattern,
                                    message:
                                        "Password must be 8+ chars and include uppercase, lowercase, number, and special (@$!%*?&).",
                                },

                                validate: (val) => val === newPasswordValue || "New Passwords must Match"
                            })} />

                        <button
                            type="button"
                            onClick={() => eyeOnEyeOff('confirmNewPassword')}
                            className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition"
                            aria-label={showPassword.confirmNewPassword ? "Hide password" : "Show password"}
                        >
                            <Icon kind={showPassword.confirmNewPassword ? "eyeOff" : "eye"} />
                        </button>
                    </div>
                </div>
                <div className="w-[96%] mt-0 mb-4 text-sm pl-2 text-[#ff5a5f]">
                    {errors.password?.message ||
                        errors.newPassword?.message ||
                        errors.confirmNewPassword?.message ||
                        (isUpdatePasswordError && isUpdatePasswordErrorMessage) ||
                        ""}
                </div>

            </div>

            <ol className={`list-disc list-inside text-sm mb-6
                                w-[96%] rounded-xl px-4 py-2
                                placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${hasError ?
                    'text-[#ff5a5f] border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                    'text-white border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
                }
                                `}>
                <li className="list-none mb-2">Password must contain at least:</li>
                <li>One number</li>
                <li>One uppercase and one lowercase letter</li>
                <li>One special character : <span>@ $ ! % * ? &</span></li>
                <li>8 or more characters</li>
            </ol>
            <div className="w-[98%] flex items-center justify-around">
                <input type="submit" value="Save"
                    disabled={!isValid}
                    className="
                            rounded-xl px-10 py-1 text-white w-[48%]
                            bg-sky-500/20
                            border border-sky-300/35
                            shadow-[0_0_0_1px_rgba(120,220,255,0.35),0_10px_30px_rgba(40,120,255,0.20),0_0_30px_rgba(80,200,255,0.18)]
                            hover:bg-sky-400/25
                            hover:shadow-[0_0_0_1px_rgba(160,240,255,0.45),0_12px_34px_rgba(40,120,255,0.25),0_0_40px_rgba(80,200,255,0.22)]
                            active:scale-[0.99]
                            transition
                        "/>
                <button className="
                                rounded-xl px-10 py-1 text-white/60 w-[48%]
                                bg-white/[0.03]
                                border border-white/10
                                shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                                hover:text-white/80 hover:border-white/15
                                transition"
                    type="button"
                    onClick={cancelEdit}>
                    Cancel
                </button>
            </div>

            <div className="h-12 flex items-center">

                {isPasswordUpdated ? <p
                    className="flex items-center gap-2 rounded-xl
                            bg-[#3dff8f]/10 px-4 py-3
                            text-[#3dff8f]
                            shadow-[0_0_18px_rgba(61,255,143,0.35)]">
                    Password updated successfully 🚀
                </p> : null
                }
            </div>
        </form>
    </div>
}

export default EditPasswordForm