import "./InputEmailForm.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clearChangePassword } from "../../../../reducers/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../../reducers/usersSlice";
import StickersImages from "../../../StickersImages/StickersImages";

const InputEmailForm = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const { isResetPasswordLoading } = useSelector((state) => state.user);

  useGSAP(() => {
    gsap.to(".InputEmailForm", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});

  const cancelChangePassword = () => {
    dispatch(clearChangePassword());
  };

  const onSubmit = (data) => {
    props.setIsResetPassword(true);
    dispatch(resetPassword(data));
  };
  return (
    <div className="InputEmailForm">
      <StickersImages />
      <div className="ResetPassword-div">
        <div className="para-1">
          <h3>Reset Your Password</h3>
          <p>
            Enter your Email below, and we'll email you instructions to reset
            your password.
          </p>
        </div>
        <div className="loading-reset-password">
          {isResetPasswordLoading ? <p>Loading ... </p> : null}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="resetpassword-form">
          <input
            type="email"
            placeholder="Email"
            className={errors && errors.email ? "error-input" : null}
            {...register("email", {
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "invalid email",
              },
            })}
          />
          <input
            type="submit"
            id={
              watch("email") === "" || isResetPasswordLoading
                ? "disabled"
                : null
            }
            disabled={
              watch("email") === "" || isResetPasswordLoading ? "disabled" : ""
            }
            value="Submit"
          />
          <Link to="/" onClick={cancelChangePassword}>
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default InputEmailForm;
