import "./OTP.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Footer from "../../../footer/Footer";

const OTP = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data)
  };
  console.log(errors)

  return (
    <div className="OTP">
      <p>Enter the 4 Digits</p>
      <form className="otp-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            id="firstNum"
            type="text"
            maxLength="1"
            minLength="1"
            {...register("irstNum", {
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
  );
};

export default OTP;
