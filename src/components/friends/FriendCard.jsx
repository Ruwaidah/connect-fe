import "./FriendCard.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewFriend,
  cancelFriendReq,
  rejectFriendRequest,
  approveFriendRequest,
  getFriendById,
} from "../../reducers/usersSlice";
import Loading from "../loading/Loading";

const FriendCard = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const {
    findFriend,
    findFriendLoading,
    findFriendError,
    findFriendErrorMessage,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (param.friendid) dispatch(getFriendById(param.friendid));
  }, []);

  // ************************************* SEND FRIEND REQUEST *************************************
  const sendFriendReq = () => {
    dispatch(
      addNewFriend({
        userSendRequest: localStorage.getItem("id"),
        userRecieveRequest: findFriend.id,
      })
    );
  };

  // ************************** APPROVE FRIEND REQUEST ******************************
  const acceptFriendRequest = () => {
    dispatch(
      approveFriendRequest({
        userRecieveRequest: localStorage.getItem("id"),
        userSendRequest: findFriend.id,
        friend: {
          bio: findFriend.bio,
          firstName: findFriend.firstName,
          friendId: findFriend.id,
          image: findFriend.image,
          image_id: findFriend.image_id,
          lastName: findFriend.lastName,
          public_id: findFriend.public_id,
          username: findFriend.username,
        },
      })
    );
  };

  // ************************** CANCEL FRIEND REQUEST ******************************
  const cancelRequest = () => {
    dispatch(
      cancelFriendReq({
        userSendRequest: localStorage.getItem("id"),
        userRecieveRequest: findFriend.id,
      })
    );
  };

  // ************************** REJECT FRIEND REQUEST ******************************
  const rejectRequest = () => {
    dispatch(
      rejectFriendRequest({
        userRecieveRequest: localStorage.getItem("id"),
        userSendRequest: findFriend.id,
      })
    );
  };
  if (findFriendLoading || !findFriend) return <Loading />;
  else if (findFriend.message)
    return (
      <div className="FriendCard-no-match">
        <p>{findFriend.message}</p>
      </div>
    );
  return (
    <div className="FriendCard">
      <div className="user-info-img-div">
        <div className="img-username-div">
          <img src={findFriend.image} />
          <p id="username-para">@{findFriend.username}</p>
        </div>
        <div className="user-info-div">
          <div>
            <p>{findFriend.firstName}</p>
            <p>{findFriend.lastName}</p>
          </div>
          <p id="para-bio">{findFriend.bio ? findFriend.bio : "No Status"}</p>
        </div>
      </div>
      {
        findFriend.friend ? (
          <div className="btns-request sendmsg">
            <img src="./assets/text.png" />
            <Link to={`/messages/${findFriend.id}`}>Send Message</Link>
          </div>
        ) : findFriend.friendReq ? (
          findFriend.friendReq.userRecieveRequest === findFriend.id ? (
            <div className="btns-request">
              <button onClick={cancelRequest}>Cancel Friend Request</button>
            </div>
          ) : (
            <div className="btns-request">
              <p>{findFriend.username} sent you friend request</p>
              <button onClick={acceptFriendRequest}>Accept</button>
              <button onClick={rejectRequest}>Reject</button>
            </div>
          )
        ) : (
          <div className="btns-request" onClick={sendFriendReq}>
            <img src="./assets/adding-user.png" />
            <button onClick={sendFriendReq}>Send Friend Request</button>
          </div>
        )
        // )
      }
    </div>
  );
};

export default FriendCard;
