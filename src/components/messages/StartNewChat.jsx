import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../reducers/usersSlice";
import Loading from "../loading/Loading";
import { NavLink } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";
import Header from "../header/Header";

const StartNewChat = () => {
  const dispatch = useDispatch();
  const { user, isGetFriendsLoading, friendsList, findFriend } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  if (isGetFriendsLoading) return <Loading />;
  console.log(friendsList)

  return (
    <div className="w-full h-full text-white flex flex-col">
      <Header
        title="New Chat"
        subtitle="Pick a friend to start"
        showBack
        right={
          <NavLink to="/profile" className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/10">
            {user?.image ? (
              <img
                className="w-full h-full object-cover"
                src={user.image}
                alt="Profile"
              />
            ) : null}
          </NavLink>
        }>
        <SearchFriendForm />
      </Header>

      <div className="mx-auto w-full max-w-md px-4 pt-4 pb-24 flex-1">
        {friendsList?.length < 1 ? (
          <div className="mt-10 w-full flex items-center justify-center">
            <div className="w-full max-w-[360px] text-center">
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute -inset-4 rounded-full blur-2xl bg-sky-400/15" />
                <img
                  src="/assets/nomessage.png"
                  alt="No friends"
                  className="relative w-24 h-24 object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
                />
              </div>

              <h2 className="mt-4 text-lg font-semibold text-white/90">
                No friends found
              </h2>
              <p className="mt-1 text-xs text-white/60">
                Invite friends to start chatting.
              </p>

              <NavLink
                to="/addnewfriend"
                className="mt-5 mx-auto h-11 w-full max-w-[260px] rounded-2xl
                  flex items-center justify-center gap-2
                  bg-sky-500/20 border border-sky-300/30
                  text-white text-sm font-medium
                  shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_12px_34px_rgba(40,120,255,0.22),0_0_30px_rgba(80,200,255,0.18)]
                  hover:bg-sky-400/25 hover:border-sky-200/45
                  active:scale-[0.99] transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 8v6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 11h-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Invite Friends
              </NavLink>
            </div>
          </div>
        ) :
          < div className="mt-4 flex flex-col gap-2">
            {friendsList.map((f) => (
              <NavLink
                key={f.friendId}
                to={`/messages/private/${f.friendId}`}
                className="group w-full rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-xl
                 px-3 py-3 flex items-center gap-3
                 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_60px_rgba(0,0,0,0.25)]
                 hover:border-sky-200/30 hover:bg-white/[0.06]
                 transition"
              >
                <div className="relative shrink-0">
                  <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/10 opacity-0 group-hover:opacity-100 transition" />
                  {f.image ? (
                    <img
                      src={f.image}
                      alt=""
                      className="relative h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                    />
                  ) : (
                    <div className="relative h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/10" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white/90 truncate">
                    {f.firstName} {f.lastName}
                  </p>
                  <p className="text-xs text-white/55 truncate">@{f.username}</p>
                  <p className="mt-1 text-[11px] text-white/60 truncate">
                    {f.bio ? f.bio : "No status"}
                  </p>
                </div>

                <svg
                  className="shrink-0 text-white/40 group-hover:text-white/70 transition"
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
              </NavLink>
            ))}
          </div>
        }
      </div>
    </div >
  );
};

export default StartNewChat;