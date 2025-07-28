import "./ChangePasswordPrivacy.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { UserRequestChangePassword } from "../../reducers/usersSlice";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [isMatchPassword, setisMatchPassword] = useState(true);

  const {
    requestChangePasswordLoading,
    requestChangePasswordError,
    requestChangePasswordErrorMessage,
    requestChangePasswordPass,
  } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    console.log(data.newPsw, data.retypePsw);
    if (data.newPsw === data.retypePsw) {
      dispatch(UserRequestChangePassword(data));
      setisMatchPassword(true);
    } else {
      setisMatchPassword(false);
    }
  };
  console.log(
    requestChangePasswordLoading,
    requestChangePasswordError,
    requestChangePasswordErrorMessage,
    requestChangePasswordPass
  );
  return (
    <form className="ChangePasswordPrivacy" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="para-new-password"> Change Password</h3>
      <p className="error-new-password-para">
        {(errors.oldPas && errors.oldPas.type === "pattern") ||
        (errors.newPsw && errors.newPsw.type === "pattern") ||
        (errors.newPsw && errors.newPsw.type === "pattern")
          ? "Invalid Password"
          : requestChangePasswordError && requestChangePasswordErrorMessage
          ? requestChangePasswordErrorMessage
          : isMatchPassword
          ? null
          : "Password not match"}
      </p>
      <input
        type="password"
        placeholder="Current Password"
        className={errors.oldPas ? "error-form-input" : ""}
        {...register("oldPas", {
          required: {
            value: true,
            message: "Required",
          },
          pattern: {
            value: /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            message: "Invalid Password",
          },
        })}
      />
      <input
        type="password"
        placeholder="New Password"
        className={errors.newPsw || !isMatchPassword ? "error-form-input" : ""}
        {...register("newPsw", {
          required: {
            value: true,
            message: "Required",
          },
          pattern: {
            value: /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            message: "Invalid Password",
          },
        })}
      />
      <input
        className={errors.newPsw || !isMatchPassword ? "error-form-input" : ""}
        type="password"
        placeholder="Re type New Password"
        {...register("retypePsw", {
          required: {
            value: true,
            message: "Required",
          },
        })}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default ChangePassword;
