import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../../../reducers/usersSlice";
import { useState } from "react";
import LoginWithGoogle from "./LoginInWithGoogle";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { isAuthLoading, isAuthError, errorMessage } = useSelector(
    (state) => state.user
  );
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors } = formState;
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  useGSAP(() => {
    gsap.to(".login", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});



  const onSubmit = (data) => {
    return dispatch(loginUser(data));
  };

  if (localStorage.getItem("token")) return <Navigate to="/dashboard" />;
  return (
    <div className="login opacity-0 w-[90%] h-[44vh]
                    flex flex-col justify-center">
      <LoginWithGoogle />
      <form className="flex flex-col h-40 mb-8" onSubmit={handleSubmit(onSubmit)}>
        <p className="text-red-500">
          {" "}
          {errors.text || errors.password
            ? "Invalid Input"
            : isAuthError
              ? errorMessage
              : isAuthLoading
                ? "Loading ..."
                : null}
        </p>
        <input
          placeholder="Email/Username"
          type="text"
          className={`bg-white h-10 pl-2 my-1 rounded-sm ${errors.text ? "text-red-300" : null}`}
          {...register("text", {
            required: {
              value: true,
              message: "Require",
            },
            minLength: {
              value: 4,
              message: "UserName is too Short",
            },
          })}
        />
        <input
          placeholder="******"
          type="password"
          className={`bg-white h-10 pl-2 rounded-sm
                   ${errors.password ? "text-red-300" : null}`}
          {...register("password", {
            required: true,
          })}
        />
        <input
          type="submit"
          value="Login"
          className={
            watch("text") === "" || watch("password") === "" || isAuthLoading
              ? "bg-gray-300 text-black font-bold h-10 my-1 rounded-sm"
              : "bg-blue-300 text-black h-10 my-1 rounded-sm cursor-pointer"
          }
          disabled={
            watch("text") === "" || isAuthLoading || watch("password") === ""
              ? "disabled"
              : ""
          }
        />
      </form>
      <div className="flex my-1">
        <Link className="forgot-password-para text-red-600 cursor-pointer" to="/reset-password">
          Forgot Password
        </Link>
      </div>{" "}
      <p className="have-account-para">
        Don't Have account?{" "}
        <button className="cursor-pointer px-1 text-cyan-900" onClick={props.createAccount}>SignUp</button>{" "}
      </p>
    </div>
  );
};

export default Login;
