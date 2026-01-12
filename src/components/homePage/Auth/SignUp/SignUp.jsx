import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { signUp } from "../../../../reducers/usersSlice";
import { socket } from "../../../../socket";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoginWithGoogle from "../Login/LoginInWithGoogle";
import NavBarHomePage from "../../NavBarHomePage";
import Icon from "../formInput/Icon";
import SignUpForm from "./SignUpForm";

const SignUp = (props) => {
  useGSAP(() => {
    gsap.to(".signUp", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, {});

  if (localStorage.getItem("token")) return <Navigate to="/messages" />;
  return (
    <div className="signUp opacity-0 w-[74%] h-full mb-[10vh] max-xl:w-[96%]
                    flex justify-around items-end
                    ">
      <div className="flex flex-col text-white self-center 
                      justify-center items-start w-[60%] max-md:w-[80%] max-sm:w-[98%]">
        <div className="bg-gray-900/70 rounded-3xl w-140 max-lg:w-[100%] 
                         flex flex-col justify-center">
          <div className="mx-auto w-full lg:mx-0 rounded-3xl border border-white/10 
                          bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)] pb-7">
            <h4 className="text-2xl mb-2 pl-8  max-sm:pl-3 pt-6 max-xl:text-xl">Create Your Account</h4>
            <div className="w-full rounded-3xl px-6 max-sm:px-2">
              <LoginWithGoogle />
              <div className="mt-4 mb-2 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/50">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <SignUpForm />
            </div>
            <Link to="/login" className="pl-8 pb-8">
              Already have an account?{" "}
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[36%] max-xl:w-[30%] max-md:hidden">
        <img src="./assets/signup-phone.png"
          className="w-100 h-100 max-xl:w-80" />
      </div>
    </div>
  );
};

export default SignUp;
