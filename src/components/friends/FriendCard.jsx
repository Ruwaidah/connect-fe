import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";

import Header from "../header/Header";
import ConfirmDialog from "./ConfirmDialog";
import Loading from "../loading/Loading";

import {
  addNewFriend,
  cancelFriendReq,
  rejectFriendRequest,
  approveFriendRequest,
  getFriendById,
  deletingFriendUser,
  deleteFriend,
  blockUser,
  unblockUser,
} from "../../reducers/usersSlice";

const FriendCard = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();

  const user = useSelector(
    (state) => state.user.user
  );

  const {
    findFriend,
    getFriendLoading,
    getFriendError,
    getFriendErrorMessage,
    isDeleteUser,
  } = useSelector((state) => state.user);

  const currentUserId =
    localStorage.getItem("id");

  useEffect(() => {
    if (friendid) {
      dispatch(
        getFriendById(friendid)
      );
    }
  }, [dispatch, friendid]);

  const sendFriendRequest = async (
    person
  ) => {
    const senderId = Number(
      localStorage.getItem("id")
    );

    const receiverId = Number(
      person?.id ||
        person?.friendId ||
        person?.userId
    );

    if (!senderId || !receiverId) {
      console.error(
        "Missing sender or receiver ID",
        {
          senderId,
          receiverId,
          person,
        }
      );

      return;
    }

    try {
      const result = await dispatch(
        addNewFriend({
          userSendRequest: senderId,
          userRecieveRequest:
            receiverId,
        })
      ).unwrap();

      socket.emit(
        "FRIEND_REQUEST_SENT",
        {
          userSendRequest: {
            id: senderId,
            firstName:
              user?.firstName || "",
            lastName:
              user?.lastName || "",
            username:
              user?.username || "",
            image: user?.image || "",
          },

          userRecieveRequest:
            receiverId,

          friendReq:
            result?.response ||
            result?.friendReq ||
            result,
        }
      );
    } catch (error) {
      console.error(
        "Unable to send friend request:",
        error
      );
    }
  };

  const acceptFriendRequest =
    async () => {
      const userAcceptingId =
        Number(currentUserId);

      const userRequestingId =
        Number(findFriend?.id);

      if (
        !userAcceptingId ||
        !userRequestingId
      ) {
        return;
      }

      try {
        await dispatch(
          approveFriendRequest({
            userRecieveRequest:
              userAcceptingId,

            userSendRequest:
              userRequestingId,

            friend: {
              bio: findFriend.bio,
              firstName:
                findFriend.firstName,
              friendId:
                findFriend.id,
              image:
                findFriend.image,
              image_id:
                findFriend.image_id,
              lastName:
                findFriend.lastName,
              public_id:
                findFriend.public_id,
              username:
                findFriend.username,
            },
          })
        ).unwrap();

        socket.emit(
          "FRIEND_REQUEST_ACCEPTED",
          {
            userAcceptingId,
            userRequestingId,

            acceptingUser: {
              id: user.id,
              friendId: user.id,
              firstName:
                user.firstName,
              lastName:
                user.lastName,
              username:
                user.username,
              bio: user.bio,
              image: user.image,
              image_id:
                user.image_id,
              public_id:
                user.public_id,
            },

            requestingUser: {
              id: findFriend.id,
              friendId:
                findFriend.id,
              firstName:
                findFriend.firstName,
              lastName:
                findFriend.lastName,
              username:
                findFriend.username,
              bio: findFriend.bio,
              image:
                findFriend.image,
              image_id:
                findFriend.image_id,
              public_id:
                findFriend.public_id,
            },
          }
        );
      } catch (error) {
        console.error(
          "Unable to accept friend request:",
          error
        );
      }
    };

  const cancelRequest = async () => {
    const userCancellingId =
      Number(currentUserId);

    const otherUserId =
      Number(findFriend?.id);

    if (
      !userCancellingId ||
      !otherUserId
    ) {
      return;
    }

    try {
      await dispatch(
        cancelFriendReq({
          userSendRequest:
            userCancellingId,

          userRecieveRequest:
            otherUserId,
        })
      ).unwrap();

      socket.emit(
        "FRIEND_REQUEST_CANCELLED",
        {
          userCancellingId,
          otherUserId,
        }
      );
    } catch (error) {
      console.error(
        "Unable to cancel friend request:",
        error
      );
    }
  };

  const rejectRequest = async () => {
    const userRejectingId =
      Number(currentUserId);

    const userRequestingId =
      Number(findFriend?.id);

    if (
      !userRejectingId ||
      !userRequestingId
    ) {
      return;
    }

    try {
      await dispatch(
        rejectFriendRequest({
          userRecieveRequest:
            userRejectingId,

          userSendRequest:
            userRequestingId,
        })
      ).unwrap();

      socket.emit(
        "FRIEND_REQUEST_REJECTED",
        {
          userRejectingId,
          userRequestingId,
        }
      );
    } catch (error) {
      console.error(
        "Unable to reject friend request:",
        error
      );
    }
  };

  const confirmDeleteFriend =
    async () => {
      const userId = Number(
        currentUserId
      );

      const friendId = Number(
        findFriend?.id
      );

      if (!userId || !friendId) {
        return;
      }

      try {
        await dispatch(
          deleteFriend(friendId)
        ).unwrap();

        socket.emit(
          "FRIEND_DELETED",
          {
            userId,
            friendId,
          }
        );

        dispatch(
          deletingFriendUser(false)
        );
      } catch (error) {
        console.error(
          "Unable to delete friend:",
          error
        );
      }
    };

  if (
    getFriendLoading ||
    !findFriend
  ) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (
    getFriendError ||
    findFriend?.message
  ) {
    return (
      <div className="min-h-[100dvh] text-white">
        <Header
          title="User Profile"
          showBack
        />

        <main className="mx-auto flex min-h-[100dvh] w-full max-w-[520px] items-center justify-center px-4 pb-[96px] pt-[78px]">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-white">
              Unable to load profile
            </h2>

            <p className="mt-2 text-sm text-white/55">
              {getFriendErrorMessage ||
                findFriend?.message ||
                "This user could not be found."}
            </p>
          </div>
        </main>
      </div>
    );
  }

  const initials =
    `${findFriend.firstName?.charAt(
      0
    ) || ""}${
      findFriend.lastName?.charAt(
        0
      ) || ""
    }` || "U";

  const isFriend = Boolean(
    findFriend.friend
  );

  const isBlocked = Boolean(
    findFriend.blocked
  );

  const friendRequest =
    findFriend.friendReq;

  const requestWasSentByMe =
    friendRequest &&
    String(
      friendRequest.userRecieveRequest
    ) === String(findFriend.id);

  const requestWasSentToMe =
    friendRequest &&
    !requestWasSentByMe;

  const handleBlockUser =
    async () => {
      const blockerId = Number(
        currentUserId
      );

      const blockedId = Number(
        findFriend?.id
      );

      if (
        !blockerId ||
        !blockedId
      ) {
        return;
      }

      try {
        if (isBlocked) {
          await dispatch(
            unblockUser({
              blockerId,
              blockedId,
            })
          ).unwrap();
        } else {
          await dispatch(
            blockUser({
              blockerId,
              blockedId,
            })
          ).unwrap();
        }
      } catch (error) {
        console.error(
          isBlocked
            ? "Unable to unblock user:"
            : "Unable to block user:",
          error
        );
      }
    };

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="User Profile"
        subtitle={
          findFriend.username
            ? `@${findFriend.username}`
            : undefined}
        showBack/>

      {isDeleteUser ? (
        <ConfirmDialog
          open={isDeleteUser}
          title="Delete friend?"
          description={`This will remove @${
            findFriend.username ||
            "this user"
          } from your friends list.`}
          confirmText="Delete"
          cancelText="Cancel"
          tone="danger"
          onCancel={() =>
            dispatch(
              deletingFriendUser(
                false
              )
            )
          }
          onConfirm={
            confirmDeleteFriend
          }
        />
      ) : null}

      <main
        className="
          mx-auto w-full max-w-[520px]
          px-4 pb-[100px] pt-[84px]">
        {/* Profile */}
        <section className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-sky-400/15 blur-3xl" />

            <div
              className="
                relative rounded-full p-[3px]
                bg-gradient-to-b
                from-sky-300/60
                via-indigo-300/20
                to-white/10
                shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_26px_rgba(60,170,255,0.16)]">
              {findFriend.image ? (
                <img
                  src={
                    findFriend.image
                  }
                  alt={`${
                    findFriend.firstName ||
                    ""
                  } ${
                    findFriend.lastName ||
                    ""
                  }`}
                  className="
                    h-28 w-28 rounded-full
                    object-cover
                    ring-1 ring-white/10"/>
              ) : (
                <div
                  className="
                    grid h-28 w-28
                    place-items-center
                    rounded-full
                    bg-white/10
                    text-2xl font-semibold
                    text-white/75
                    ring-1 ring-white/10">
                  {initials}
                </div>
              )}
            </div>
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-white">
            {findFriend.firstName}{" "}
            {findFriend.lastName}
          </h1>

          {findFriend.username ? (
            <p className="mt-1 text-sm text-sky-200/75">
              @{findFriend.username}
            </p>
          ) : null}

          {findFriend.bio ? (
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
              {findFriend.bio}
            </p>
          ) : null}
        </section>

        {/* Relationship actions */}
        <section className="mt-8">
          {isBlocked ? (
            /* BLOCKED */
            <button
              type="button"
              onClick={
                handleBlockUser
              }
              className="
                flex h-12 w-full
                items-center justify-center
                gap-2 rounded-xl
                border border-sky-300/25
                bg-sky-500/15
                text-sm font-semibold
                text-sky-100
                transition
                hover:border-sky-200/40
                hover:bg-sky-400/20
                active:scale-[0.99]">
              Unblock User
            </button>
          ) : (
            <>
              {/* FRIEND */}
              {isFriend ? (
                <div className="space-y-3">
                  <Link
                    to={`/messages/private/${findFriend.id}`}
                    className="
                      flex h-12 w-full
                      items-center justify-center
                      gap-2 rounded-xl
                      border border-sky-300/30
                      bg-sky-500/20
                      text-sm font-semibold
                      text-white
                      shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_10px_28px_rgba(40,120,255,0.18)]
                      transition
                      hover:border-sky-200/50
                      hover:bg-sky-400/25
                      active:scale-[0.99]">
                    Send Message
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        deletingFriendUser(
                          true
                        )
                      )
                    }
                    className="
                      flex h-12 w-full
                      items-center justify-center
                      gap-2 rounded-xl
                      border border-rose-400/25
                      bg-rose-500/10
                      text-sm font-medium
                      text-rose-100
                      transition
                      hover:border-rose-300/45
                      hover:bg-rose-500/15
                      active:scale-[0.99]">
                    Delete Friend
                  </button>
                </div>
              ) : requestWasSentByMe ? (
                /* REQUEST SENT */
                <div
                  className="
                    rounded-2xl
                    border border-white/10
                    bg-[#0b1220]/50
                    p-4 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-white">
                    Friend request
                    sent
                  </p>

                  <p className="mt-1 text-xs text-white/50">
                    Waiting for their
                    response.
                  </p>

                  <button
                    type="button"
                    onClick={
                      cancelRequest
                    }
                    className="
                      mt-4 h-11 w-full
                      rounded-xl
                      border border-white/10
                      bg-white/[0.03]
                      text-sm font-medium
                      text-white/65
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.06]
                      hover:text-white">
                    Cancel Request
                  </button>
                </div>
              ) : requestWasSentToMe ? (
                /* REQUEST RECEIVED */
                <div
                  className="
                    rounded-2xl
                    border border-sky-300/20
                    bg-[#0b1220]/50
                    p-4 backdrop-blur-xl">
                  <p className="text-sm text-white/75">
                    <span className="font-semibold text-white">
                      @{findFriend.username}
                    </span>{" "}
                    sent you a friend
                    request.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={
                        acceptFriendRequest
                      }
                      className="
                        h-11 rounded-xl
                        border border-sky-300/30
                        bg-sky-500/20
                        text-sm font-semibold
                        text-white
                        transition
                        hover:border-sky-200/50
                        hover:bg-sky-400/25">
                      Accept
                    </button>

                    <button
                      type="button"
                      onClick={
                        rejectRequest
                      }
                      className="
                        h-11 rounded-xl
                        border border-rose-400/25
                        bg-rose-500/10
                        text-sm font-medium
                        text-rose-100
                        transition
                        hover:border-rose-300/45
                        hover:bg-rose-500/15">
                      Reject
                    </button>
                  </div>
                </div>
              ) : (
                /* NO RELATIONSHIP */
                <button
                  type="button"
                  onClick={() =>
                    sendFriendRequest(
                      findFriend
                    )
                  }
                  className="
                    flex h-12 w-full
                    items-center justify-center
                    gap-2 rounded-xl
                    border border-sky-300/30
                    bg-sky-500/20
                    text-sm font-semibold
                    text-white
                    shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_10px_28px_rgba(40,120,255,0.18)]
                    transition
                    hover:border-sky-200/50
                    hover:bg-sky-400/25
                    active:scale-[0.99]">
                  Send Friend Request
                </button>
              )}

              {/* BLOCK */}
              <button
                type="button"
                onClick={
                  handleBlockUser
                }
                className="
                  mt-3 flex h-12 w-full
                  items-center justify-center
                  gap-2 rounded-xl
                  border border-rose-400/20
                  bg-rose-500/[0.07]
                  text-sm font-medium
                  text-rose-200/85
                  transition
                  hover:border-rose-300/35
                  hover:bg-rose-500/10
                  active:scale-[0.99]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    strokeWidth="1.6"/>

                  <path
                    d="m6.5 17.5 11-11"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                Block User
              </button>
            </>
          )}
        </section>

        {/* Private account */}
        <section
          className="
            mt-6 flex min-h-48
            items-center justify-center
            rounded-2xl
            border border-white/10
            bg-[#0b1220]/45
            p-5 text-center
            backdrop-blur-xl
            shadow-[0_8px_28px_rgba(0,0,0,0.22)]
          "
        >
          <div className="flex flex-col items-center">
            <div
              className="
                grid h-12 w-12
                place-items-center
                rounded-2xl
                border border-white/10
                bg-white/[0.04]
                text-white/55
              "
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  strokeWidth="1.6"
                />

                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <p className="mt-3 text-sm font-semibold text-white/80">
              Private Account
            </p>

            <p className="mt-1 max-w-xs text-xs leading-5 text-white/45">
              This user’s photos and
              activity are private.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FriendCard;