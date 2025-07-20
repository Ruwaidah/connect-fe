import "./Login.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { loginUser } from "../../../../reducers/usersSlice";
import { useState } from "react";

const Login = () => {
  const { isAuthLoading, isAuthError, errorMessage } = useSelector(
    (state) => state.user
  );
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const { errors } = formState;
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    return dispatch(loginUser(data));
  };

  if (localStorage.getItem("token")) return <Navigate to="/dashboard" />;
  return (
    <form className="Login-Component" onSubmit={handleSubmit(onSubmit)}>
      {/* <p className="error-para">{errors && errors.text ? "Require !" : null}</p> */}
      <p className="error-request-p">
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
        className={errors.text ? "error-input" : null}
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
        className={errors.password ? "error-input" : null}
        {...register("password", {
          required: true,
        })}
      />
      <input
        type="submit"
        value="Login"
        className={
          watch("text") === "" || watch("password") === "" || isAuthLoading
            ? "disabled-btn"
            : null
        }
        disabled={
          watch("text") === "" || isAuthLoading || watch("password") === ""
            ? "disabled"
            : ""
        }
      />
    </form>
  );
};

export default Login;
