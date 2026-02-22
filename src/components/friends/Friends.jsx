import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFriends } from "../../reducers/usersSlice";
import FriendsList from "./FriendsList";
import SearchFriendForm from "./SearchFriendForm";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";

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
      <div className="w-full flex justify-between items-center p-2 py-4">
        <svg
          onClick={() => navigate(-1)}
          width="18" height="18"
          viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"><g id="SVGRepo_bgCarrier"
            strokeWidth="0"></g><g id="SVGRepo_tracerCarrier"
              strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        <h2
          className="text-md text-center w-[86%]">Friends
        </h2>
        <Link to="/addnewfriend">
          <svg viewBox="0 0 64 64" fill="none"
            width="20" height="20"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clipPath="url(#clip0_14_1995)"> <path d="M27.865 31.758C33.5972 31.758 38.244 27.1112 38.244 21.379C38.244 15.6468 33.5972 11 27.865 11C22.1328 11 17.486 15.6468 17.486 21.379C17.486 27.1112 22.1328 31.758 27.865 31.758Z" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M40 36.346C37.0313 33.3973 33.0142 31.7466 28.83 31.756H26.9C22.6831 31.756 18.6388 33.4312 15.657 36.413C12.6752 39.3948 11 43.4391 11 47.656V52.516H44.73V51.756" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M48.621 38.146V46.123" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M52.609 42.134H44.632" stroke="#426AB2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path> </g> <defs> <clipPath id="clip0_14_1995"> <rect width="45.609" height="45.516" fill="white" transform="translate(9 9)"></rect> </clipPath> </defs> </g></svg>
        </Link></div>
      {user ? (
        <>
          {" "}
          {user.friendReq.filter(
            (d) => d.userRecieveRequest == localStorage.getItem("id")
          ).length > 0 ? (
            <Link className="friend-request-div" to="/friend-request">
              {" "}
              <p className="friend-request-p">{`You have ${user.friendReq.filter(
                (d) => d.userRecieveRequest == localStorage.getItem("id")
              ).length
                } friends request`}</p>
            </Link>
          ) : null}{" "}
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
