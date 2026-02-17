import { Link, Navigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoginWithGoogle from "../Login/LoginInWithGoogle";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  useGSAP(() => {
    gsap.to(".signUp", { opacity: 1, duration: 0.9, ease: "power2.out" });
  });

  if (localStorage.getItem("token")) return <Navigate to="/messages" />;

  return (
    <div className="signUp opacity-0 w-full overflow-hidden flex items-start pt-6 justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                          shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="px-7 pt-4">
            <h4 className="text-xl text-white">Create Your Account</h4>
            <p className="text-sm text-white/55 mt-1">
              Join and start messaging in seconds.
            </p>
          </div>
          <div className="px-7 pt-2 pb-7">
            <LoginWithGoogle />
            <div className="mt-5 mb-3 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-white/50">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            <SignUpForm />
            <Link
              to="/login"
              className="mt-5 inline-flex text-sm text-white/70 hover:text-white transition"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-[420px] items-center justify-center">
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-sky-400/10 blur-3xl" />
          <img
            src="./assets/signup-phone.png"
            alt="Sign up phone preview"
            className="relative w-[360px] h-auto drop-shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
