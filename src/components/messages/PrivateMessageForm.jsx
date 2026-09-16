import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { socket } from "../../socket";
import { addIncomingMessage } from "../../reducers/messagesSlice";

const PrivateMessageForm = () => {
  const dispatch = useDispatch();
  const { friendid } = useParams();

  const [messageError, setMessageError] = useState("");

  const friendId = String(friendid || "");

  const activeChatFriendId = useSelector(
    (state) => state.messages.activeChatFriendId
  );

  const friendsList = useSelector(
    (state) => state.user.friendsList
  );

  const thread = useSelector((state) => {
    const messages = state.messages.messages;

    return (
      messages?.data?.[activeChatFriendId] ||
      messages?.data?.[friendId] ||
      messages?.[activeChatFriendId] ||
      messages?.[friendId] ||
      null
    );
  });

  const friend = thread?.friend;

  const canSendMessage = (friendsList || []).some(
    (item) => {
      const possibleIds = [
        item?.id,
        item?.friendId,
        item?.userId,
        item?.userid,
      ]
        .filter(Boolean)
        .map(Number);

      return possibleIds.includes(Number(friendId));
    }
  );
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

  useEffect(() => {
    const onMessageError = (error) => {
      setMessageError(
        error?.message ||
        "You must be friends before you can send messages."
      );
    };

    socket.on("MESSAGE_ERROR", onMessageError);

    return () => {
      socket.off("MESSAGE_ERROR", onMessageError);
    };
  }, []);

  useEffect(() => {
    setMessageError("");
    reset({ msg: "" });
  }, [friendId, reset]);

  const onSubmit = ({ msg }) => {
    if (!canSendMessage) {
      setMessageError(
        "You must be friends before you can send messages."
      );
      return;
    }

    const text = msg.trim();

    const senderId = Number(
      localStorage.getItem("id")
    );

    const receiverId = Number(
      friend?.id ||
      friend?.friendId ||
      friendid
    );

    if (!text || !senderId || !receiverId) {
      return;
    }

    setMessageError("");

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

  const sendIsDisabled =
    !canSendMessage ||
    messageIsEmpty ||
    isSubmitting ||
    !friend;

  return (
    <div className="w-full">
      {!canSendMessage && (
        <div
          className="
            mb-2 rounded-xl
            border border-amber-300/20
            bg-amber-400/10
            px-3 py-2
            text-center text-xs
            text-amber-100/80
          "
        >
          You must be friends before you can send
          messages.
        </div>
      )}

      {messageError && canSendMessage && (
        <div
          className="
            mb-2 rounded-xl
            border border-red-300/20
            bg-red-400/10
            px-3 py-2
            text-center text-xs
            text-red-100/80
          "
        >
          {messageError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div
          className={`
            flex items-end gap-2
            rounded-2xl border
            bg-[#0b1220]/55 p-2
            backdrop-blur-xl
            shadow-[0_8px_24px_rgba(0,0,0,0.20),inset_0_0_0_1px_rgba(255,255,255,0.03)]

            ${canSendMessage
              ? "border-sky-300/20"
              : "border-white/10 opacity-70"
            }
          `}
        >
          <textarea
            {...messageField}
            ref={(element) => {
              registerMessageRef(element);
              textareaRef.current = element;
            }}
            rows={1}
            maxLength={100}
            disabled={!canSendMessage}
            placeholder={
              canSendMessage
                ? friend?.firstName
                  ? `Message ${friend.firstName}...`
                  : "Message..."
                : "You must be friends to send messages"
            }
            className="
              max-h-40 min-h-11 flex-1
              resize-none overflow-y-auto
              bg-transparent px-3 py-2.5
              text-sm text-white
              placeholder:text-white/40
              outline-none
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                if (
                  canSendMessage &&
                  !messageIsEmpty
                ) {
                  handleSubmit(onSubmit)();
                }
              }
            }}
          />

          <button
            type="submit"
            disabled={sendIsDisabled}
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