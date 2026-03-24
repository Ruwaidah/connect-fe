import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { useDispatch, useSelector } from "react-redux";
import { rejectFriendRequest, approveFriendRequest } from "../../../reducers/usersSlice";
import Loading from "../../loading/Loading";

const FriendsRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isGettingUserLoading, user } = useSelector((state) => state.user);

  const acceptFriendRequest = (friend, i) => {
    gsap.to(`#request-user-card-${i}`, {
      opacity: 0,
      y: -6,
      duration: 0.35,
      ease: "power2.out",
    });

    setTimeout(() => {
      dispatch(
        approveFriendRequest({
          userRecieveRequest: user.id,
          userSendRequest: friend.userSendRequest,
          friend: {
            bio: friend.bio,
            firstName: friend.firstName,
            friendId: friend.userSendRequest,
            image: friend.image,
            image_id: friend.image_id,
            lastName: friend.lastName,
            public_id: friend.public_id,
            username: friend.username,
          },
        })
      );
    }, 250);
  };

  const rejectRequest = (friend, i) => {
    gsap.to(`#request-user-card-${i}`, {
      opacity: 0,
      y: -6,
      duration: 0.35,
      ease: "power2.out",
    });

    setTimeout(() => {
      dispatch(
        rejectFriendRequest({
          userRecieveRequest: user.id,
          userSendRequest: friend.userSendRequest,
        })
      );
    }, 250);
  };

  if (isGettingUserLoading || !user) return <Loading />;

  const incoming = (user.friendReq || []).filter((r) => r.userRecieveRequest === user.id);

  return (
    <div className="min-h-screen w-full text-white bg-[url('/assets/bg-003.png')] bg-cover bg-center">
      {/* Top bar */}
      <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="mx-auto max-w-md px-4 h-16 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                       grid place-items-center text-white/80 hover:text-white
                       hover:bg-white/[0.06] transition
                       shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
            aria-label="Back"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="min-w-0">
            <p className="font-semibold truncate">Friend Requests</p>
            <p className="text-xs text-white/55 truncate">
              {incoming.length} pending
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-md px-3 py-4 pb-24">
        {incoming.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-white/12 bg-white/[0.04] backdrop-blur-xl p-6
                          shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_10px_40px_rgba(0,0,0,0.35)]">
            <p className="text-sm text-white/80">No new friend requests right now.</p>
            <p className="text-xs text-white/50 mt-1">When someone adds you, you’ll see it here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {incoming.map((u, i) => (
              <div
                key={`${u.userSendRequest}-${i}`}
                id={`request-user-card-${i}`}
                className="rounded-3xl border border-sky-300/20 bg-white/[0.04] backdrop-blur-xl p-3
                           shadow-[0_0_0_1px_rgba(140,230,255,0.10),0_18px_60px_rgba(0,0,0,0.35)]
                           hover:border-sky-200/30 hover:bg-white/[0.06] transition"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <Link to={`/friend/profile/${u.userSendRequest}`} className="relative shrink-0">
                    <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/12" />
                    <div className="relative rounded-full p-[2px]
                                    bg-gradient-to-b from-sky-300/50 via-indigo-300/20 to-white/10
                                    shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]">
                      <img
                        src={u.image || "/assets/user.png"}
                        alt=""
                        className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                      />
                    </div>
                  </Link>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium truncate">
                      {u.firstName} {u.lastName}
                    </p>
                    <p className="text-xs text-white/55 truncate">
                      @{u.username || "user"} • sent you a friend request
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => acceptFriendRequest(u, i)}
                      className="h-9 w-9 rounded-xl border border-emerald-300/25 bg-emerald-400/10
                                 grid place-items-center text-emerald-200
                                 hover:bg-emerald-400/15 hover:border-emerald-200/35 transition"
                      aria-label="Accept"
                      title="Accept"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 6L9 17l-5-5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={() => rejectRequest(u, i)}
                      className="h-9 w-9 rounded-xl border border-rose-300/20 bg-rose-400/10
                                 grid place-items-center text-rose-200
                                 hover:bg-rose-400/15 hover:border-rose-200/30 transition"
                      aria-label="Reject"
                      title="Reject"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M18 6L6 18M6 6l12 12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* optional: small footer row */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/45">
                  <Link
                    to={`/friend/profile/${u.userSendRequest}`}
                    className="hover:text-white/70 transition"
                  >
                    View profile →
                  </Link>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1">
                    Pending
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsRequests;