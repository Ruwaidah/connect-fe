import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { getFriends } from "../../reducers/usersSlice";
import Loading from "../loading/Loading";
import SearchFriendForm from "../friends/SearchFriendForm";
import Header from "../header/Header";

const StartNewChat = () => {
  const dispatch = useDispatch();

  const {
    user,
    isGetFriendsLoading,
    friendsList = [],
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="New Chat"
        subtitle="Choose a friend to start a conversation"
        showBack
        right={
          <NavLink
            to="/profile"
            className="
              block h-10 w-10 overflow-hidden
              rounded-full border border-white/10
              bg-white/10 ring-1 ring-sky-300/15
            "
          >
            {user?.image ? (
              <img
                src={user.image}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
                  grid h-full w-full place-items-center
                  text-sm font-semibold text-white/70
                "
              >
                {user?.firstName?.charAt(0) || "U"}
              </div>
            )}
          </NavLink>
        }
      >
        <SearchFriendForm />
      </Header>

      <main
        className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-3 pb-10 pt-[112px]
        "
      >
        {isGetFriendsLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : friendsList.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-[360px] text-center">
              <div className="relative mx-auto h-24 w-24">
                <div
                  className="
                    absolute -inset-5 rounded-full
                    bg-sky-400/15 blur-3xl
                  "
                />

                <img
                  src="/assets/nomessage.png"
                  alt="No friends"
                  className="
                    relative h-full w-full object-contain
                    drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]
                  "
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">
                No friends yet
              </h2>

              <p className="mt-1 text-sm text-white/60">
                Add a friend before starting a new conversation.
              </p>

              <NavLink
                to="/addnewfriend"
                className="
                  mt-6 flex h-12 w-full
                  items-center justify-center gap-2
                  rounded-2xl border border-sky-300/30
                  bg-sky-500/20
                  text-sm font-medium text-white
                  shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_12px_34px_rgba(40,120,255,0.22),0_0_30px_rgba(80,200,255,0.18)]
                  transition
                  hover:border-sky-200/45
                  hover:bg-sky-400/25
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
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M19 8v6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M22 11h-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>

                Add a Friend
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-3">
            {friendsList.map((friend) => {
              const friendId = friend.friendId || friend.id;

              return (
                <NavLink
                  key={friendId}
                  to={`/messages/private/${friendId}`}
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
                          alt={`${friend.firstName} ${friend.lastName}`}
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
                          "
                        >
                          {friend.firstName?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {friend.firstName} {friend.lastName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-white/55">
                      @{friend.username}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-white/45">
                      {friend.bio || "No status"}
                    </p>
                  </div>

                  <div
                    className="
                      grid h-9 w-9 shrink-0 place-items-center
                      rounded-xl border border-white/10
                      bg-white/[0.03] text-white/35
                      transition
                      group-hover:border-sky-300/20
                      group-hover:bg-white/[0.06]
                      group-hover:text-white/70
                    "
                  >
                    <svg
                      width="17"
                      height="17"
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
                  </div>
                </NavLink>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default StartNewChat;