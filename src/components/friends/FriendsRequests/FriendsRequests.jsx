import { useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../socket";

import {
  approveFriendRequest,
  rejectFriendRequest,
} from "../../../reducers/usersSlice";

import Header from "../../header/Header";
import Loading from "../../loading/Loading";
const FriendsRequests = () => {
  const dispatch = useDispatch();
  const [processingId, setProcessingId] = useState(null);

  const {
    isGettingUserLoading,
    isLoading,
    user,
  } = useSelector((state) => state.user);

  const incoming = (user?.friendReq || []).filter(
    (request) =>
      Number(request.userRecieveRequest) ===
      Number(user?.id)
  );

  console.log(incoming)

  const animateAndRemove = async (
    elementId,
    requestId,
    action,
    onSuccess
  ) => {
    if (processingId) return;

    setProcessingId(requestId);

    try {
      await dispatch(action).unwrap();

      onSuccess?.();

      await new Promise((resolve) => {
        gsap.to(`#${elementId}`, {
          opacity: 0,
          y: -8,
          height: 0,
          marginBottom: 0,
          paddingTop: 0,
          paddingBottom: 0,
          duration: 0.35,
          ease: "power2.out",
          onComplete: resolve,
        });
      });
    } catch (error) {
      console.error("Friend request action failed:", error);

      gsap.set(`#${elementId}`, {
        clearProps: "all",
      });
    } finally {
      setProcessingId(null);
    }
  };

  const acceptFriendRequest = (friend, index) => {
    const requestId = Number(friend.userSendRequest);
    const userAcceptingId = Number(user.id);
    const elementId = `request-user-card-${index}`;

    animateAndRemove(
      elementId,
      requestId,
      approveFriendRequest({
        userRecieveRequest: userAcceptingId,
        userSendRequest: requestId,
        friend: {
          bio: friend.bio,
          firstName: friend.firstName,
          friendId: requestId,
          image: friend.image,
          image_id: friend.image_id,
          lastName: friend.lastName,
          public_id: friend.public_id,
          username: friend.username,
        },
      }),
      () => {
        socket.emit("FRIEND_REQUEST_ACCEPTED", {
          userAcceptingId,
          userRequestingId: requestId,

          acceptingUser: {
            id: user.id,
            friendId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            bio: user.bio,
            image: user.image,
            image_id: user.image_id,
            public_id: user.public_id,
          },

          requestingUser: {
            id: requestId,
            friendId: requestId,
            firstName: friend.firstName,
            lastName: friend.lastName,
            username: friend.username,
            bio: friend.bio,
            image: friend.image,
            image_id: friend.image_id,
            public_id: friend.public_id,
          },
        });
      }
    );
  };

  const rejectRequest = (friend, index) => {
    const requestId = Number(friend.userSendRequest);
    const userRejectingId = Number(user.id);
    const elementId = `request-user-card-${index}`;

    animateAndRemove(
      elementId,
      requestId,
      rejectFriendRequest({
        userRecieveRequest: userRejectingId,
        userSendRequest: requestId,
      }),
      () => {
        console.log("EMITTING FRIEND REQUEST REJECTED", {
          userRejectingId,
          userRequestingId: requestId,
        });

        socket.emit("FRIEND_REQUEST_REJECTED", {
          userRejectingId,
          userRequestingId: requestId,
        });
      }
    );
  };

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Friend Requests"
        subtitle={
          incoming.length === 1
            ? "1 pending request"
            : `${incoming.length} pending requests`
        }
        showBack
      />
      <main
        className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-3 pb-[100px] pt-[76px]">

        {isGettingUserLoading || !user ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : incoming.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-[360px] text-center">
              <div
                className="
                  relative mx-auto grid h-20 w-20
                  place-items-center rounded-full
                  border border-white/10
                  bg-white/[0.04]">

                <div
                  className="
                    absolute -inset-5 rounded-full
                    bg-sky-400/10 blur-3xl"
                />

                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="relative text-sky-200/65"
                  aria-hidden="true">

                  <path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                    strokeWidth="1.6"
                  />

                  <path
                    d="M19 8v6M22 11h-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                No friend requests
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/50">
                When someone sends you a friend request, it will
                appear here.
              </p>

              <Link
                to="/addnewfriend"
                className="
                  mt-5 inline-flex h-11 items-center
                  justify-center rounded-xl
                  border border-sky-300/25
                  bg-sky-500/15 px-5
                  text-sm font-semibold
                  transition
                  hover:border-sky-300/40
                  hover:bg-sky-400/20">
                Find Friends
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {incoming.map((friend, index) => {
              const requestId = friend.userSendRequest;
              const isProcessing =
                processingId === requestId || isLoading;

              const fullName =
                `${friend.firstName || ""} ${friend.lastName || ""
                  }`.trim();

              const initials =
                `${friend.firstName?.charAt(0) || ""}${friend.lastName?.charAt(0) || ""
                }` || "U";

              return (
                <article
                  key={requestId}
                  id={`request-user-card-${index}`}
                  className="
                    overflow-hidden rounded-2xl
                    border border-sky-300/15
                    bg-[#0b1220]/50 p-3
                    shadow-[0_12px_32px_rgba(0,0,0,0.25)]
                    backdrop-blur-xl
                    transition
                    hover:border-sky-300/25
                    hover:bg-[#142342]/55">

                  <div className="flex items-center gap-3">
                    <Link
                      to={`/friend/profile/${requestId}`}
                      aria-label={`Open ${fullName}'s profile`}
                      className="relative shrink-0">
                      <div
                        className="
                          absolute -inset-2 rounded-full
                          bg-sky-400/10 blur-xl"/>

                      <div
                        className="
                          relative rounded-full p-[2px]
                          bg-gradient-to-b
                          from-sky-300/50
                          via-indigo-300/20
                          to-white/10">
                        {friend.image ? (
                          <img
                            src={friend.image}
                            alt={fullName}
                            className="
                              h-12 w-12 rounded-full
                              object-cover ring-1 ring-white/10"
                          />
                        ) : (
                          <div
                            className="
                              grid h-12 w-12 place-items-center
                              rounded-full bg-white/10
                              text-sm font-semibold text-white/65
                              ring-1 ring-white/10">
                            {initials}
                          </div>
                        )}
                      </div>
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/friend/profile/${requestId}`}
                        className="
                          block truncate text-sm
                          font-semibold text-white
                          transition hover:text-sky-200">
                        {fullName}
                      </Link>

                      <p className="mt-0.5 truncate text-xs text-sky-200/65">
                        @{friend.username || "user"}
                      </p>

                      <p className="mt-1 text-xs text-white/45">
                        Sent you a friend request
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          acceptFriendRequest(friend, index)
                        }
                        disabled={isProcessing}
                        className="
                          grid h-10 w-10 place-items-center
                          rounded-xl border
                          border-emerald-300/25
                          bg-emerald-400/10
                          text-emerald-200
                          transition
                          hover:border-emerald-200/40
                          hover:bg-emerald-400/15
                          active:scale-[0.96]
                          disabled:cursor-not-allowed
                          disabled:opacity-40"
                        aria-label={`Accept ${fullName}'s friend request`}
                        title="Accept">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true">
                          <path
                            d="m20 6-11 11-5-5"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          rejectRequest(friend, index)
                        }
                        disabled={isProcessing}
                        className="
                          grid h-10 w-10 place-items-center
                          rounded-xl border
                          border-rose-300/20
                          bg-rose-400/10
                          text-rose-200
                          transition
                          hover:border-rose-200/35
                          hover:bg-rose-400/15
                          active:scale-[0.96]
                          disabled:cursor-not-allowed
                          disabled:opacity-40"
                        aria-label={`Reject ${fullName}'s friend request`}
                        title="Reject">

                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            d="M18 6 6 18M6 6l12 12"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div
                    className="
                      mt-3 flex items-center
                      justify-between border-t
                      border-white/[0.07] pt-3
                      text-[11px]">
                    <Link
                      to={`/friend/profile/${requestId}`}
                      className="
                        text-white/45 transition
                        hover:text-white/75
                      "
                    >
                      View profile
                    </Link>

                    <span
                      className="
                        rounded-full border
                        border-amber-300/15
                        bg-amber-400/[0.08]
                        px-2 py-1 text-amber-100/65
                      "
                    >
                      Pending
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default FriendsRequests;