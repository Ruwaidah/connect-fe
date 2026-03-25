import { NavLink } from "react-router-dom";

const NoMessages = () => {
  return (
    <div className="w-full h-full flex items-center justify-center px-4">
      <div
        className="w-full max-w-[360px] rounded-3xl
                   border border-white/10
                   bg-transparent backdrop-blur-sm
                   px-5 py-6 text-center"
      >
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute -inset-3 rounded-full blur-2xl bg-sky-400/15" />
          <img
            src="/assets/nomessage.png"
            alt="No chats"
            className="relative w-24 h-24 object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
          />
        </div>

        {/* Text wrapper */}
        <div className="mt-4 rounded-2xl px-4 py-3 bg-gradient-to-b from-black/15 to-black/0">
          <h2 className="text-lg font-semibold text-white/90">No chats yet</h2>
          <p className="mt-1 text-xs text-white/60">
            Start a new conversation with a friend.
          </p>
        </div>

        <NavLink
          to="/new-chat-friends-list"
          className="mt-5 h-11 w-full rounded-2xl
                     flex items-center justify-center gap-2
                     bg-sky-500/18 border border-sky-300/25
                     text-white text-sm font-medium
                     shadow-[0_0_0_1px_rgba(140,230,255,0.14),0_12px_34px_rgba(40,120,255,0.16)]
                     hover:bg-sky-400/22 hover:border-sky-200/40
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

        <p className="mt-3 text-[11px] text-white/45">
          Tip: You can search friends from the top bar.
        </p>
      </div>
    </div>
  );
};

export default NoMessages;