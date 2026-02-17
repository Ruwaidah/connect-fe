import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { clearChangePassword, requestNewPassword } from "../../../../reducers/usersSlice";

const NewPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const card =
    "w-[96%] max-w-sm rounded-2xl border border-sky-300/25 bg-white/[0.04] backdrop-blur-md p-5 " +
    "shadow-[0_0_0_1px_rgba(110,200,255,0.28),0_0_22px_rgba(60,160,255,0.18),inset_0_0_18px_rgba(120,220,255,0.08)]";

  const inputWrap = (hasErr) =>
    `flex items-center justify-between w-full rounded-xl px-4 py-2 border ${hasErr
      ? "border-[#ff5a5f]/60 shadow-[0_0_0_1px_rgba(255,90,95,0.6),0_0_12px_rgba(255,90,95,0.35),0_0_28px_rgba(255,90,95,0.25)]"
      : "border-sky-300/35 shadow-[0_0_0_1px_rgba(110,200,255,0.35),0_0_18px_rgba(60,160,255,0.25),inset_0_0_18px_rgba(120,220,255,0.10)]"
    } bg-white/0 backdrop-blur-xs`;

  const input =
    "flex-1 bg-transparent outline-none px-3 text-sm text-white placeholder-white/40";

  const primaryBtn =
    "mb-0 w-full rounded-xl py-2.5 text-white bg-sky-500/20 border border-sky-300/35 " +
    "shadow-[0_0_0_1px_rgba(120,220,255,0.35),0_10px_30px_rgba(40,120,255,0.20),0_0_30px_rgba(80,200,255,0.18)] " +
    "hover:bg-sky-400/25 hover:shadow-[0_0_0_1px_rgba(160,240,255,0.45),0_12px_34px_rgba(40,120,255,0.25),0_0_40px_rgba(80,200,255,0.22)] " +
    "active:scale-[0.99] transition disabled:opacity-40 disabled:cursor-not-allowed";

  const cancelChangePassword = () => {
    navigate("/")
    dispatch(clearChangePassword())
  };

  const onSubmit = (data) => {
    dispatch(
      requestNewPassword({
        password: data.newPsw,
      })
    );
  };

  const newP = watch("newPsw");
  const confirmP = watch("retypePsw");
  const notMatch = !!confirmP && newP !== confirmP;
  const disableSubmit = !isValid || notMatch;

  return (
    <div className="w-full flex justify-center px-2">
      <div className={card}>
        <h3 className="text-lg font-semibold text-white">Create new password</h3>
        <p className="text-sm text-white/60 mt-1">
          Make sure it’s strong and easy to remember.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-[#7a789a] ml-1">New Password</label>
            <div className={inputWrap(!!errors.newPsw)}>
              <input
                type="password"
                placeholder="New password"
                className={input}
                {...register("newPsw", {
                  required: "Required",
                  pattern: {
                    value: passwordPattern,
                    message:
                      "8+ chars, uppercase, lowercase, number, special (@$!%*?&)",
                  },
                })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-[#7a789a] ml-1">Confirm New Password</label>
            <div className={inputWrap(!!errors.retypePsw || notMatch)}>
              <input
                type="password"
                placeholder="Confirm password"
                className={input}
                {...register("retypePsw", {
                  required: "Required",
                  validate: (v) => v === newP || "Passwords do not match",
                })}
              />
            </div>
            {notMatch && (
              <p className="text-xs text-[#ff5a5f] pl-2">{errors.retypePsw && errors.retypePsw.message}</p>
            )}
          </div>

          <ol
            className={`list-disc list-inside text-sm rounded-xl px-4 py-3 border
            ${errors.newPsw || (errors.retypePsw && errors.retypePsw.type !== "validate")
                ? "text-[#ff5a5f] border-[#ff5a5f]/60"
                : "text-white/80 border-sky-300/25"}
            bg-white/[0.03]`}
          >
            <li className="list-none mb-2 text-white/60">Password must contain at least:</li>
            <li>One number</li>
            <li>One uppercase and one lowercase letter</li>
            <li>One special character: <span>@ $ ! % * ? &</span></li>
            <li>8 or more characters</li>
          </ol>

          <button type="submit" disabled={disableSubmit} className={primaryBtn}>
            Submit
          </button>

          <Link to="/" onClick={cancelChangePassword} className="mt-2 block w-full rounded-xl py-2.5 text-center text-white/70
                          bg-white/[0.03] border border-white/12
                          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                          hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition">
            <div className="text-center">Cancel</div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
