import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends, startNewChatList } from "../../reducers/usersSlice";
import Loading from "../loading/Loading";
import { NavLink } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";

const StartNewChat = () => {
  const dispatch = useDispatch();

  const { user, isStartNewChat, isGetFriendsLoading, friendsList } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  const searchNewChat = () => {
    dispatch(startNewChatList(!isStartNewChat));
    dispatch(getFriends());
  };

  if (isGetFriendsLoading) return <Loading />;

  return (
    <div className="w-full h-full text-white flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="mx-auto max-w-md px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                className="w-8 h-8"
                alt="Connect"
              />
              <div>
                <h2 className="font-semibold text-lg leading-none">New Chat</h2>
                <p className="text-xs text-white/55 mt-1">Pick a friend to start</p>
              </div>
            </div>

            <NavLink to="/profile" onClick={searchNewChat}>
              <div className="relative">
                <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/15" />
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile"
                    className="relative w-9 h-9 rounded-full object-cover ring-1 ring-white/10"
                  />
                ) : (
                  <div className="relative w-9 h-9 rounded-full bg-white/10 ring-1 ring-white/10" />
                )}
              </div>
            </NavLink>
          </div>

          <div className="mt-3">
            <SearchFriendForm />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto w-full max-w-md px-4 py-4 pb-24 flex-1">
        {friendsList?.length < 1 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="w-full max-w-[360px] rounded-3xl
                         border border-white/12 bg-white/[0.04] backdrop-blur-xl
                         px-5 py-6 text-center
                         shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_60px_rgba(0,0,0,0.45)]"
            >
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute -inset-3 rounded-full blur-2xl bg-sky-400/15" />
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
                className="mt-5 h-11 w-full rounded-2xl
                           flex items-center justify-center gap-2
                           bg-sky-500/20 border border-sky-300/30
                           text-white text-sm font-medium
                           shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_12px_34px_rgba(40,120,255,0.22),0_0_30px_rgba(80,200,255,0.18)]
                           hover:bg-sky-400/25 hover:border-sky-200/45
                           active:scale-[0.99] transition"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19 8v6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 11h-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Invite Friends
              </NavLink>

              <p className="mt-3 text-[11px] text-white/45">
                Tip: Search by username in the field above.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-white/70 text-sm">
            {/* TODO: render selectable friends list here */}
            Select a friend from your list to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default StartNewChat;