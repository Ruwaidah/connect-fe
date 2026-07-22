import { NavLink } from "react-router-dom";

const NoFriends = () => {
  return (
    <div className="flex flex-1 items-center justify-center px-4 pb-10">
      <div className="w-full max-w-[360px] text-center">
        <div className="relative mx-auto h-28 w-28">
          <div className="absolute -inset-5 rounded-full bg-sky-400/15 blur-3xl" />

          <img
            src="/assets/friends-list.png"
            alt="No friends"
            className="
              relative h-full w-full object-contain
              drop-shadow-[0_14px_30px_rgba(0,0,0,0.45)]
            "
          />
        </div>

        <h2 className="mt-4 text-xl font-semibold text-white">
          No friends yet
        </h2>

        <p className="mt-1 text-sm text-white/55">
          Add friends to start chatting.
        </p>

        <NavLink
          to="/addnewfriend"
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
              d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              strokeWidth="1.6"
            />

            <path
              d="M19 8v6M22 11h-6"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>

          Add New Friend
        </NavLink>
      </div>
    </div>
  );
};

export default NoFriends;
