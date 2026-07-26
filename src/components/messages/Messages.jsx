import gsap from "gsap";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessages,
  messageRead,
  markThreadRead,
} from "../../reducers/messagesSlice";
import Loading from "../loading/Loading";
import NoMessages from "./NoMessages";
import { Link, NavLink } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";
import FriendsList from "../friends/FriendsList";
import Header from "../header/Header";

const Messages = () => {
  const dispatch = useDispatch();

  const { messages, isMessagesLoading } = useSelector(
    (state) => state.messages
  );

  const {
    user,
    isStartNewChat,
    isGetFriendsLoading,
    friendsList,
  } = useSelector((state) => state.user);

  const chats = useMemo(() => {
    return Object.values(messages || {})
      .filter((chat) => chat?.friend)
      .sort((a, b) => {
        const aTime = new Date(
          a.messages?.at(-1)?.create_at || 0
        ).getTime();

        const bTime = new Date(
          b.messages?.at(-1)?.create_at || 0
        ).getTime();

        return bTime - aTime;
      });
  }, [messages]);

  const formatTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  console.log(user)

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    if (!isStartNewChat || isGetFriendsLoading) return;

    gsap.fromTo(
      ".StartNewChat .FriendsList > *",
      {
        x: 30,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.45,
        ease: "power2.out",
        stagger: 0.05,
      }
    );
  }, [
    isStartNewChat,
    isGetFriendsLoading,
    friendsList.length,
  ]);

  const openPrivateMessage = (chat) => {
    const myId = Number(localStorage.getItem("id"));
    const friendId = Number(chat.friend.id);

    if (!myId || !friendId) return;

    dispatch(markThreadRead(String(friendId)));

    dispatch(
      messageRead({
        data: {
          userId: myId,
          friendId,
        },
      })
    );
  };

  const isLoading =
    isMessagesLoading || isGetFriendsLoading;

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Chats"
        showBack={false}
        right={
          <NavLink
            to="/profile"
            className="
              block h-10 w-10 overflow-hidden
              rounded-full border border-white/10
              bg-white/10
              ring-1 ring-sky-300/15
            "
          >
            {user?.image ? (
              <img
                src={user.image}
                alt={`${user.firstName || ""} ${user.lastName || ""
                  }`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-sm font-semibold text-white/70">
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
          px-3 pb-[92px] pt-[112px]
        "
      >
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : isStartNewChat ? (
          <div className="StartNewChat flex-1">
            <FriendsList />
          </div>
        ) : chats.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <NoMessages />
          </div>
        ) : (
          <div className="flex flex-col gap-2 py-3">
            {chats.map((chat) => {
              const lastMessage =
                chat.messages?.[chat.messages.length - 1];

              const time = formatTime(
                lastMessage?.create_at
              );

              const unreadCount = Number(
                chat.numberOfMsgUnread || 0
              );

              return (
                <Link
                  key={chat.friend.id}
                  to={`/messages/private/${chat.friend.id}`}
                  onClick={() => openPrivateMessage(chat)}
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
                      {chat.friend.image ? (
                        <img
                          src={chat.friend.image}
                          alt={`${chat.friend.firstName} ${chat.friend.lastName}`}
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
                          {chat.friend.firstName?.charAt(0) ||
                            "U"}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-white">
                        {chat.friend.firstName}{" "}
                        {chat.friend.lastName}
                      </p>

                      <span className="shrink-0 text-[11px] text-white/40">
                        {time}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between gap-3">
                      <p
                        className={`truncate text-xs ${unreadCount > 0
                          ? "font-medium text-white/85"
                          : "text-white/50"
                          }`}
                      >
                        {lastMessage?.text ||
                          "No messages yet"}
                      </p>

                      {unreadCount > 0 ? (
                        <span
                          className="
                            grid h-5 min-w-5 shrink-0
                            place-items-center rounded-full
                            bg-sky-400 px-1.5
                            text-[10px] font-bold text-white
                            shadow-[0_0_16px_rgba(56,189,248,0.35)]
                          "
                        >
                          {unreadCount > 99
                            ? "99+"
                            : unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="
                      shrink-0 text-white/30 transition
                      group-hover:translate-x-0.5
                      group-hover:text-white/60
                    "
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;