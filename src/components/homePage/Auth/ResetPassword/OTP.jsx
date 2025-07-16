import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./OTP.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Footer from "../../../footer/Footer";
import { useEffect, useState } from "react";
import Header from "../../../header/Header";
import {
  checkOtp,
  changeTheEmail,
  clearChangePassword,
} from "../../../../reducers/usersSlice";
import StickersImages from "../../../StickersImages/StickersImages";
import { Link } from "react-router-dom";

const OTP = () => {
  const dispatch = useDispatch();
  const { otpErrorMessage, isOtpError, isOtpLoading, verifyEmail } =
    useSelector((state) => state.user);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  let firstInput = {
    firstNum: true,
    secondtNum: true,
    thirdNum: true,
    fourthNum: true,
  };

  useGSAP(() => {
    gsap.to(".OTP", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (Number(e.key) || (e.key == 0 && e.key != " ")) {
        document.getElementById(`${e.target.id}`).value = e.key;
        firstInput[`${e.target.id}`] = false;
        const nextInput = document.getElementById(`${e.target.id}`)
          .nextElementSibling
          ? document.getElementById(`${e.target.id}`).nextElementSibling.id
          : null;
        nextInput && document.getElementById(nextInput).focus();
      } else {
        if (
          (Number(document.getElementById(`${e.target.id}`).value) ||
            document.getElementById(`${e.target.id}`).value == 0) &&
          !firstInput[`${e.target.id}`]
        ) {
          document.getElementById(`${e.target.id}`).value =
            document.getElementById(`${e.target.id}`).value;
        } else {
          document.getElementById(`${e.target.id}`).value = " ";
        }
        firstInput[`${e.target.id}`] = false;
      }
    });
  }, []);

  const notRightEmail = () => {
    // dispatch(changeTheEmail());
    dispatch(clearChangePassword());
  };

  const onSubmit = (data) => {
    const numberCode = Object.values(data).join("");
    dispatch(checkOtp(numberCode));
  };

  return (
    <div className="OTP">
      <Header />
      <StickersImages />
      <div className="OTP-section">
        <div className="section-1-para">
          <p>Check your Email</p>
          <div>
            <p>{verifyEmail}</p> <Link onClick={notRightEmail}>Not You?</Link>
          </div>{" "}
          <p>We sent you an email with 4 Digit code.</p>
        </div>
        <p className="otp-error">
          {isOtpLoading ? "Loading ..." : isOtpError ? otpErrorMessage : null}
        </p>
        <form className="otp-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="otp_input_div">
            <input
              id="firstNum"
              type="text"
              maxLength="1"
              minLength="1"
              className={errors && errors.firstNum ? "error-input" : null}
              {...register("firstNum", {
                required: {
                  value: true,
                  message: "Require",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only Numbers",
                },
              })}
            />

            <input
              id="secondtNum"
              type="text"
              maxLength="1"
              minLength="1"
              className={errors && errors.secondtNum ? "error-input" : null}
              {...register("secondtNum", {
                required: {
                  value: true,
                  message: "Require",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only Numbers",
                },
              })}
            />

            <input
              id="thirdNum"
              type="text"
              maxLength="1"
              minLength="1"
              className={errors && errors.thirdNum ? "error-input" : null}
              {...register("thirdNum", {
                required: {
                  value: true,
                  message: "Require",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only Numbers",
                },
              })}
            />

            <input
              id="fourthNum"
              type="text"
              maxLength="1"
              minLength="1"
              className={errors && errors.fourthNum ? "error-input" : null}
              {...register("fourthNum", {
                required: {
                  value: true,
                  message: "Require",
                },
                pattern: {
                  value: /[0-9]/,
                  message: "Only Numbers",
                },
              })}
            />
          </div>
          <input type="submit" value="Send Code" />
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default OTP;
