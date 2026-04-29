import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { socket } from "../../socket";
import { addIncomingMessage } from "../../reducers/messagesSlice";

const PrivateMessageForm = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();
  const friendId = String(friendid);
  const thread = useSelector((s) => s.messages.messages?.[friendId]);
  const friend = thread?.friend;
  const {
    register,
    handleSubmit,
    reset,
    watch,
  } = useForm({
    defaultValues: { msg: "" },
    mode: "onSubmit",
  });

  const { ref: msgRef, ...msgField } = register("msg", {
    required: "Message is required",
    maxLength: { value: 100, message: "Message too long" },
  });

  const textareaRef = useRef(null);
  const msgValue = watch("msg");


  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  }, [msgValue]);

  const onSubmit = ({ msg }) => {
    const myId = Number(localStorage.getItem("id"));
    const receiverId = Number(friend.id);
    const optimistic = {
      id: `tmp-${Date.now()}`,
      senderId: myId,
      receiverId,
      text: msg,
      isRead: true,
      create_at: new Date().toISOString(),
      friend: friend,
    };
    dispatch(addIncomingMessage({ message: optimistic, myId }));
    const clientId = crypto.randomUUID?.() || `c-${Date.now()}`;
    socket.emit("SEND_MESSAGE", { senderId: myId, receiverId, text: msg, clientId });
    reset();
  };

  return (
    <div className="w-full px-1 pb-1 fixed bottom-0 left-0">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div
          className="flex items-end gap-2 rounded-2xl border border-white/15
          bg-white/[0.04] backdrop-blur-md p-2
          shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_22px_rgba(60,170,255,0.08)]">
          <textarea
            ref={(el) => {
              msgRef(el);
              textareaRef.current = el;
            }}
            {...msgField}
            rows={1}
            placeholder="Message..."
            className="flex-1 resize-none bg-transparent px-3 py-2 text-sm text-white
                        placeholder-white/40 outline-none max-h-40 overflow-y-auto"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
          <button
            type="submit"
            className="h-11 w-11 rounded-xl border border-sky-300/25
            bg-white/[0.06] backdrop-blur-md
            flex items-center justify-center text-white
            shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]
            hover:border-sky-200/45 hover:bg-white/[0.08]
            transition active:scale-[0.98]"
            aria-label="Send">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 2L11 13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22 2l-7 20-4-9-9-4 20-7z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivateMessageForm;
