// import "./InputEmailForm.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clearChangePassword } from "../../../../reducers/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { resetPassword } from "../../../../reducers/usersSlice";

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

  console.log(watch("email") === "", isResetPasswordLoading)
  return (
    <div className="InputEmailForm w-160 h-64 flex
                    flex-col opacity-0 bg-gray-200
                     text-zinc-900 rounded-sm shadow-xl border border-gray-300
                      p-10 px-20">
      <div className="para-1">
        <h3 className="font-bold mb-1 text-blue-700">
          Reset Your Password
        </h3>
        <p>
          Enter your Email below, and we'll email you instructions to reset
          your password.
        </p>
      </div>
      <div className="loading-reset-password">
        {isResetPasswordLoading ? <p className="text-green-600">Loading ... </p> : null}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-2">
        <input
          type="email"
          placeholder="Email"
          className={`${errors && errors.email ? "error-input" : null} 
                      h-10 bg-white text-black pl-2 w-full rounded-sm`}
          {...register("email", {
            required: true,
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "invalid email",
            },
          })}
        />
        <div className="flex justify-around mt-4">
          <input
            type="submit"
            className={`w-40 h-8 flex justify-center
                       items-center bg-blue-300 rounded-sm 
                       ${watch("email") === "" || isResetPasswordLoading ? 'bg-gray-300' :
                errors.email ? 'border b-red-300' : 'bg-blue-300'
              }`}
            id={
              watch("email") === "" || isResetPasswordLoading
                ? "disabled"
                : null
            }
            disabled={
              watch("email") === "" || isResetPasswordLoading ? "disabled" : ""}
            value="Submit"
          />
          <Link to="/" onClick={cancelChangePassword}
            className="bg-blue-300 w-40 h-8 flex justify-center
                           items-center text-zinc-900 rounded-sm">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default InputEmailForm;
