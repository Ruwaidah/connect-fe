import { useSelector, useDispatch } from "react-redux";
import Header from "../header/Header";
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
    <div className="w-full min-h-screen text-white flex flex-col">
      {/* FIXED header */}
      <Header
        title={`${friend.firstName} ${friend.lastName}`}
        subtitle="Private chat"
        showBack
        right={
          <Link
            to={`/friend/profile/${friend.id}`}
            className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/10"
          >
            {friend.image ? (
              <img src={friend.image} className="w-full h-full object-cover" alt="" />
            ) : null}
          </Link>
        }
      />

      {/* CONTENT (push below fixed header) */}
      <div className="pt-14 flex-1 flex flex-col">
        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {sortedMessages.length === 0 ? (
            <div className="h-full grid place-items-center">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
                          px-4 py-2 text-sm text-white/70
                          shadow-[0_0_0_1px_rgba(140,230,255,0.10)]">
                No messages yet
              </div>
            </div>
          ) : (
            sortedMessages.map((msg, i) => (
              <div key={i}>{msg.text}</div>
            ))
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT pinned at bottom */}
        <div className="px-2 pb-2">
          <PrivateMessageForm />
        </div>
      </div>
    </div>
  );
};

export default PrivateMessageCard;
