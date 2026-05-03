import Feature from "./FeatureLoginPage";
import { Navigate } from "react-router-dom";
import LoginWithGoogle from "./LoginInWithGoogle";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {
  if (localStorage.getItem("token")) return <Navigate to="/messages" />;

  return (
    <main className="login text-white w-[80%] max-2xl:w-[96%]
                      max-xl:w-[96%]
                     h-[80vh] flex items-center">
      <div className="flex justify-center w-full items-center">
        <section className="space-y-6 w-[56%] flex flex-col max-sm:hidden">
          <div className="space-y-3">
            <h1 className="text-4xl max-xl:text-2xl
                            font-extralight leading-tight">
              Welcome to Connect
            </h1>
            <p className="text-white/80 max-w-xl text-xl max-xl:text-base">
              Login to unlock powerful features.
            </p>
          </div>
          <div className="flex w-full justify-start items-center">
            <img src="./assets/login-phone.png"
              className="w-70 h-120 max-xl:w-50 max-xl:h-100 mr-10 max-xl:mr-4 max-lg:hidden" />
            <div className="flex flex-col w-80 mt-4 max-xl:w-70">
              <Feature
                title="Fast chat"
                desc="Messages in real time."
                icon={
                  <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>lightning_fill</title> <g id="页面-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Weather" transform="translate(-49.000000, -48.000000)"> <g id="lightning_fill" transform="translate(49.000000, 48.000000)"> <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fillRule="nonzero"> </path> <path d="M8.08357,2.5998 C8.24569,2.23504 8.60741,2 9.00652,2 L16.9838,2 C17.7346,2 18.223,2.79011 17.8872,3.46169 L15.6181,8 L18.9759,8 C19.8757,8 20.3263,9.08789 19.6901,9.72418 L7.73708,21.6772 C6.98345,22.4308 5.72771,21.6546 6.06473,20.6436 L8.6126,13 L5.01541,13 C4.2845,13 3.79562,12.2477 4.09246,11.5798 L8.08357,2.5998 Z" id="路径" fill="#8c95bd"> </path> </g> </g> </g> </g></svg>}
              />
              <Feature
                title="End-To-End Encryption"
                desc="Your account stays protected"
                icon={
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M5.25 10.0546V8C5.25 4.27208 8.27208 1.25 12 1.25C15.7279 1.25 18.75 4.27208 18.75 8V10.0546C19.8648 10.1379 20.5907 10.348 21.1213 10.8787C22 11.7574 22 13.1716 22 16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H8C5.17157 22 3.75736 22 2.87868 21.1213C2 20.2426 2 18.8284 2 16C2 13.1716 2 11.7574 2.87868 10.8787C3.40931 10.348 4.13525 10.1379 5.25 10.0546ZM6.75 8C6.75 5.10051 9.10051 2.75 12 2.75C14.8995 2.75 17.25 5.10051 17.25 8V10.0036C16.867 10 16.4515 10 16 10H8C7.54849 10 7.13301 10 6.75 10.0036V8ZM12 13.25C12.4142 13.25 12.75 13.5858 12.75 14V18C12.75 18.4142 12.4142 18.75 12 18.75C11.5858 18.75 11.25 18.4142 11.25 18V14C11.25 13.5858 11.5858 13.25 12 13.25Z" fill="#8c95bd"></path> </g></svg>}
              />
              <Feature
                title="Real-time updates"
                desc="Instant sync across devices"
                icon={
                  <svg fill="#8c95bd" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5-p</title><path d="M477.64,38.26a4.75,4.75,0,0,0-3.55-3.66c-58.57-14.32-193.9,36.71-267.22,110a317,317,0,0,0-35.63,42.1c-22.61-2-45.22-.33-64.49,8.07C52.38,218.7,36.55,281.14,32.14,308a9.64,9.64,0,0,0,10.55,11.2L130,309.57a194.1,194.1,0,0,0,1.19,19.7,19.53,19.53,0,0,0,5.7,12L170.7,375a19.59,19.59,0,0,0,12,5.7,193.53,193.53,0,0,0,19.59,1.19l-9.58,87.2a9.65,9.65,0,0,0,11.2,10.55c26.81-4.3,89.36-20.13,113.15-74.5,8.4-19.27,10.12-41.77,8.18-64.27a317.66,317.66,0,0,0,42.21-35.64C441,232.05,491.74,99.74,477.64,38.26ZM294.07,217.93a48,48,0,1,1,67.86,0A47.95,47.95,0,0,1,294.07,217.93Z"></path><path d="M168.4,399.43c-5.48,5.49-14.27,7.63-24.85,9.46-23.77,4.05-44.76-16.49-40.49-40.52,1.63-9.11,6.45-21.88,9.45-24.88a4.37,4.37,0,0,0-3.65-7.45,60,60,0,0,0-35.13,17.12C50.22,376.69,48,464,48,464s87.36-2.22,110.87-25.75A59.69,59.69,0,0,0,176,403.09C176.37,398.91,171.28,396.42,168.4,399.43Z"></path></g></svg>
                }
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-900/70 rounded-3xl w-140 flex justify-start max-xl:w-120">
          <div className="mx-auto w-full lg:mx-0 rounded-3xl border border-white/10 
                          bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
            <div className="rounded-3xl p-6 max-sm:p-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-normal max-sm:text-base max-sm:mt-2">Login to Connect</h2>
                </div>
              </div>
              <LoginWithGoogle />
              <div className="my-5 max-sm:my-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-xs text-white/50">or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <LoginForm />
              <div className="mt-4 flex items-center justify-between text-sm">
                <Link
                  to="/reset-password"
                  type="button"
                  className="text-white/70 hover:text-white transition">
                  Forgot password?
                </Link>
                <Link to="/signup"
                  className="rounded-full px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 transition text-white/80">
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login