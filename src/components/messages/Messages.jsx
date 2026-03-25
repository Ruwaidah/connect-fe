import gsap from "gsap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages, messageRead } from "../../reducers/messagesSlice";
import Loading from "../loading/Loading";
import NoMessages from "./NoMessages";
import { Link, NavLink } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";
import FriendsList from "../friends/FriendsList";
import Header from "../header/Header";




const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading } =
    useSelector((state) => state.messages);

  const {
    user,
    isStartNewChat,
    isGetFriendsLoading,
    friendsList,
  } = useSelector((state) => state.user);


  // Time formatter with AM/PM
  const formatTimeAMPM = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const chats = Object.values(messages || {})
    .filter(Boolean)
    .sort((a, b) => {
      const aTime = new Date(a.messages?.at(-1)?.create_at || 0).getTime();
      const bTime = new Date(b.messages?.at(-1)?.create_at || 0).getTime();
      return bTime - aTime;
    });



  useEffect(() => {
    if (!isMessagesLoading && !isStartNewChat) {
      gsap.to(".message", {
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
        stagger: 0.03,
      });
    }
  }, [isMessagesLoading, isStartNewChat, chats.length]);


  useEffect(() => {
    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    if (!isStartNewChat) return;
    if (isGetFriendsLoading) return;

    gsap.fromTo(
      ".StartNewChat .FriendsList > *",
      { x: "20%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.6, ease: "circ.out", stagger: 0.04 }
    );
  }, [isStartNewChat, isGetFriendsLoading, friendsList.length]);

  // ************************** OPEN UNREAD MESSAGE ******************************
  const openPrivateMsg = (chat) => {
    dispatch(
      messageRead({
        data: {
          userId: Number(localStorage.getItem("id")),
          friendId: Number(chat.friend.id),
        },
      })
    );
  };

  console.log(messages)

  return (
    <div className="message flex flex-col w-full h-[80vh] text-white">
      <Header
        title="Chats"
        showBack={false}
        leftIcon={<img src="/assets/logo.png" className="w-10 h-10" alt="Connect" />}
        right={
          <NavLink to="/profile">
            <img className="w-9 h-9 rounded-full ring-1 ring-white/10 object-cover" src={user?.image || ""} />
          </NavLink>
        }
      >
        <SearchFriendForm />
      </Header>
      {isMessagesLoading || isGetFriendsLoading ? (
        <Loading />
      ) : chats.length === 0 ? (
        <div className="flex w-full justify-center items-center h-full">
          <NoMessages />
        </div>
      ) : isStartNewChat ? (
        <div className="StartNewChat">
          <FriendsList />
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-1 py-4 overflow-y-auto">
          {chats.map((chat) => {
            if (!chat?.friend) return null;
            const last = chat.messages?.[chat.messages.length - 1];
            const time = formatTimeAMPM(last?.create_at);
            return (
              <Link
                key={chat.friend.id}
                className="message opacity-0 group w-full rounded-2xl border border-white/15
                bg-white/[0.04] backdrop-blur-md p-3
                flex items-center justify-between gap-3
                shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_22px_rgba(60,170,255,0.08)]
                hover:border-sky-200/30 hover:bg-white/[0.06]
                hover:shadow-[0_0_0_1px_rgba(140,230,255,0.22),0_0_30px_rgba(60,170,255,0.14)]
                transition"
                onClick={() => openPrivateMsg(chat)}
                to={`/messages/private/${chat.friend.id}`}>
                {/* Left */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/15 opacity-0 group-hover:opacity-100 transition" />
                    <div className="relative rounded-full p-[2px]
                          bg-gradient-to-b from-sky-300/50 via-indigo-300/20 to-white/10
                          shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]">
                      {chat.friend.image ? (
                        <img
                          src={chat.friend.image}
                          alt=""
                          className="h-12 w-12 rounded-full object-cover ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/10" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {chat.friend.firstName} {chat.friend.lastName}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {last?.text || "No messages yet"}
                    </p>
                  </div>
                </div>
                {/* Right */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2 text-white/60">
                    <span className="text-[11px]">{time}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 18l6-6-6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {chat.numberOfMsgUnread > 0 && (
                    <span className="min-w-6 h-6 px-2 rounded-full bg-sky-400/80 text-white text-xs
                           flex items-center justify-center shadow-[0_0_18px_rgba(60,170,255,0.25)]">
                      {chat.numberOfMsgUnread}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

        </div>

      )}
    </div>
  );
};

export default Messages;
