import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import NoFriends from "./NoFriends";
import Loading from "../loading/Loading";

const FriendsList = () => {
  const {
    isGetFriendsLoading,
    isStartNewChat,
    friendsList = [],
  } = useSelector((state) => state.user);

  if (isGetFriendsLoading) {
    return (
      <div className="flex min-h-[240px] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (friendsList.length === 0) {
    return <NoFriends />;
  }

  return (
    <div className="w-full pb-6">
      <div className="flex flex-col gap-2">
        {friendsList.map((friend, index) => {
          const friendId = friend.friendId || friend.id;

          const destination = isStartNewChat
            ? `/messages/private/${friendId}`
            : `/friend/profile/${friendId}`;

          const initials =
            `${friend.firstName?.charAt(0) || ""}${friend.lastName?.charAt(0) || ""
            }` || "U";

          return (
            <div
              key={friendId}
              id={`friend-${index}`}
              className="
                group flex w-full items-center gap-3
                rounded-2xl border border-white/10
                bg-[#0b1220]/50 p-3
                backdrop-blur-xl
                shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
                transition
                hover:border-sky-300/25
                hover:bg-[#142342]/65
                hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]
              "
            >
              <Link
                to={destination}
                className="flex min-w-0 flex-1 items-center gap-3"
              >
                <div className="relative shrink-0">
                  <div
                    className="
                      absolute -inset-1 rounded-full
                      bg-sky-400/20 opacity-0 blur-lg
                      transition group-hover:opacity-100
                    "
                  />

                  <div
                    className="
                      relative rounded-full p-[2px]
                      bg-gradient-to-b
                      from-sky-300/60
                      via-indigo-300/20
                      to-white/10
                    "
                  >
                    {friend.image ? (
                      <img
                        src={friend.image}
                        alt={`${friend.firstName || ""} ${friend.lastName || ""
                          }`}
                        className="
                          h-12 w-12 rounded-full
                          object-cover ring-1 ring-white/10
                        "
                      />
                    ) : (
                      <div
                        className="
                          grid h-12 w-12 place-items-center
                          rounded-full bg-white/10
                          text-sm font-semibold text-white/70
                          ring-1 ring-white/10
                        "
                      >
                        {initials}
                      </div>
                    )}
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {friend.firstName} {friend.lastName}
                  </p>

                  {friend.username ? (
                    <p className="mt-0.5 truncate text-xs text-sky-200/70">
                      @{friend.username}
                    </p>
                  ) : null}

                  <p className="mt-1 truncate text-xs text-white/45">
                    {friend.bio || "No status"}
                  </p>
                </div>
              </Link>

              {isStartNewChat ? (
                <Link
                  to={`/messages/private/${friendId}`}
                  className="
                    grid h-10 w-10 shrink-0 place-items-center
                    rounded-xl border border-sky-300/25
                    bg-sky-500/15 text-sky-100
                    shadow-[0_0_0_1px_rgba(140,230,255,0.14),0_0_18px_rgba(60,170,255,0.10)]
                    transition
                    hover:border-sky-200/45
                    hover:bg-sky-400/20
                  "
                  aria-label={`Message ${friend.firstName}`}
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
                </Link>
              ) : (
                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    to={`/messages/private/${friendId}`}
                    className="
                      grid h-10 w-10 place-items-center
                      rounded-xl border border-sky-300/25
                      bg-sky-500/15 text-sky-100
                      shadow-[0_0_0_1px_rgba(140,230,255,0.14),0_0_18px_rgba(60,170,255,0.10)]
                      transition
                      hover:border-sky-200/45
                      hover:bg-sky-400/20
                    "
                    aria-label={`Message ${friend.firstName}`}
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
                  </Link>

                  <Link
                    to={`/friend/profile/${friendId}`}
                    className="
                      grid h-10 w-10 place-items-center
                      rounded-xl border border-white/10
                      bg-white/[0.03] text-white/40
                      transition
                      hover:border-white/20
                      hover:bg-white/[0.06]
                      hover:text-white/75
                    "
                    aria-label={`Open ${friend.firstName}'s profile`}
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="m9 18 6-6-6-6"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsList;