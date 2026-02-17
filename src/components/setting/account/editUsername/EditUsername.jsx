import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../../loading/Loading";
import EditUsernameForm from "./EdiUsernameForm";


const EditUsername = () => {
    const navigate = useNavigate();
    const {
        user,
    } = useSelector((state) => state.user);


    return <div className="h-full flex flex-col text-white justify-start items-center w-full">

        <div className="h-20 w-full text-center flex items-center justify-center">
            <div className="fixed left-2">
                <svg
                    onClick={() => navigate(-1)}
                    width="18" height="18"
                    viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"><g id="SVGRepo_bgCarrier"
                        strokeWidth="0"></g><g id="SVGRepo_tracerCarrier"
                            strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            </div>
            <p>Edit Username</p>
        </div>
        {!user ? <Loading /> :
            <div className="h-full w-full flex flex-col justify-start items-center">
                <div className="w-30 h-30 rounded-full">
                    <img src={user.image} className="rounded-full" />
                </div>
                <div className="mt-6">
                    <p className="text-xl">{user.username}</p>
                </div>
                <EditUsernameForm />
            </div>}
    </div>
}

export default EditUsername