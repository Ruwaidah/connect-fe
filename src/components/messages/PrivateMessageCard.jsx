import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/Header";
import PrivateMessageForm from "./PrivateMessageForm";

import {
  clearActiveChat,
  markThreadRead,
  messageRead,
  setActiveChat,
} from "../../reducers/messagesSlice";

const PrivateMessageCard = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();

  const friendId = String(friendid || "");
  const messagesEndRef = useRef(null);

  const { user } = useSelector((state) => state.user);

  const thread = useSelector(
    (state) => state.messages.messages?.[friendId]
  );

  const friend = thread?.friend;

  const currentUserId = Number(
    user?.id || localStorage.getItem("id")
  );

  const sortedMessages = useMemo(() => {
    return [...(thread?.messages || [])].sort(
      (a, b) =>
        new Date(a.create_at).getTime() -
        new Date(b.create_at).getTime()
    );
  }, [thread?.messages]);

  useEffect(() => {
    if (!friendId) return;

    dispatch(setActiveChat(friendId));

    return () => {
      dispatch(clearActiveChat());
    };
  }, [dispatch, friendId]);

  useEffect(() => {
    const currentFriendId = Number(friendId);

    if (!currentUserId || !currentFriendId) return;

    dispatch(markThreadRead(friendId));

    dispatch(
      messageRead({
        data: {
          userId: currentUserId,
          friendId: currentFriendId,
        },
      })
    );
  }, [
    dispatch,
    friendId,
    currentUserId,
    thread?.numberOfMsgUnread,
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [sortedMessages.length]);

  const formatMessageTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!friend) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center px-4 text-white">
        <div
          className="
            rounded-2xl border border-white/10
            bg-white/[0.04] px-5 py-3
            text-center text-sm text-white/60
            backdrop-blur-xl
          "
        >
          Conversation unavailable.
        </div>
      </div>
    );
  }

  const profileId = friend.id || friend.friendId;

  return (
    <div className="flex h-[100dvh] w-full flex-col text-white">
      <Header
        title={`${friend.firstName} ${friend.lastName}`}
        subtitle={`@${friend.username || "private_chat"}`}
        showBack
        right={
          <Link
            to={`/friend/profile/${profileId}`}
            aria-label={`Open ${friend.firstName}'s profile`}
            className="
              h-10 w-10 shrink-0 overflow-hidden
              rounded-full border border-white/10
              bg-white/10
              ring-1 ring-sky-300/15
              transition
              hover:ring-sky-300/35">
            {friend.image ? (
              <img
                src={friend.image}
                alt={`${friend.firstName} ${friend.lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div
                className="
                  grid h-full w-full place-items-center
                  text-xs font-semibold text-white/60
                "
              >
                {friend.firstName?.charAt(0)}
                {friend.lastName?.charAt(0)}
              </div>
            )}
          </Link>
        }
      />

      <main className="flex min-h-0 w-full flex-1 flex-col pt-14">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
          <div
            className="
              mx-auto flex min-h-full w-full max-w-[520px]
              flex-col gap-3
            "
          >
            {sortedMessages.length === 0 ? (
              <div className="flex flex-1 items-center justify-center px-4">
                <div className="max-w-[280px] text-center">
                  <div
                    className="
                      mx-auto grid h-16 w-16 place-items-center
                      rounded-full border border-white/10
                      bg-white/[0.04]
                    "
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-sky-200/65"
                      aria-hidden="true"
                    >
                      <path
                        d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h2 className="mt-4 text-base font-semibold text-white">
                    Start the conversation
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-white/60">
                    Send a message to {friend.firstName}.
                  </p>
                </div>
              </div>
            ) : (
              sortedMessages.map((msg, index) => {
                const isMine =
                  Number(msg.senderId) === currentUserId;

                return (
                  <div
                    key={msg.id || `${msg.create_at}-${index}`}
                    className={`
                      flex w-full
                      ${
                        isMine
                          ? "justify-end"
                          : "justify-start"
                      }
                    `}
                  >
                    <div
                      className={`
                        flex max-w-[82%] flex-col
                        sm:max-w-[68%]
                        lg:max-w-[55%]
                        ${
                          isMine
                            ? "items-end"
                            : "items-start"
                        }
                      `}
                    >
                      <div
                        className={`
                          break-words rounded-2xl
                          px-3 py-2.5
                          text-sm leading-relaxed
                          ${
                            isMine
                              ? `
                                rounded-br-md
                                border border-sky-300/30
                                bg-sky-500/20
                                text-white
                                shadow-[0_10px_24px_rgba(40,120,255,0.16),inset_0_0_18px_rgba(120,220,255,0.06)]
                              `
                              : `
                                rounded-bl-md
                                border border-white/10
                                bg-white/[0.06]
                                text-white/90
                                shadow-[0_10px_24px_rgba(0,0,0,0.22)]
                                backdrop-blur-md
                              `
                          }
                        `}
                      >
                        <p className="whitespace-pre-wrap">
                          {msg.text}
                        </p>
                      </div>

                      <p className="mt-1 px-1 text-[11px] text-white/40">
                        {formatMessageTime(msg.create_at)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div
          className="
            w-full shrink-0
            border-t border-white/10
            bg-[#07101f]/45
            px-3 pt-2
            pb-[calc(env(safe-area-inset-bottom)+12px)]
            backdrop-blur-2xl
          "
        >
          <div className="mx-auto w-full max-w-[520px]">
            <PrivateMessageForm />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivateMessageCard;