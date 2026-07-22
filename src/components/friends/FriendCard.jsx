import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
} from "../../reducers/usersSlice";

const FriendCard = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();

  const {
    findFriend,
    getFriendLoading,
    getFriendError,
    getFriendErrorMessage,
    isDeleteUser,
  } = useSelector((state) => state.user);

  const currentUserId = localStorage.getItem("id");

  useEffect(() => {
    if (friendid) {
      dispatch(getFriendById(friendid));
    }
  }, [dispatch, friendid]);

  const sendFriendRequest = async () => {
    if (!findFriend?.id) return;

    await dispatch(
      addNewFriend({
        userSendRequest: currentUserId,
        userRecieveRequest: findFriend.id,
      })
    );
  };

  const acceptFriendRequest = async () => {
    if (!findFriend?.id) return;

    await dispatch(
      approveFriendRequest({
        userRecieveRequest: currentUserId,
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

  const cancelRequest = async () => {
    if (!findFriend?.id) return;

    await dispatch(
      cancelFriendReq({
        userSendRequest: currentUserId,
        userRecieveRequest: findFriend.id,
      })
    );
  };

  const rejectRequest = async () => {
    if (!findFriend?.id) return;

    await dispatch(
      rejectFriendRequest({
        userRecieveRequest: currentUserId,
        userSendRequest: findFriend.id,
      })
    );
  };

  const confirmDeleteFriend = async () => {
    if (!findFriend?.id) return;

    await dispatch(deleteFriend(findFriend.id));
    dispatch(deletingFriendUser(false));
  };

  if (getFriendLoading || !findFriend) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (getFriendError || findFriend?.message) {
    return (
      <div className="min-h-[100dvh] text-white">
        <Header title="User Profile" showBack />

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
    `${findFriend.firstName?.charAt(0) || ""}${findFriend.lastName?.charAt(0) || ""
    }` || "U";

  const isFriend = Boolean(findFriend.friend);
  const friendRequest = findFriend.friendReq;

  const requestWasSentByMe =
    friendRequest &&
    String(friendRequest.userRecieveRequest) ===
    String(findFriend.id);

  const requestWasSentToMe =
    friendRequest &&
    !requestWasSentByMe;

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="User Profile"
        subtitle={
          findFriend.username
            ? `@${findFriend.username}`
            : undefined
        }
        showBack
      />

      {isDeleteUser ? (
        <ConfirmDialog
          open={isDeleteUser}
          title="Delete friend?"
          description={`This will remove @${findFriend.username || "this user"
            } from your friends list.`}
          confirmText="Delete"
          cancelText="Cancel"
          tone="danger"
          onCancel={() =>
            dispatch(deletingFriendUser(false))
          }
          onConfirm={confirmDeleteFriend}
        />
      ) : null}

      <main
        className="
          mx-auto w-full max-w-[520px]
          px-4 pb-[100px] pt-[84px]
        "
      >
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
                shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_26px_rgba(60,170,255,0.16)]
              "
            >
              {findFriend.image ? (
                <img
                  src={findFriend.image}
                  alt={`${findFriend.firstName || ""} ${findFriend.lastName || ""
                    }`}
                  className="
                    h-28 w-28 rounded-full
                    object-cover ring-1 ring-white/10
                  "
                />
              ) : (
                <div
                  className="
                    grid h-28 w-28 place-items-center
                    rounded-full bg-white/10
                    text-2xl font-semibold text-white/75
                    ring-1 ring-white/10
                  "
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-white">
            {findFriend.firstName} {findFriend.lastName}
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
          {isFriend ? (
            <div className="space-y-3">
              <Link
                to={`/messages/private/${findFriend.id}`}
                className="
                  flex h-12 w-full items-center justify-center gap-2
                  rounded-xl border border-sky-300/30
                  bg-sky-500/20
                  text-sm font-semibold text-white
                  shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_10px_28px_rgba(40,120,255,0.18)]
                  transition
                  hover:border-sky-200/50
                  hover:bg-sky-400/25
                  active:scale-[0.99]
                "
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M8 9h8M8 13h6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                Send Message
              </Link>

              <button
                type="button"
                onClick={() =>
                  dispatch(deletingFriendUser(true))
                }
                className="
                  flex h-12 w-full items-center justify-center gap-2
                  rounded-xl border border-rose-400/25
                  bg-rose-500/10
                  text-sm font-medium text-rose-100
                  transition
                  hover:border-rose-300/45
                  hover:bg-rose-500/15
                  active:scale-[0.99]
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M4 7h16"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M9 7V4h6v3"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="m6 7 1 13h10l1-13"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M10 11v5M14 11v5"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                Delete Friend
              </button>
            </div>
          ) : requestWasSentByMe ? (
            <div
              className="
                rounded-2xl border border-white/10
                bg-[#0b1220]/50 p-4
                backdrop-blur-xl
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    grid h-10 w-10 shrink-0 place-items-center
                    rounded-xl border border-sky-300/20
                    bg-sky-400/10 text-sky-200
                  "
                >
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M20 6 9 17l-5-5"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Friend request sent
                  </p>

                  <p className="mt-0.5 text-xs text-white/50">
                    Waiting for their response.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={cancelRequest}
                className="
                  mt-4 h-11 w-full rounded-xl
                  border border-white/10
                  bg-white/[0.03]
                  text-sm font-medium text-white/65
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                Cancel Request
              </button>
            </div>
          ) : requestWasSentToMe ? (
            <div
              className="
                rounded-2xl border border-sky-300/20
                bg-[#0b1220]/50 p-4
                backdrop-blur-xl
              "
            >
              <p className="text-sm text-white/75">
                <span className="font-semibold text-white">
                  @{findFriend.username}
                </span>{" "}
                sent you a friend request.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={acceptFriendRequest}
                  className="
                    h-11 rounded-xl
                    border border-sky-300/30
                    bg-sky-500/20
                    text-sm font-semibold text-white
                    transition
                    hover:border-sky-200/50
                    hover:bg-sky-400/25
                  "
                >
                  Accept
                </button>

                <button
                  type="button"
                  onClick={rejectRequest}
                  className="
                    h-11 rounded-xl
                    border border-rose-400/25
                    bg-rose-500/10
                    text-sm font-medium text-rose-100
                    transition
                    hover:border-rose-300/45
                    hover:bg-rose-500/15
                  "
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                type="button"
                onClick={sendFriendRequest}
                className="
                  flex h-12 w-full items-center justify-center gap-2
                  rounded-xl border border-sky-300/30
                  bg-sky-500/20
                  text-sm font-semibold text-white
                  shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_10px_28px_rgba(40,120,255,0.18)]
                  transition
                  hover:border-sky-200/50
                  hover:bg-sky-400/25
                  active:scale-[0.99]
                "
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    strokeWidth="1.6"
                  />

                  <path
                    d="M19 8v6M22 11h-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                Send Friend Request
              </button>

              <button
                type="button"
                className="
                  flex h-12 w-full items-center justify-center gap-2
                  rounded-xl border border-rose-400/20
                  bg-rose-500/[0.07]
                  text-sm font-medium text-rose-200/85
                  transition
                  hover:border-rose-300/35
                  hover:bg-rose-500/10
                "
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    strokeWidth="1.6"
                  />

                  <path
                    d="m6.5 17.5 11-11"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                Block User
              </button>
            </div>
          )}
        </section>

        {/* Private account */}
        <section
          className="
            mt-6 flex min-h-48 items-center justify-center
            rounded-2xl border border-white/10
            bg-[#0b1220]/45 p-5
            text-center backdrop-blur-xl
            shadow-[0_8px_28px_rgba(0,0,0,0.22)]
          "
        >
          <div className="flex flex-col items-center">
            <div
              className="
                grid h-12 w-12 place-items-center
                rounded-2xl border border-white/10
                bg-white/[0.04] text-white/55
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
              This user’s photos and activity are private.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FriendCard;