import "./OTP.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Footer from "../../../footer/Footer";
import { useEffect, useState } from "react";
import Header from "../../../header/Header";

const OTP = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  let firstInput = {
    firstNum: true,
    secondtNum: true,
    thirdNum: true,
    fourthNum: true,
  };

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

  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
    const otp = Object.values(data).join("")
    console.log(otp)
  };

  return (
    <div className="OTP">
      <Header />
      <div className="OTP-section">
        <p>Enter the 4 Digits</p>
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
