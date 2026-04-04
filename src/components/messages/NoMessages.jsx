import { NavLink } from "react-router-dom";

const NoMessages = () => {
  return (
    <div className="w-full h-full min-h-[calc(100vh-160px)] flex items-center justify-center px-4">
      <div className="w-full max-w-[520px] text-center">
        {/* Glow + image */}
        <div className="relative mx-auto w-[92px] h-[92px] sm:w-[110px] sm:h-[110px]">
          <div className="absolute -inset-6 rounded-full blur-3xl bg-sky-400/20" />
          <img
            src="/assets/nomessage.png"
            alt="No chats"
            className="relative w-full h-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
          />
        </div>

        {/* Title + subtitle */}
        <h2 className="mt-5 text-[20px] sm:text-[22px] font-semibold text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)]">
          No chats yet
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-white/65">
          Start a new conversation with a friend.
        </p>

        {/* Button */}
        <div className="mt-6 flex justify-center">
          <NavLink
            to="/new-chat-friends-list"
            className="w-full max-w-[360px] h-12 rounded-2xl
              flex items-center justify-center gap-2
              bg-sky-500/20 border border-sky-300/30
              text-white text-sm font-medium
              shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_12px_34px_rgba(40,120,255,0.22),0_0_30px_rgba(80,200,255,0.18)]
              hover:bg-sky-400/25 hover:border-sky-200/45
              active:scale-[0.99] transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

        {/* Tip */}
        <p className="mt-3 text-[11px] text-white/45">
          Tip: You can search friends from the top bar.
        </p>
      </div>
    </div>
  );
};

export default NoMessages;