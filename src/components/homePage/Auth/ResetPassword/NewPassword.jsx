import "./NewPassword.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  clearChangePassword,
  requestNewPassword,
} from "../../../../reducers/usersSlice";

const NewPassword = () => {
  const dispatch = useDispatch();
  const { requestChangePasswordPass } = useSelector((state) => state.user);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [isMatchPassword, setisMatchPassword] = useState(true);

  const cancelChangePassword = () => {
    dispatch(clearChangePassword());
  };

  const onSubmit = (data) => {
    if (data.newPsw === data.retypePsw) {
      dispatch(
        requestNewPassword({
          email: emailRecovery,
          password: data.newPsw,
        })
      );
      setisMatchPassword(true);
    } else {
      setisMatchPassword(false);
    }
  };

  return (
    <div className="NewPassword">
      {requestChangePasswordPass ? (
        <div className="login-new-password">
          <p className="para-1">Password Successfully changed !</p>
          <div>
            <p>Please Try to</p>
            <Link to="/">Login</Link>
          </div>{" "}
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="para-new-password"> Please enter new password</p>
          <p className="error-new-password-para">
            {isMatchPassword ? null : "Password is not match"}
          </p>
          <input
            type="password"
            placeholder="New Password"
            className={
              errors.newPsw || !isMatchPassword ? "error-form-input" : ""
            }
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
            className={
              errors.newPsw || !isMatchPassword ? "error-form-input" : ""
            }
            type="password"
            placeholder="Re type New Password"
            {...register("retypePsw", {
              required: {
                value: true,
                message: "Required",
              },
            })}
          />
          {/* {errors.newPsw ? ( */}
          <div className="error-p">
            <p className="password-rule-p">Password Must Have:</p>
            <ul className="password-rule">
              <li>at least 8 characters .</li>
              <li>at least one number.</li>
              <li>at least one one uppercase and lowercase letter.</li>
            </ul>
          </div>
          {/* ) : null} */}
          <input type="submit" value="Submit" />
          <Link to="/" onClick={cancelChangePassword}>
            {" "}
            Cancel
          </Link>
        </form>
      )}
    </div>
  );
};

export default NewPassword;
