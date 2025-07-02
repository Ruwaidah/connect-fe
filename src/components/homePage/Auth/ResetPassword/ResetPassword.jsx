import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ResetPassword.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useForm } from "react-hook-form";
import { resetPassword } from "../../../../reducers/usersSlice";
import Footer from "../../../footer/Footer";

const ResetPassword = () => {
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
    // dispatch(resetPassword(data));
    navigate("/pto");
  };

  return (
    <div className="ResetPassword-component">
      <div className="header-div">
        <img
          className="logo-img"
          src="https://img.icons8.com/?size=100&id=58562&format=png&color=000000"
        />
        <h4>Connect</h4>
      </div>
      <div className="ResetPassword-div">
        <div>
          <h3>Reset Your Password</h3>
          <p>
            Enter your Email below, and we'll email you instructions to reset
            your password.
          </p>
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
            id={watch("email") === "" ? "disabled" : null}
            disabled={watch("email") === "" ? "disabled" : ""}
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
