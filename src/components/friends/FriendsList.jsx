import "./FriendsList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../reducers/usersSlice";
import NoFriends from "./NoFriends";
import { Link } from "react-router-dom";

const FriendsList = () => {
  const dispatch = useDispatch();
  const {
    isGetFriendsLoading,
    isGetFriendsError,
    isGetFriendsErrorMessage,
    friendsList,
  } = useSelector((state) => state.user);

  if (isGetFriendsLoading)
    return (
      <div className="Loading-div">
        <p>Loading ... </p>
      </div>
    );
  else if (friendsList.length === 0) return <NoFriends />;

  return (
    <div className="FriendsList">
      {friendsList.map((u, i) => (
        <div key={u.id} className="user-in-list">
          <div className="img-info-div">
            <img src={u.image} width="50px" />
            <div className="username-bio-div">
              <div className="username-para">
                <p>{u.firstName}</p>
                <p>{u.lastName}</p>
              </div>{" "}
              <p className="bio-para">{u.bio ? u.bio : "No Status"}</p>
            </div>
          </div>
          <div className="friend-btns">
            <Link to={`/friend/profile/${u.id}`}>View Profile</Link>
            <Link>Send Message</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
