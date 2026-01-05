import { useGoogleLogin } from "@react-oauth/google";



const LoginWithGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
        onError: () => console.log("Login failed"),
    });

    return <div className="w-full 
                            border-b border-gray-400 pb-4 mb-4 
                            flex justify-center"
    >
        <button
            className="flex justify-center items-center py-2
                            bg-neutral-300  rounded-md  cursor-pointer
                         w-full cursor-pointer"
            onClick={() => login()}
        >
            <img
                className="msg-04 w-8 h-6 pr-2"
                src="./assets/google-icon.png" />
            Login with Google</button>
    </div>
}
export default LoginWithGoogle