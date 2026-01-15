import { useForm } from "react-hook-form";
import { useState } from "react";
import Icon from "../formInput/Icon";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../reducers/usersSlice";
import { Navigate } from "react-router-dom";


const LoginForm = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit, formState, reset, watch } = useForm();
    const { errors } = formState;
    const [showPassword, setShowPassword] = useState(false);
    const { errorMessage, isAuthLoading, isAuthError } = useSelector(state => state.user)

    const onSubmit = (data) => {
        console.log(data)
        return dispatch(loginUser(data));
    };

    console.log(isAuthError, errorMessage)


    if (localStorage.getItem("token")) return <Navigate to="/messages" />;

    return <form onSubmit={handleSubmit(onSubmit)}>
        {/* Inputs */}
        {isAuthError && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <div className="space-y-3">
            <label className="text-xs text-white/60">Email / Username</label>
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.text ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
                    placeholder="name@example.com"
                    type="text"
                    {...register("text", {
                        required: {
                            value: true,
                            message: "Require",
                        },
                    })}
                />
            </div>
        </div>
        <div className="space-y-3">
            <label className="text-xs text-white/60">Password</label>
            <div className={`mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3
                ${errors.password ? '!border-red-300' : ''}`}>
                <Icon kind="lock" />
                <input
                    className="w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Require",
                        },
                    })}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    <Icon kind={showPassword ? "eyeOff" : "eye"} />
                </button>
            </div>
        </div>
        {/* Primary button */}
        <input
            className="mt-5 w-full cursor-pointer rounded-xl bg-[#3261d5] px-4 py-3 font-normal shadow-[0_8px_30px_rgba(59,130,246,0.22)]"
            type="submit"
            value="Login"
        />
    </form>
}


export default LoginForm