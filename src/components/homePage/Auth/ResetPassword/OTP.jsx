import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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

  const baseStyles = "text-lg font-semibold w-16 mr-2 mt-6 h-16 text-gray-800 text-center p-2 border rounded shadow-md"

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
    document.addEventListener("keydown", e => {
      if (e.key == "Backspace") {
        const previousElement = document.getElementById(`${e.target.id}`).previousElementSibling
        document.getElementById(`${e.target.id}`).value = ''
        if (document.getElementById(`${e.target.id}`).previousElementSibling &&
          document.getElementById(`${e.target.id}`).previousElementSibling.id) {
          document.getElementById(document.getElementById(`${e.target.id}`).previousElementSibling.id).focus();
        }
      }
    })
    document.addEventListener("keypress", (e) => {
      console.log(e.key)
      if (/^[0-9]$/.test(e.key)) {
        console.log("yes")
        document.getElementById(`${e.target.id}`).value = e.key;
        firstInput[`${e.target.id}`] = false;
        const nextInput = document.getElementById(`${e.target.id}`)
          .nextElementSibling
          ? document.getElementById(`${e.target.id}`).nextElementSibling.id
          : null;
        nextInput && document.getElementById(nextInput).focus();
        nextInput ? document.getElementById(nextInput).value = '' : null
      } else if (e.key == 'Enter') {
        document.getElementById('submit-id').click()
      }
      else {
        if (!/^[0-9]$/.test(document.getElementById(`${e.target.id}`).value)) {
          document.getElementById(`${e.target.id}`).value = " "
        }
      }
    });

  }, []);

  const notRightEmail = () => {
    // dispatch(changeTheEmail());
    dispatch(clearChangePassword());
  };

  const onSubmit = (data) => {
    console.log("submir")
    const numberCode = Object.values(data).join("");
    dispatch(checkOtp(numberCode));
  };

  console.log(errors)
  return (
    <div className="flex flex-col justify-center items-center
                    border border-gray-300 rounded-sm shadow-xl p-10">
      <div className="flex flex-col self-start">
        <div className="flex">
          <p>Check your Email</p>
          <p>We sent you an email to <span className="text-blue-900">{verifyEmail} </span>with 4 Digit code.</p>
        </div>
        <div className="flex">
          <p>Not you?</p> <Link onClick={notRightEmail}
            className="text-green-800 pl-2">Change Email</Link>
        </div>{" "}
      </div>
      <p className={isOtpLoading ? 'text-green-800' : isOtpError ? 'text-red-700' : ''}>
        {isOtpLoading ? "Loading ..." : isOtpError ? otpErrorMessage : null}
      </p>
      <form className="flex h-20" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <input
            id="firstNum"
            type="text"
            maxLength="1"
            minLength="1"
            className={`${baseStyles} ${errors.firstNum ? 'border-red-500' : ''}`}
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
            className={`${baseStyles} ${errors.secondtNum ? 'border-red-500' : ''}`}
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
            className={`${baseStyles} ${errors.thirdNum ? 'border-red-500' : ''}`}
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
            className={`${baseStyles} ${errors.fourthNum ? 'border-red-500' : ''}`}
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
        <input id='submit-id' className="hidden" type="submit" value="Send Code" />
      </form>
    </div>
  );
};

export default OTP;
