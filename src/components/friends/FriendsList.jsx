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
    isStartNewChat,
    friendsList,
  } = useSelector((state) => state.user);

  console.log(friendsList);

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
        <div key={u.id} className="user-in-list" id={`friend-${i}`}>
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
          {isStartNewChat ? null : (
            <div className="friend-btns">
              <Link to={`/friend/profile/${u.friendId}`}>
                <img src="../src/assets/friend-info.png" />
              </Link>
              <Link to={`/messages/${u.friendId}`}>
                <img src="../src/assets/text.png" />
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
