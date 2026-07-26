import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { socket } from "../../socket";
import { addIncomingMessage } from "../../reducers/messagesSlice";

const PrivateMessageForm = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();

  const friendId = String(friendid || "");

  const thread = useSelector(
    (state) => state.messages.messages?.[friendId]
  );

  const friend = thread?.friend;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      msg: "",
    },
    mode: "onSubmit",
  });

  const {
    ref: registerMessageRef,
    ...messageField
  } = register("msg", {
    required: "Message is required.",
    maxLength: {
      value: 100,
      message: "Message cannot exceed 100 characters.",
    },
    validate: (value) =>
      value.trim().length > 0 ||
      "Message is required.",
  });

  const textareaRef = useRef(null);
  const messageValue = watch("msg") || "";

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      160
    )}px`;
  }, [messageValue]);

  const onSubmit = ({ msg }) => {
    const text = msg.trim();
    const senderId = Number(
      localStorage.getItem("id")
    );

    const receiverId = Number(
      friend?.id || friend?.friendId || friendid
    );

    if (!text || !senderId || !receiverId) {
      return;
    }

    const clientId =
      crypto.randomUUID?.() ||
      `client-${Date.now()}`;

    const optimisticMessage = {
      id: `temporary-${clientId}`,
      clientId,
      senderId,
      receiverId,
      text,
      isRead: true,
      create_at: new Date().toISOString(),
    };

    dispatch(
      addIncomingMessage(optimisticMessage)
    );

    socket.emit("SEND_MESSAGE", {
      senderId,
      receiverId,
      text,
      clientId,
    });

    reset({
      msg: "",
    });

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const messageIsEmpty =
    messageValue.trim().length === 0;

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="
                flex items-end gap-2
                rounded-2xl border border-sky-300/20
                bg-[#0b1220]/55 p-2
                backdrop-blur-xl
                shadow-[0_8px_24px_rgba(0,0,0,0.20),inset_0_0_0_1px_rgba(255,255,255,0.03)]">
          <textarea
            {...messageField}
            ref={(element) => {
              registerMessageRef(element);
              textareaRef.current = element;
            }}
            rows={1}
            maxLength={100}
            placeholder={
              friend?.firstName
                ? `Message ${friend.firstName}...`
                : "Message..."}
            className="
              max-h-40 min-h-11 flex-1
              resize-none overflow-y-auto
              bg-transparent px-3 py-2.5
              text-sm text-white
              placeholder:text-white/40
              outline-none
            "
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                if (!messageIsEmpty) {
                  handleSubmit(onSubmit)();
                }
              }
            }}
          />

          <button
            type="submit"
            disabled={
              messageIsEmpty ||
              isSubmitting ||
              !friend
            }
            aria-label="Send message"
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl border
              border-sky-300/25
              bg-white/[0.06]
              text-white
              shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]
              transition
              hover:border-sky-200/45
              hover:bg-white/[0.09]
              active:scale-[0.97]
              disabled:cursor-not-allowed
              disabled:opacity-35
            "
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                d="M22 2 11 13"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="m22 2-7 20-4-9-9-4 20-7Z"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="mt-1 flex justify-end px-2">
          <span
            className={`
              text-[10px]
              ${messageValue.length >= 90
                ? "text-amber-300/80"
                : "text-white/30"
              }
            `}
          >
            {messageValue.length}/100
          </span>
        </div>
      </form>
    </div>
  );
};

export default PrivateMessageForm;