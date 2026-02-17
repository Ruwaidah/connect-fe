import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewFriend,
  cancelFriendReq,
  rejectFriendRequest,
  approveFriendRequest,
  getFriendById,
  deletingFriendUser,
  deleteFriend,
  clearFriendSearch,
} from "../../reducers/usersSlice";
import Loading from "../loading/Loading";

const FriendCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const {
    findFriend,
    getFriendLoading,
    getFriendError,
    getFriendErrorMessage,
    isDeleteUser,
  } = useSelector((state) => state.user);

  const primaryBtn =
    "mb-1 h-11 w-[96%] rounded-xl border border-sky-300/25 bg-white/[0.06] backdrop-blur-md " +
    "shadow-[0_0_0_1px_rgba(140,230,255,0.25),0_0_22px_rgba(60,170,255,0.18)] " +
    "hover:border-sky-200/50 hover:bg-white/[0.08] transition";

  const dangerBtn =
    "h-11 w-[96%] rounded-xl border border-rose-400/30 bg-rose-500/15 backdrop-blur-md " +
    "shadow-[0_0_0_1px_rgba(255,90,95,0.25),0_0_18px_rgba(255,90,95,0.18)] " +
    "hover:bg-rose-500/20 transition";



  useEffect(() => {
    if (param.friendid) dispatch(getFriendById(param.friendid));
  }, [dispatch, param.friendid]);


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

  if (getFriendLoading || !findFriend) return <Loading />;
  else if (findFriend.message)
    return (
      <div className="flex items-center">
        <p>{findFriend.message}</p>
      </div>
    );

  return (
    <div className="flex flex-col w-full text-white items-center justify-center">
      <div className="h-20 w-full text-center flex items-center justify-center">
        <div className="fixed left-2">
          <svg
            onClick={() => {
              navigate(-1)
              dispatch(clearFriendSearch())
            }}
            width="18" height="18"
            viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"><g id="SVGRepo_bgCarrier"
              strokeWidth="0"></g><g id="SVGRepo_tracerCarrier"
                strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div> <p>User Profile</p>
      </div>
      {isDeleteUser ? (
        <div className="">
          <p>Delete Friend?</p>
          <div>
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
      ) : null}
      <div className="flex flex-col w-full justify-center items-center">
        <div
          className="flex flex-col w-full justify-center items-center">
          <div className="flex flex-col">
            <div className="relative mt-2">
              <div
                className="absolute -inset-2 rounded-full blur-xl
                            bg-sky-400/20"
              />
              <div
                className="relative rounded-full p-[2px]
                          bg-gradient-to-b from-sky-300/60 via-indigo-300/20 to-white/10
                          shadow-[0_0_0_1px_rgba(140,230,255,0.35),0_0_26px_rgba(60,170,255,0.25),0_14px_40px_rgba(0,0,0,0.55)]"
              >
                <img
                  src={findFriend.image}
                  alt={`${findFriend.firstName} ${findFriend.lastName}`}
                  className="h-28 w-28 rounded-full object-cover
                              ring-1 ring-white/10"
                />
              </div>
            </div>
            <div>
              <p className="text-2xl w-full text-center mt-8">{findFriend.firstName} {findFriend.lastName}</p>
              <p className="text-xs w-full text-center">@{findFriend.username}</p>
            </div>
          </div>
        </div>
        {findFriend.friend ? (
          <div className="mt-8 w-[96%] flex flex-col gap-1">
            {/* Send Message */}
            <Link
              to={`/messages/private/${findFriend.id}`}
              className="h-11 w-full rounded-xl border border-sky-300/25
                          bg-white/[0.06] backdrop-blur-md
                          flex items-center justify-center gap-2 text-sm text-white
                          shadow-[0_0_0_1px_rgba(140,230,255,0.20),0_0_18px_rgba(60,170,255,0.14)]
                          hover:border-sky-200/45 hover:bg-white/[0.08]
                          transition">
              <svg viewBox="0 0 24 24" height="18" width="18" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 7.2C3 6.07989 3 5.51984 3.21799 5.09202C3.40973 4.71569 3.71569 4.40973 4.09202 4.21799C4.51984 4 5.0799 4 6.2 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.0799 21 7.2V20L17.6757 18.3378C17.4237 18.2118 17.2977 18.1488 17.1656 18.1044C17.0484 18.065 16.9277 18.0365 16.8052 18.0193C16.6672 18 16.5263 18 16.2446 18H6.2C5.07989 18 4.51984 18 4.09202 17.782C3.71569 17.5903 3.40973 17.2843 3.21799 16.908C3 16.4802 3 15.9201 3 14.8V7.2Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>              <span>Send Message</span>
            </Link>
            <button
              type="button"
              onClick={() => dispatch(deletingFriendUser(true))}
              className="h-11 w-full rounded-xl border border-rose-400/25
                          bg-rose-500/10 backdrop-blur-md
                          flex items-center justify-center gap-2 text-sm text-rose-100
                          shadow-[0_0_0_1px_rgba(255,90,95,0.18),0_0_16px_rgba(255,90,95,0.12)]
                          hover:bg-rose-500/15 hover:border-rose-300/45
                          transition">
              <svg fill="#ffffff" height="18" width="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,20a1,1,0,0,0,1,1h8a1,1,0,0,0,0-2H3.071A7.011,7.011,0,0,1,10,13a5.044,5.044,0,1,0-3.377-1.337A9.01,9.01,0,0,0,1,20ZM10,5A3,3,0,1,1,7,8,3,3,0,0,1,10,5Zm12.707,9.707L20.414,17l2.293,2.293a1,1,0,1,1-1.414,1.414L19,18.414l-2.293,2.293a1,1,0,0,1-1.414-1.414L17.586,17l-2.293-2.293a1,1,0,0,1,1.414-1.414L19,15.586l2.293-2.293a1,1,0,0,1,1.414,1.414Z"></path></g></svg>
              <span>Delete Friend</span>
            </button>
          </div>
        ) : findFriend.friendReq ? (
          findFriend.friendReq.userRecieveRequest === findFriend.id ? (
            <div className="flex flex-col w-full items-center">
              <p className="bg-[#20274d]/40 h-10 w-[96%] flex items-center justify-center mt-8 
                            rounded-md border border-[#20274d]/50">Friend request Sent</p>
              <button
                className="mt-1 mb-2 w-[98%] rounded-2xl border border-white/15
                            bg-white/[0.04] backdrop-blur-md p-3 text-sm
                            shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_28px_rgba(60,170,255,0.10)]"
                onClick={cancelRequest}
              >Cancel</button>
            </div>
          ) : (
            <div className="mt-10 flex flex-col rounded-2xl border border-white/15 mb-2 text-sm
                                    bg-[#20274d]/20 backdrop-blur-md w-[98%] p-4
                                    shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.08)]">
              <p className="text-white/90"><span className="text-white font-medium">@{findFriend.username}</span> sent you friend request</p>
              <div className="mt-3 flex gap-2">
                <button onClick={acceptFriendRequest}
                  className="flex-1 h-10 rounded-xl border border-sky-300/25
                              bg-white/[0.06] backdrop-blur-md text-white
                              shadow-[0_0_0_1px_rgba(140,230,255,0.20),0_0_18px_rgba(60,170,255,0.14)]
                              hover:border-sky-200/45 hover:bg-white/[0.08]
                              transition"
                >Accept</button>
                <button onClick={rejectRequest}
                  className="flex-1 h-10 rounded-xl border border-rose-400/25
                            bg-rose-500/10 backdrop-blur-md text-rose-100
                            shadow-[0_0_0_1px_rgba(255,90,95,0.18),0_0_16px_rgba(255,90,95,0.12)]
                            hover:bg-rose-500/15 hover:border-rose-300/45
                            transition"
                >Reject</button>
              </div>
            </div>
          )
        ) : (
          <div className="w-full flex flex-col items-center mt-4">
            <div onClick={sendFriendReq}
              className={primaryBtn}>
              <button className="text-sm w-full flex 
                                items-center justify-center h-full">
                <svg width="20" height="20" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" strokeWidth="3" stroke="#ffffff" fill="none"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="29.22" cy="16.28" r="11.14"></circle><path d="M41.32,35.69c-2.69-1.95-8.34-3.25-12.1-3.25h0A22.55,22.55,0,0,0,6.67,55h29.9"></path><circle cx="45.38" cy="46.92" r="11.94"></circle><line x1="45.98" y1="39.8" x2="45.98" y2="53.8"></line><line x1="38.98" y1="46.8" x2="52.98" y2="46.8"></line></g></svg>
                <span>
                  Send Friend Request
                </span>
              </button>
            </div>
            <div className={dangerBtn}>
              <button className="text-sm w-full h-full flex items-center justify-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#d94545"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                  <title>ic_fluent_block_24_filled</title> <desc>Created with Sketch.</desc> <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="ic_fluent_block_24_filled" fill="#d94545" fillRule="nonzero"> <path d="M12.0007042,2.00070416 C17.5235517,2.00070416 22.0007042,6.47785666 22.0007042,12.0007042 C22.0007042,17.5235517 17.5235517,22.0007042 12.0007042,22.0007042 C6.47785666,22.0007042 2.00070416,17.5235517 2.00070416,12.0007042 C2.00070416,6.47785666 6.47785666,2.00070416 12.0007042,2.00070416 Z M16.25,11.25 L7.75,11.25 C7.33578644,11.25 7,11.5857864 7,12 C7,12.4142136 7.33578644,12.75 7.75,12.75 L16.25,12.75 C16.6642136,12.75 17,12.4142136 17,12 C17,11.5857864 16.6642136,11.25 16.25,11.25 Z" id="🎨-Color">
                  </path> </g> </g> </g></svg>
                <span>
                  Block User
                </span>
              </button>
            </div>
          </div>
        )
          // )
        }
      </div>
      <div className="w-[96%] mt-4 h-56 rounded-2xl
                      border border-white/15 bg-white/[0.04] backdrop-blur-md
                      shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_32px_rgba(60,170,255,0.10)]
                      flex items-center justify-center"
      >
        <p className="flex flex-col justify-center items-center">
          <svg width="18" height="18" fill="#ffffff" viewBox="-2 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="m3.5 6.5v3.5h-1.5c-1.105 0-2 .895-2 2v10c0 1.105.895 2 2 2h16c1.105 0 2-.895 2-2v-10c0-1.105-.895-2-2-2h-1.5v-3.5c0-3.59-2.91-6.5-6.5-6.5s-6.5 2.91-6.5 6.5zm2.5 3.5v-3.5c0-2.209 1.791-4 4-4s4 1.791 4 4v3.5zm2 5.5c0-1.105.895-2 2-2s2 .895 2 2c0 .701-.361 1.319-.908 1.676l-.008.005s.195 1.18.415 2.57v.001c0 .414-.335.749-.749.749-.001 0-.001 0-.002 0h-1.499-.001c-.414 0-.749-.335-.749-.749v-.001l.415-2.57c-.554-.361-.916-.979-.916-1.68z"></path></g></svg>
          <span className="mt-2">Privacy Account</span>
        </p>
      </div>
    </div>
  );
};

export default FriendCard;
