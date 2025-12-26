import { useGoogleLogin } from "@react-oauth/google";



const LoginWithGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
        onError: () => console.log("Login failed"),
    });

    return <div>
        <button onClick={() => login()}>Login with Google</button>
    </div>
}
export default LoginWithGoogle