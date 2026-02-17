import { useSelector } from "react-redux";
import NoFriends from "./NoFriends";
import { Link } from "react-router-dom";

const FriendsList = () => {
  const {
    isGetFriendsLoading,
    isStartNewChat,
    friendsList,
  } = useSelector((state) => state.user);

  const IconInfo = ({ className = "" }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M12 12h.01M11 16h1v-4h-1"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
    </svg>
  );

  const IconMessage = ({ className = "" }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M21 12c0 4.418-4.03 8-9 8a10.5 10.5 0 0 1-3.5-.6L3 20l1.2-3.3A7.4 7.4 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );

  const IconChevronRight = ({ className = "" }) => (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M9 18l6-6-6-6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (isGetFriendsLoading)
    return (
      <div className="Loading-div">
        <p>Loading ... </p>
      </div>
    );
  else if (friendsList.length === 0) return <NoFriends />;

  return (
    <div className="w-full px-1 pb-6 mt-2">
      <div className="flex flex-col gap-3">
        {friendsList.map((u, i) => (
          <div
            key={u.id}
            id={`friend-${i}`}
            className="
          group w-full rounded-2xl border border-white/15
          bg-white/[0.04] backdrop-blur-md
          px-3 py-3
          flex items-center justify-between gap-3
          shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_22px_rgba(60,170,255,0.08)]
          hover:border-sky-200/30 hover:bg-white/[0.06]
          hover:shadow-[0_0_0_1px_rgba(140,230,255,0.22),0_0_30px_rgba(60,170,255,0.14)]
          transition
        "
          >
            {/* Left: Avatar + info */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/15 opacity-0 group-hover:opacity-100 transition" />
                <div
                  className="
                relative rounded-full p-[2px]
                bg-gradient-to-b from-sky-300/50 via-indigo-300/20 to-white/10
                shadow-[0_0_0_1px_rgba(140,230,255,0.20),0_0_18px_rgba(60,170,255,0.12)]
              "
                >
                  <img
                    src={u.image}
                    alt={`${u.firstName} ${u.lastName}`}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                  />
                </div>
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {u.firstName} {u.lastName}
                </p>
                <p className="text-xs text-white/60 truncate">
                  {u.bio ? u.bio : "No Status"}
                </p>
              </div>
            </div>

            {/* Right: buttons */}
            <div className="flex items-center gap-2 shrink-0">
              {!isStartNewChat && (
                <Link
                  to={`/friend/profile/${u.friendId}`}
                  className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                              flex items-center justify-center text-white/80
                              shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                              hover:border-sky-200/25 hover:bg-white/[0.06] hover:text-white
                              transition"
                  title="Profile"
                >
                  <IconInfo className="opacity-90" />
                </Link>
              )}

              <Link
                to={`/messages/private/${u.friendId}`}
                className="h-10 w-10 rounded-xl border border-sky-300/25 bg-white/[0.06]
                          flex items-center justify-center text-white
                          shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]
                          hover:border-sky-200/45 hover:bg-white/[0.08]
                          transition"
                title="Message"
              >
                <IconMessage className="opacity-95" />
              </Link>

              <Link
                to={`/friend/profile/${u.friendId}`}
                className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.02]
                          flex items-center justify-center text-white/70
                          group-hover:text-white/90 transition"
                title="Open"
              >
                <IconChevronRight />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default FriendsList;
