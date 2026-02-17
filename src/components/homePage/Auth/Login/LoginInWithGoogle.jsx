import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../../../reducers/usersSlice";
import { useDispatch } from "react-redux";

const LoginWithGoogle = () => {
  const dispatch = useDispatch()
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => dispatch(loginWithGoogle(tokenResponse)),
    onError: () => console.log("Login failed"),
  });

  return <button
    className="mt-5 max-sm:mt-4 w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition px-4 py-3 flex items-center justify-center gap-3"
    type="button"
    onClick={() => login()}
  >
    <span className="h-6 w-6 grid place-items-center rounded-md bg-white/5 border border-white/10">
      <svg width="16" height="16" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.1-.1-2.3-.4-3.5Z" />
        <path fill="#FF3D00" d="M6.3 14.7 12.9 19.5C14.7 15.1 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7Z" />
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.9 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.5 5C9.5 39.8 16.2 44 24 44Z" />
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1 2.8-3 5.1-5.7 6.6l.1.1 6.2 5.2C39.6 36.5 44 31.1 44 24c0-1.1-.1-2.3-.4-3.5Z" />
      </svg>
    </span>
    <span className="text-sm font-medium text-white">Continue with Google</span>
  </button>
}
export default LoginWithGoogle