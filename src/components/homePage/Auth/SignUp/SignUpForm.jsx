import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../formInput/Icon";
import { useEffect, useState } from "react";
import { signUp } from "../../../../reducers/usersSlice";


const SignUpForm = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmNewPassword: false
    });
    const { isAuthError, errorMessage,
        isAuthLoading
    } = useSelector(state => state.user)

    const {
        trigger,
        register,
        watch,
        getValues,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
    });



    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordValue = watch("password");

    useEffect(() => {
        if (touchedFields.confirmNewPassword) trigger("confirmNewPassword");
    }, [passwordValue, touchedFields.confirmNewPassword, trigger]);



    const eyeOnEyeOff = (data) => {
        const eye = !showPassword[data]
        setShowPassword({ ...showPassword, [data]: eye })
    }
    const onSubmit = (data) => {
        dispatch(
            signUp({
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                password: data.password,
                email: data.email,
            })
        );
    };

    if (localStorage.getItem("token")) return <Navigate to="/messages" />;

    return <form
        className="mt-2 w-full flex flex-col justify-center items-center"

        onSubmit={handleSubmit(onSubmit)}>
        <div className={`h-10 mb-2 flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.firstName ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
            }
                                `}>
            <Icon kind="user" />
            <input
                className="px-3 w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35
                                 autofill:bg-transparent"
                placeholder="First Name"
                type="text"
                {...register("firstName", {
                    required: {
                        value: true,
                        message: "Require",
                    },
                })}
            />
        </div>
        <div className={`h-10 mb-2 flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.lastName ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
            }
                                `}>
            <Icon kind="user" />
            <input
                className="px-3 w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
                placeholder="Last Name"
                type="text"
                {...register("lastName", {
                    required: {
                        value: true,
                        message: "Require",
                    },
                })}
            />
        </div>
        <div className={`h-10 mb-2 flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.username ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
            }
                                `}>
            <Icon kind="user" />
            <input
                className="px-3 w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
                placeholder="Username"
                type="text"
                {...register("username", {
                    required: {
                        value: true,
                        message: "Require",
                    },
                })}
            />
        </div>
        <div className={`h-10 mb-2 flex items-center justify-between
                                w-full rounded-xl px-4 py-2
                                text-white placeholder-white/40
                                bg-white/0 backdrop-blur-xs
                                focus:outline-none
                                border 
                                ${errors.email ? 'border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)] focus:shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]' :
                'border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)] focus:outline-none focus:border-sky-200/70 focus:shadow-[0_0_0_1px_rgba(140,230,255,0.60),0_0_24px_rgba(60,170,255,0.35),0_0_70px_rgba(60,140,255,0.18),inset_0_0_18px_rgba(150,240,255,0.16)]'
            }
                                `}>
            <Icon kind="mail" />
            <input
                className="flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40"
                placeholder="Email"
                type="text"
                {...register("email", {
                    required: {
                        value: true,
                        message: "Require",
                    },
                })}
            />
        </div>
        <div className={`h-10 mb-2 flex items-center justify-between
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
                className=" px-3 flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40"
                placeholder="********"
                {...register("password", {
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
                onClick={() => eyeOnEyeOff('password')}
                className="h-6 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10
                 text-white/60 hover:text-white hover:bg-white/10 transition"
                aria-label={showPassword.password ? "Hide password" : "Show password"}
            >
                <Icon kind={showPassword.password ? "eyeOff" : "eye"} />
            </button>
        </div>
        <div className={`h-10 mb-0 flex items-center justify-between
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
                placeholder="********"
                className=" px-3 flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40"
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

                    validate: (val) => val === getValues("password") || "New Passwords must Match",
                })} />

            <button
                type="button"
                onClick={() => eyeOnEyeOff('confirmNewPassword')}
                className="h-6 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition"
                aria-label={showPassword.confirmNewPassword ? "Hide password" : "Show password"}
            >
                <Icon kind={showPassword.confirmNewPassword ? "eyeOff" : "eye"} />
            </button>
        </div>
        <div className="w-[96%] flex justify-start items-center mt-0 mb-1 h-20 text-sm  text-[#ff5a5f]">
            {errors.firstName?.message ||
                errors.lastName?.message ||
                errors.username?.message ||
                errors.email?.message ||
                errors.password?.message ||
                errors.confirmNewPassword?.message ||
                (isAuthError && errorMessage) ||
                ""}

        </div>
        <input type="submit"
            value="Sign Up"
            className={`
            rounded-xl w-full h-10 px-10 py-1 text-white w-[48%] transition active:scale-[0.99]
             bg-sky-500/20 border border-sky-300/35 shadow-[0_0_0_1px_rgba(120,220,255,0.35),0_10px_30px_rgba(40,120,255,0.20),0_0_30px_rgba(80,200,255,0.18)] hover:bg-sky-400/25 hover:shadow-[0_0_0_1px_rgba(160,240,255,0.45),0_12px_34px_rgba(40,120,255,0.25),0_0_40px_rgba(80,200,255,0.22)]"

          `} />    </form>
}

export default SignUpForm