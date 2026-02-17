import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { clearChangePassword, resetPassword } from "../../../../reducers/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const InputEmailForm = (props) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, watch } = useForm({
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const { errors } = formState;
  const { isResetPasswordLoading } = useSelector((state) => state.user);

  useGSAP(() => {
    gsap.to(".InputEmailForm", { opacity: 1, duration: 0.6, ease: "power2.out" });
  }, []);

  const cancelChangePassword = () => dispatch(clearChangePassword());

  const onSubmit = (data) => {
    props.setIsResetPassword(true);
    dispatch(resetPassword(data));
  };

  const emailValue = watch("email") || "";
  const disabled = !emailValue || isResetPasswordLoading || !!errors.email;

  return (
    <div className="InputEmailForm opacity-0 w-full">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-base">Email address</h3>
        <p className="text-white/55 text-sm mt-1">
          Enter your email and we’ll send you a verification code.
        </p>
      </div>

      {isResetPasswordLoading && (
        <div className="mb-3 rounded-2xl border border-sky-300/15 bg-white/[0.04] backdrop-blur-md px-3 py-2">
          <p className="text-xs text-white/70">Sending code…</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div>
          <input
            type="email"
            placeholder="Email"
            className={`
              w-full h-12 rounded-2xl px-4
              bg-white/[0.05] text-white placeholder-white/35
              border ${errors.email ? "border-rose-400/40" : "border-white/12"}
              outline-none
              shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_18px_rgba(60,170,255,0.08)]
              focus:border-sky-300/35 focus:bg-white/[0.06]
              transition
            `}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email?.message && (
            <p className="mt-2 text-xs text-rose-300/90">{errors.email.message}</p>
          )}
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            disabled={disabled}
            className={`
              flex-1 h-11 rounded-2xl font-medium text-sm
              border transition
              ${disabled
                ? "border-white/10 bg-white/[0.03] text-white/40"
                : "border-sky-300/25 bg-sky-400/15 text-white hover:bg-sky-400/20 hover:border-sky-200/40"
              }
              shadow-[0_0_0_1px_rgba(140,230,255,0.14),0_0_18px_rgba(60,170,255,0.10)]
              active:scale-[0.99]
            `}
          >
            Submit
          </button>

          <Link
            to="/"
            onClick={cancelChangePassword}
            className="
              flex-1 h-11 rounded-2xl font-medium text-sm
              border border-white/12 bg-white/[0.04] text-white/80
              flex items-center justify-center
              hover:bg-white/[0.06] hover:text-white
              transition active:scale-[0.99]
            "
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default InputEmailForm;
