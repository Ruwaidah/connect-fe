import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
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
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const { user } = useSelector((state) => state.user);
  const thread = useSelector((s) => s.messages.messages?.[friendId]);
  const friend = thread?.friend;

  const sortedMessages = useMemo(() => {
    return [...(thread?.messages || [])].sort(
      (a, b) => new Date(a.create_at) - new Date(b.create_at)
    );
  }, [thread?.messages]);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView();

  useEffect(() => scrollToBottom(), [thread?.messages, sendMsg]);

  useEffect(() => {
    const myId = Number(localStorage.getItem("id"));
    const friendId = Number(friendid);
    if (!myId || !friendId) return;

    dispatch(markThreadRead(String(friendId)));
    dispatch(messageRead({ data: { userId: myId, friendId } }));
  }, [dispatch, friendid]);


  if (!thread || !friend) return <NoMessages />;

  return (
    <div className="w-full text-white h-full flex flex-col justify-between">
      <div className="h-16 w-full flex items-center gap-3 px-4 border-b border-white/10 bg-white/[0.03] backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                     flex items-center justify-center text-white/80
                     hover:bg-white/[0.06] hover:text-white transition
                     shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
          aria-label="Back"
          title="Back">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 18l-6-6 6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <Link className="relative" to={`/friend/profile/${friend.id}`}>
          <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/15" />
          <div className="relative rounded-full p-[2px]
                          bg-gradient-to-b from-sky-300/50 via-indigo-300/20 to-white/10
                          shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]">
            {friend.image ? (
              <img
                src={friend.image}
                alt=""
                className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-white/10 ring-1 ring-white/10" />
            )}
          </div>
        </Link>
        <Link className="min-w-0" to={`/friend/profile/${friend.id}`}>
          <p className="font-medium truncate">
            {friend.firstName} {friend.lastName}
          </p>
          <p className="text-xs text-white/50 truncate">Private chat</p>
        </Link>
      </div>
      <div className="px-3 py-4 h-[calc(100vh-64px-80px)] overflow-y-auto">
        {sortedMessages.length < 1 ? (
          <div className="w-full h-full flex items-center justify-center mt-10">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md
                            px-4 py-3 text-sm text-white/70
                            shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_22px_rgba(60,170,255,0.08)]">
              No messages yet
            </div>
          </div>
        ) : (
          sortedMessages.map((msg, indx) => {
            const isMe = String(msg.senderId) === String(localStorage.getItem("id"));
            const showDate =
              indx === 0 ||
              msg.create_at.split("T")[0] !== sortedMessages[indx - 1].create_at.split("T")[0];

            return (
              <div key={msg.id || indx} className="mb-3">
                {showDate && (
                  <div className="flex items-center justify-center my-4">
                    <span className="text-[11px] text-white/50 px-3 py-1 rounded-full
                                     border border-white/10 bg-white/[0.03] backdrop-blur-md">
                      {msg.create_at.split("T")[0]}
                    </span>
                  </div>
                )}
                <div className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
                  {!isMe && (
                    <Link to={`/friend/profile/${friend.id}`}>
                      {friend.image ? (
                        <img
                          src={friend.image}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-white/10"
                        />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-white/10 ring-1 ring-white/10" />
                      )}
                    </Link>
                  )}
                  <div
                    className={`
                      max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                      ${isMe
                        ? "bg-sky-400/15 border border-sky-300/20 text-white shadow-[0_0_18px_rgba(60,170,255,0.10)]"
                        : "bg-white/[0.06] border border-white/12 text-white/90"}
                    `}>
                    <p className="break-words">{msg.text}</p>
                  </div>

                  {isMe && (
                    user?.image ? (
                      <img
                        src={user.image}
                        alt=""
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-white/10"
                      />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-white/10 ring-1 ring-white/10" />
                    )
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      <PrivateMessageForm setSendMsg={setSendMsg} sendMsg={sendMsg} />
    </div>
  );
};

export default PrivateMessageCard;
