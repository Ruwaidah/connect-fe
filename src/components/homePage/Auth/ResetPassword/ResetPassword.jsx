import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ResetPassword.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../../../reducers/usersSlice";
import Footer from "../../../footer/Footer";
import Loading from "../../../loading/Loading";
import { useState } from "react";
import OTP from "./OTP";
import Header from "../../../header/Header";

const ResetPassword = () => {
  const [isResetPassword, setIsResetPassword] = useState(false);
  const { isResetPasswordLoading } = useSelector((state) => state.user);
  const { handleSubmit, register, watch, reset, formState } = useForm();
  const { errors } = formState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to(".ResetPassword-component", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});

  const onSubmit = (data) => {
    setIsResetPassword(true);
    dispatch(resetPassword(data));
    // navigate("/pto");
  };
  if (isResetPassword) return <OTP />;
  else
    return (
      <div className="ResetPassword-component">
        <Header />
        <div className="ResetPassword-div">
          <div>
            <h3>Reset Your Password</h3>
            <p>
              Enter your Email below, and we'll email you instructions to reset
              your password.
            </p>
          </div>
          <div className="loading-reset-password">
            {isResetPasswordLoading ? <p>Loading ... </p> : null}
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="resetpassword-form"
          >
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
                watch("email") === "" || isResetPasswordLoading
                  ? "disabled"
                  : ""
              }
              value="Submit"
            />
            <Link to="/">Cancel</Link>
          </form>
        </div>
        <Footer />
      </div>
    );
};

export default ResetPassword;
