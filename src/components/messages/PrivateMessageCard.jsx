import { useSelector, useDispatch } from "react-redux";
import Header from "../header/Header";
import { Link, useParams } from "react-router-dom";
import PrivateMessageForm from "./PrivateMessageForm";
import { useRef, useEffect, useMemo, useState } from "react";
import NoMessages from "./NoMessages";
import {
  messageRead,
  markThreadRead,
} from "../../reducers/messagesSlice";

const PrivateMessageCard = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();
  const friendId = String(friendid);
  const [sendMsg, setSendMsg] = useState(false);
  const messagesEndRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const thread = useSelector((s) => s.messages.messages?.[friendId]);
  const friend = thread?.friend;

  const sortedMessages = useMemo(() => {
    return [...(thread?.messages || [])].sort(
      (a, b) => new Date(a.create_at) - new Date(b.create_at)
    );
  }, [thread?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [thread?.messages, sendMsg]);

  useEffect(() => {
    const myId = Number(localStorage.getItem("id"));
    const currentFriendId = Number(friendid);
    if (!myId || !currentFriendId) return;

    dispatch(markThreadRead(String(currentFriendId)));
    dispatch(messageRead({ data: { userId: myId, friendId: currentFriendId } }));
  }, [dispatch, friendid]);

  const currentUserId = Number(user?.id || localStorage.getItem("id"));

  const formatMessageTime = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (!thread || !friend) return <NoMessages />;

  return (
    <div className="w-full min-h-screen text-white flex flex-col">
      <Header
        title={`${friend.firstName} ${friend.lastName}`}
        subtitle="Private chat"
        showBack
        right={
          <Link
            to={`/friend/profile/${friend.id || friend.friendId}`}
            className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/10"
          >
            {friend.image ? (
              <img
                src={friend.image}
                className="w-full h-full object-cover"
                alt=""
              />
            ) : null}
          </Link>
        }
      />
      <div className="pt-14 flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-3 min-h-0">
          {sortedMessages.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="max-w-[220px] px-4 py-2 text-sm text-white/70 text-center rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md">
                No messages yet
              </div>
            </div>
          ) : (
            sortedMessages.map((msg, i) => {
              const isMine = Number(msg.senderId) === currentUserId;
              return (
                <div
                  key={msg.id || i}
                  className={`flex w-full ${isMine ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[78%] flex flex-col ${isMine ? "items-end" : "items-start"
                      }`}
                  >
                    <div
                      className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed break-words shadow-md
                        ${isMine
                          ? `text-white rounded-br-md
                               bg-sky-500/20 border border-sky-300/30
                               shadow-[0_0_0_1px_rgba(140,230,255,0.14),0_10px_24px_rgba(40,120,255,0.18),inset_0_0_18px_rgba(120,220,255,0.06)]`
                          : `text-white/90 rounded-bl-md
                               bg-white/[0.06] border border-white/10 backdrop-blur-md
                               shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_10px_24px_rgba(0,0,0,0.25)]`
                        }`}
                    >
                      <p> {msg.text}</p>
                    </div>
                    <p className="px-1 text-[11px] text-white/45">
                      {formatMessageTime(msg.create_at)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="pb-2 px-2">
          <PrivateMessageForm />
        </div>
      </div>
    </div>
  );
};

export default PrivateMessageCard;