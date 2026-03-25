import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFriends } from "../../reducers/usersSlice";
import FriendsList from "./FriendsList";
import SearchFriendForm from "./SearchFriendForm";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import Header from "../header/Header";

const Friends = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    user,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriends());
  }, []);


  return (
    <div className="flex flex-col h-full w-full text-white justify-start items-center">
      <Header
        title="Friends"
        showBack
        right={
          <Link
            to="/addnewfriend"
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                 grid place-items-center hover:bg-white/[0.06] transition"
            aria-label="Add friend"
            title="Add friend"
          >
            <svg viewBox="0 0 64 64" fill="none"
              width="20" height="20"
              xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_14_1995)"> <path d="M27.865 31.758C33.5972 31.758 38.244 27.1112 38.244 21.379C38.244 15.6468 33.5972 11 27.865 11C22.1328 11 17.486 15.6468 17.486 21.379C17.486 27.1112 22.1328 31.758 27.865 31.758Z" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M40 36.346C37.0313 33.3973 33.0142 31.7466 28.83 31.756H26.9C22.6831 31.756 18.6388 33.4312 15.657 36.413C12.6752 39.3948 11 43.4391 11 47.656V52.516H44.73V51.756" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M48.621 38.146V46.123" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M52.609 42.134H44.632" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g> <defs> <clipPath id="clip0_14_1995"> <rect width="45.609" height="45.516" fill="white" transform="translate(9 9)"></rect> </clipPath> </defs> </g></svg>


          </Link>
        }
      />
      {user ? (
        <>
          {" "}
          {user?.friendReq?.filter((d) => String(d.userRecieveRequest) === String(localStorage.getItem("id"))).length > 0 && (
            <Link
              to="/friend-request"
              className="w-[96%] mt-2 mb-2 group rounded-2xl border border-sky-300/20
               bg-white/[0.04] backdrop-blur-md px-4 py-3
               shadow-[0_0_0_1px_rgba(140,230,255,0.10),0_0_22px_rgba(60,170,255,0.08)]
               hover:border-sky-200/30 hover:bg-white/[0.06]
               hover:shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_30px_rgba(60,170,255,0.12)]
               transition flex items-center justify-between"
            >
              {/* Left */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-xl border border-sky-300/25 bg-sky-400/10
                      grid place-items-center
                      shadow-[0_0_18px_rgba(60,170,255,0.12)]">
                  {/* users icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-sky-200">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 8v6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M22 11h-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium truncate text-white/90">
                    Friend Requests
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    Review who wants to connect
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="min-w-6 h-6 px-2 rounded-full bg-sky-400/80 text-white text-xs
                       flex items-center justify-center
                       shadow-[0_0_18px_rgba(60,170,255,0.25)]">
                  {user.friendReq.filter((d) => String(d.userRecieveRequest) === String(localStorage.getItem("id"))).length}
                </span>

                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60 group-hover:text-white/80 transition">
                  <path d="M9 18l6-6-6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          )}
          <SearchFriendForm />
          <FriendsList />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Friends;
