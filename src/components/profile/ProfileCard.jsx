import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

const ProfileCard = () => {
  const navigate = useNavigate()
  const {
    isGettingUserLoading,
    user,
  } = useSelector((state) => state.user);


  if (isGettingUserLoading || !user)
    return (
      <Loading />
    );
  else
    return (
      <div className="h-full flex flex-col text-white justify-start items-center w-full">
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
          <p>Profile</p>
        </div>
        <div className="h-30 w-30 flex justify-center items-center p-1 rounded-full border border-[#4555ad]/90">
          <img src={user.image}
            className="rounded-full w-full h-full" />
        </div>
        <div className="w-full flex flex-col items-center justify-center h-26">
          <h2 className="font-bold text-2xl">{user.firstName} {user.lastName}</h2>
          <div className="w-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <rect x="3" y="5" width="18" height="14" rx="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round"></rect> </g></svg>
            <p className="ml-1 text-sm">{user.email}</p>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div
            className="bg-[#20274d]/70 h-16 flex items-center my-1 
                       justify-center w-full rounded-md border border-[#20274d]/50">
            <NavLink
              to="/edit-profile"
              className="w-full h-full flex justify-center items-center"
            >
              <svg width="18" height="18" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2,21H8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20,1,1,0,0,0,2,21ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5ZM20.207,9.293a1,1,0,0,0-1.414,0l-6.25,6.25a1.011,1.011,0,0,0-.241.391l-1.25,3.75A1,1,0,0,0,12,21a1.014,1.014,0,0,0,.316-.051l3.75-1.25a1,1,0,0,0,.391-.242l6.25-6.25a1,1,0,0,0,0-1.414Zm-5,8.583-1.629.543.543-1.629L19.5,11.414,20.586,12.5Z"></path></g></svg>
              <span className="ml-2 text-sm">Edit Profile</span>
            </NavLink>
          </div>
          <div className="flex justify-between">
            <div
              className="bg-[#20274d]/70 h-16 flex items-center 
                         w-[49%] my-1 rounded-md border border-[#20274d]/50">
              <NavLink
                className="w-full h-full flex items-center justify-center"
                to="/friends">
                <svg width="18" height="18" fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 96.979 96.979" xmlSpace="preserve" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M59.07,46.021L59.07,46.021c4.576-3.373,7.31-8.754,7.31-14.393c0-9.863-8.025-17.889-17.89-17.889 c-9.864,0-17.889,8.025-17.889,17.889c0,5.717,2.66,10.959,7.297,14.385c-18.244,6.451-21.092,28.71-21.531,35.378 c-0.031,0.479,0.137,0.949,0.465,1.3c0.328,0.35,0.785,0.549,1.264,0.549h60.788c0.479,0,0.938-0.199,1.266-0.549 c0.328-0.351,0.496-0.82,0.465-1.3C80.175,74.736,77.32,52.511,59.07,46.021z"></path> <path d="M82.761,46.861c3.02-2.227,4.821-5.779,4.821-9.502c0-6.508-5.297-11.805-11.807-11.805c-1.867,0-3.627,0.447-5.199,1.223 c0.345,1.564,0.529,3.184,0.529,4.852c0,4.68-1.484,9.219-4.137,12.988c10.448,6.572,14.981,18.07,16.944,26.81h11.923 c0.315,0,0.618-0.131,0.836-0.361c0.215-0.23,0.325-0.541,0.305-0.857C96.688,65.812,94.805,51.144,82.761,46.861z"></path> <path d="M29.976,44.617c-2.654-3.748-4.104-8.238-4.104-12.988c0-1.668,0.188-3.287,0.531-4.852 c-1.572-0.775-3.332-1.223-5.199-1.223c-6.51,0-11.807,5.297-11.807,11.805c0,3.775,1.754,7.236,4.816,9.496 C2.172,51.113,0.291,65.806,0.002,70.207c-0.021,0.316,0.09,0.627,0.307,0.857c0.217,0.229,0.52,0.36,0.836,0.36H13.06 C15.019,62.685,19.543,51.179,29.976,44.617z"></path> </g> </g> </g></svg>
                <span className="ml-2 text-sm"> Friends</span>
              </NavLink>
            </div>
            <div
              className="bg-[#20274d]/70 h-16 flex items-center
                        w-[49%] my-1 rounded-md border border-[#20274d]/50">
              <NavLink
                className="w-full h-full flex items-center justify-center"
                to="/messages">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                <span className="ml-2 text-sm">Messages</span>
              </NavLink>
            </div>
          </div>
          <div className="bg-[#20274d]/70 p-3 w-full flex flex-col items-start
                        w-[49%] my-1 rounded-md border border-[#20274d]/50">
            <div className="h-10 flex items-center">
              <p>Photos</p>
            </div>
            <div className="flex justify-between w-full">
              <img width="49%" height="100" src="../../assets/messaging.avif" />
              <img width="49%" height="100" src="../../assets/message02.avif" />
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProfileCard;
