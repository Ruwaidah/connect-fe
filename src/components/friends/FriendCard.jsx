// import "./FriendCard.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewFriend,
  cancelFriendReq,
  rejectFriendRequest,
  approveFriendRequest,
  getFriendById,
  deletingFriendUser,
  deleteFriend,
} from "../../reducers/usersSlice";
import Loading from "../loading/Loading";

const FriendCard = () => {
  const dispatch = useDispatch();
  const [userSentReq, setUserSentReq] = useState(false);
  const param = useParams();
  const {
    findFriend,
    findFriendLoading,
    findFriendError,
    findFriendErrorMessage,
    isDeleteUser,
  } = useSelector((state) => state.user);

  useEffect(() => {
    if (param.friendid) dispatch(getFriendById(param.friendid));
  }, []);

  // ************************************* SEND FRIEND REQUEST *************************************
  const sendFriendReq = () => {
    return dispatch(
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

  // ************************** DELETE FRIEND  ******************************
  const deletingUser = () => {
    dispatch(deleteFriend(findFriend.id));
    dispatch(deletingFriendUser(false));
  };

  if (findFriendLoading || !findFriend) return <Loading />;
  else if (findFriend.message)
    return (
      <div className="FriendCard-no-match">
        <p>{findFriend.message}</p>
      </div>
    );

    console.log(findFriend)
  return (
    <div className="FriendCard">
      {isDeleteUser ? (
        <div className="delete-big-div">
          <div className="delete-div-out">
            <div className="delete-div-in">
              <p>Delete Friend?</p>
              <div className="delete-btns-div">
                <div onClick={deletingUser}>
                  <img src="./assets/yes.png" />
                  <button>Yes</button>
                </div>
                <div onClick={() => dispatch(deletingFriendUser(false))}>
                  {" "}
                  <img src="./assets/no.png" />
                  <button>No</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={
          isDeleteUser ? "blur-div user-info-img-div" : "user-info-img-div"
        }
      >
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
          <div
            className={
              isDeleteUser
                ? "btns-request sendmsg blur-div"
                : "btns-request sendmsg"
            }
          >
            <div>
              <img src="./assets/text.png" />
              <Link to={`/messages/${findFriend.id}`}>Send Message</Link>
            </div>{" "}
            <div
              className="delete-friend-div"
              onClick={() => dispatch(deletingFriendUser(true))}
            >
              <img src="./assets/delete-friend.png" />
              <p>Delete Friend</p>
            </div>
          </div>
        ) : findFriend.friendReq ? (
          findFriend.friendReq.userRecieveRequest === findFriend.id ? (
            <div className="btns-request">
              <div className="request-sent">
                <p>Sent Friend request !</p>
                <div>
                  <img src="./assets/no.png" />
                  <button onClick={cancelRequest}>Cancel</button>
                </div>{" "}
              </div>{" "}
            </div>
          ) : (
            <div className="btns-request">
              <p>{findFriend.username} sent you friend request</p>
              <button onClick={acceptFriendRequest}>Accept</button>
              <button onClick={rejectRequest}>Reject</button>
            </div>
          )
        ) : (
          <div className="btns-request" onClick={() => sendFriendReq()}>
            <div>
              <img src="./assets/adding-user.png" />
              <button>Send Friend Request</button>
            </div>
          </div>
        )
        // )
      }
    </div>
  );
};

export default FriendCard;
