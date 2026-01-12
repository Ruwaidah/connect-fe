import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Icon from "../formInput/Icon";
import { useEffect, useState } from "react";




const SignUpForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit, reset, formState } = useForm();
    const { errors } = formState;
    const [isMatchPassword, setIsMatchPassword] = useState(true);


    const onSubmit = (data) => {

        console.log(data)
        // if (data.password == data.repassword) {
        //   setIsMatchPassword(true);
        //   dispatch(
        //     signUp({
        //       firstName: data.firstName,
        //       lastName: data.lastName,
        //       username: data.username,
        //       password: data.password,
        //       email: data.email,
        //     })
        //   );
        // } else {
        //   setIsMatchPassword(false);
        // }
    };

    if (localStorage.getItem("token")) return <Navigate to="/messages" />;

    return <form
        className="flex flex-col mb-6 w-full"
        onSubmit={handleSubmit(onSubmit)}>
        {errors && errors.password ? (
            <div className="error-p text-xs">
                <p className="password-rule-p text-red-500 py-1 pl-2">* Use 8+ characters with a number, and both uppercase & lowercase letters.</p>
            </div>
        ) : isMatchPassword ? null : (
            <p className="error-p password-not-match">Password is not match</p>
        )}
        <div className="space-y-3">
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.firstName ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
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
        </div>
        <div className="space-y-3">
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.lastName ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
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
        </div>
        <div className="space-y-3">
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.username ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
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
        </div>
        <div className="space-y-3">
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.email ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
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
        </div>
        <div className="space-y-3">
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.password ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
                    placeholder="Password"
                    type="password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Require",
                        },
                    })}
                />
            </div>
        </div>
        <div className="space-y-3">
            <div className={`mt-1 flex items-center gap-2 rounded-xl 
                                border border-white/10 bg-white/5 px-3 py-3
                               ${errors.repassword ? '!border-red-300' : ''
                } `}>
                <Icon kind="mail" />
                <input
                    className="w-full bg-transparent outline-none 
                                text-sm placeholder:text-white/35"
                    placeholder="Confirm Password"
                    type="password"
                    {...register("repassword", {
                        required: {
                            value: true,
                            message: "Require",
                        },
                    })}
                />
            </div>
        </div>
        <input type="submit"
            value="Sign Up"
            className="bg-[#3261d5] py-2 cursor-pointer rounded-xl mt-2 max-lg:text-sm" />
    </form>
}

export default SignUpForm