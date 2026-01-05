import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../../../reducers/usersSlice";
import { socket } from "../../../../socket";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoginWithGoogle from "../Login/LoginInWithGoogle";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  const [isMatchPassword, setIsMatchPassword] = useState(true);

  useGSAP(() => {
    gsap.to(".signUp", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});

  const onSubmit = (data) => {
    if (data.password == data.repassword) {
      setIsMatchPassword(true);
      dispatch(
        signUp({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          password: data.password,
          email: data.email,
        })
      );
    } else {
      setIsMatchPassword(false);
    }
  };

  console.log(errors)
  if (localStorage.getItem("token")) return <Navigate to="/dashboard" />;
  return (
    <div className={`signUp opacity-0 mb-8 h-[56vh]
                    flex flex-col justify-center w-[90%]
                    ${errors.password ? 'h-[60vh]' : ''}`}>
      <LoginWithGoogle />
      <form
        className="flex flex-col mb-8"
        onSubmit={handleSubmit(onSubmit)}>
        {errors && errors.password ? (
          <div className="error-p">
            <p className="password-rule-p text-red-500"> Password Must Have:</p>
            <ul className="password-rule text-red-500">
              <li> - at least 8 characters .</li>
              <li> - at least one number.</li>
              <li> - at least one one uppercase and lowercase letter.</li>
            </ul>
          </div>
        ) : isMatchPassword ? null : (
          <p className="error-p password-not-match">Password is not match</p>
        )}
        <input
          placeholder="First Name"
          type="text"
          className={`bg-white h-10 pl-2 my-1 rounded-sm ${errors.firstName ? "error-input" : null}`}
          {...register("firstName", {
            required: {
              value: true,
              message: "Require",
            },

            maxLength: {
              value: 10,
              message: "Name is too long",
            },
            minLength: {
              value: 2,
              message: "Name is too short",
            },
          })}
        />
        <input
          placeholder="Last Name"
          type="text"
          className={`bg-white h-10 pl-2 rounded-sm ${errors.lastName ? "error-input" : null}`}
          {...register("lastName", {
            required: {
              value: true,
              message: "Require",
            },

            maxLength: {
              value: 10,
              message: "Name is too long",
            },
            minLength: {
              value: 2,
              message: "Name is too short",
            },
          })}
        />

        <input
          placeholder="Username"
          type="text"
          className={`bg-white h-10 pl-2 mt-1 rounded-sm ${errors.username ? "error-input" : null}`}
          {...register("username", {
            required: {
              value: true,
              message: "Require",
            },
            pattern: {
              value: /(^([a-zA-Z]){1,})(\d{1,})?(_)?([a-z|A-Z|0-9])$/,

              message: "Invaild Username",
            },
            maxLength: {
              value: 10,
              message: "UserName is too Long",
            },
            minLength: {
              value: 4,
              message: "UserName is too Short",
            },
          })}
        />
        <input
          placeholder="Email"
          type="email"
          className={`bg-white h-10 pl-2 mt-1 rounded-sm ${errors.email ? "error-input" : null}`}
          {...register("email", {
            required: {
              value: true,
              message: "Require",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "invalid email",
            },
          })}
        />
        <input
          placeholder="Password"
          type="password"
          className={`bg-white h-10 pl-2 mt-1 rounded-sm ${errors.password ? "error-input" : null}`}
          {...register("password", {
            required: {
              value: true,
              message: "require",
            },
            pattern: {
              value: /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
              message: "Invalid Password",
            },
          })}
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className={`bg-white h-10 pl-2 mt-1 rounded-sm 
                      ${errors.repassword || !isMatchPassword ?
              "error-input" : null}`}
          {...register("repassword", {
            required: true,
          })}
        />
        <input type="submit"
          value="Create account"
          className="bg-blue-300 py-2 cursor-pointer rounded-sm mt-2" />
      </form>
      <p>
        Already have account?{" "}
        <button
          className="cursor-pointer text-green-900"
          onClick={props.clickLoginButton}>Login</button>
      </p>
    </div>
  );
};

export default SignUp;
