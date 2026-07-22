import { NavLink } from "react-router-dom";

const NoMessages = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="w-full max-w-[360px] text-center">
        <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
          <div className="absolute -inset-5 rounded-full bg-sky-400/20 blur-3xl" />

          <img
            src="/assets/nomessage.png"
            alt="No chats"
            className="
              relative h-full w-full object-contain
              drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]
            "
          />
        </div>

        <h2
          className="
            mt-5 text-xl font-semibold text-white
            drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]
          "
        >
          No chats yet
        </h2>

        <p className="mt-1 text-sm text-white/60">
          Start a new conversation with a friend.
        </p>

        <NavLink
          to="/new-chat-friends-list"
          className="
            mt-6 flex h-12 w-full
            items-center justify-center gap-2
            rounded-2xl border border-sky-300/30
            bg-sky-500/20
            text-sm font-medium text-white
            shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_12px_34px_rgba(40,120,255,0.22),0_0_30px_rgba(80,200,255,0.18)]
            transition
            hover:border-sky-200/45
            hover:bg-sky-400/25
            active:scale-[0.99]
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M8 9h8M8 13h6"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Start a New Chat
        </NavLink>
      </div>
    </div>
  );
};

export default NoMessages;