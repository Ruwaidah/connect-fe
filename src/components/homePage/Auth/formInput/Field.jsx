import Icon from "./Icon";
import { useState } from "react";
import { useForm } from "react-hook-form";


const Field = ({ label, placeholder, icon, rightIcon }) => {
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;

    const isPassword = icon === "lock";
    const [showPassword, setShowPassword] = useState(false);

    const inputType = isPassword ? (showPassword ? "text" : "password") : "text";

    console.log(errors)

    return (
        <div>
            <label className="text-xs text-white/60">{label}</label>
            <div className="mt-1 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <Icon kind={icon} />
                <input
                    className="w-full bg-transparent outline-none text-sm placeholder:text-white/35"
                    placeholder={placeholder}
                    type={inputType}
                    {...register("text", {
                        required: {
                            value: true,
                            message: "Require",
                        },
                    })}
                />
                {rightIcon && isPassword ? (
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="h-8 w-8 grid place-items-center rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        <Icon kind={showPassword ? "eyeOff" : "eye"} />
                    </button>
                ) : null}
            </div>
        </div>
    );
}

export default Field