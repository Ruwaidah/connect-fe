import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { clearEditCancel } from "../../reducers/usersSlice";


const AccountSetting = () => {
  const navigate = useNavigate();
  const {
    user,
  } = useSelector((state) => state.user);


  return <div className="flex flex-col w-full text-white items-center justify-center">
    <div className="h-20 w-full text-center flex flex-col items-center justify-center">
      <div className="flex items-center h-6">
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
        <p>Account</p>
      </div>
      <p className="text-xs text-[#7a789a]">Manage your profile and credentials</p>
    </div>
    {!user ? <Loading /> :
      <div className="flex flex-col w-[98%] mt-10">
        <Link className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50"
          to="/setting/editusername">
          <div className="flex items-center">
            <img className="w-5 h-5"
              src="../../assets/profile-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <p className="text-sm">Username</p>
              <p className="text-xs text-[#7a789a]">{user.username}</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </Link>
        <Link className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50"
          to="/setting/editemail">
          <div className="flex items-center">
            <img className="w-6 h-5"
              src="../../assets/email-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <p className="text-sm">Email</p>
              <p className="text-xs text-[#7a789a]">{user.email}</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </Link>
        <Link className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50"
          to="/setting/editpassword"
          onClick={() => clearEditCancel()}>
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="../../assets/lock-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <p className="text-sm">Password</p>
              <p className="text-xs text-[#7a789a]">**********</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </Link>

        <Link className="h-14 flex items-center mb-1 
        bg-[#f35353]/20 rounded-md border border-[#f35353]/20
                       justify-between w-full pl-2"
          to="/setting/account">
          <div className="flex items-center">
            <img className="w-5 h-5"
              src="../../assets/delete-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <p className="text-sm text-[#c77f8f]">Delete Account</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </Link>
      </div>}
  </div>;
};

export default AccountSetting;
