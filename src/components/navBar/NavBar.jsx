import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../reducers/usersSlice";

const baseIcon =
  "h-5 w-5 text-white/60 transition duration-200 group-hover:text-white";

const activeIcon =
  "h-5 w-5 text-white drop-shadow-[0_0_10px_rgba(125,211,252,0.45)]";

const NavBar = () => {
  const dispatch = useDispatch();

  const { totalUnreadMsgs } = useSelector(
    (state) => state.messages
  );

  const linkClass = ({ isActive }) =>
    `
      group relative flex h-11 w-12
      items-center justify-center
      rounded-xl transition duration-200
      ${isActive
      ? `
            bg-white/10
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06),0_0_16px_rgba(56,189,248,0.10)]
          `
      : `
            hover:bg-white/[0.05]
          `
    }
    `;

  const handleNavigation = () => {
    dispatch(clearState());
  };

  return (
    <nav
      className="
        fixed inset-x-0 bottom-0 z-50
        border-t border-sky-300/15
        bg-[#0b1220]/85
        backdrop-blur-xl
        shadow-[0_-10px_30px_rgba(0,0,0,0.35)]
      "
    >
      <div
        className="
          mx-auto flex w-full max-w-[520px]
          items-center justify-around
          px-3 pt-2
          pb-[calc(env(safe-area-inset-bottom)+8px)]
        "
      >
        {/* Messages */}
        <NavLink
          to="/messages"
          onClick={handleNavigation}
          className={linkClass}
          aria-label="Messages"
        >
          {({ isActive }) => (
            <div className="relative">
              <svg
                className={isActive ? activeIcon : baseIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M3 7.2C3 6.08 3 5.52 3.218 5.092c.192-.376.498-.682.874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.108.218.376.192.682.498.874.874C21 5.52 21 6.08 21 7.2V20l-3.324-1.662A3.3 3.3 0 0 0 16.245 18H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 16.48 3 15.92 3 14.8V7.2Z"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {totalUnreadMsgs > 0 ? (
                <span
                  className="
                    absolute -right-2.5 -top-2.5
                    flex h-5 min-w-5 items-center justify-center
                    rounded-full border border-white/20
                    bg-sky-400 px-1
                    text-[10px] font-bold text-white
                    shadow-[0_0_16px_rgba(56,189,248,0.40)]
                  "
                >
                  {totalUnreadMsgs > 99
                    ? "99+"
                    : totalUnreadMsgs}
                </span>
              ) : null}
            </div>
          )}
        </NavLink>

        {/* Profile */}
        <NavLink
          to="/profile"
          onClick={handleNavigation}
          className={linkClass}
          aria-label="Profile"
        >
          {({ isActive }) => (
            <svg
              className={isActive ? activeIcon : baseIcon}
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 16A7 7 0 1 0 9 9a7 7 0 0 0 7 7Zm0-12a5 5 0 1 1-5 5 5 5 0 0 1 5-5Z" />

              <path d="M17 18h-2A11 11 0 0 0 4 29a1 1 0 0 0 1 1h22a1 1 0 0 0 1-1 11 11 0 0 0-11-11ZM6.06 28A9 9 0 0 1 15 20h2a9 9 0 0 1 8.94 8Z" />
            </svg>
          )}
        </NavLink>

        {/* Friends */}
        <NavLink
          to="/friends"
          onClick={handleNavigation}
          className={linkClass}
          aria-label="Friends"
        >
          {({ isActive }) => (
            <svg
              className={isActive ? activeIcon : baseIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1C7.15 1 2 4.27 2 10c0 1.93.49 3.53 1.48 4.85.81 1.08 1.92 1.93 3.24 2.64-.51 1.09-1.28 2.09-1.98 2.87-.52.58-.46 1.34-.19 1.83.28.5.92.97 1.74.74 2.47-.7 6.78-2.11 9.76-4.1 2.29-1.53 3.8-2.87 4.73-4.29C21.72 13.09 22 11.63 22 10 22 4.27 16.85 1 12 1Z" />

              <path d="M11 7a1 1 0 0 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2V7Z" />
            </svg>
          )}
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/notifications"
          onClick={handleNavigation}
          className={linkClass}
          aria-label="Notifications"
        >
          {({ isActive }) => (
            <svg
              className={isActive ? activeIcon : baseIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z" />
            </svg>
          )}
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/setting"
          onClick={handleNavigation}
          className={linkClass}
          aria-label="Settings"
        >
          {({ isActive }) => (
            <svg
              className={isActive ? activeIcon : baseIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M10.3 18.37c.06.36.36.63.72.63h1.35c.37 0 .68-.28.74-.65.05-.3.26-.54.54-.64.2-.07.39-.16.58-.26.27-.14.59-.12.84.05.3.22.71.19.97-.08l.91-.93c.28-.29.32-.75.09-1.08-.18-.27-.2-.61-.07-.9.06-.13.11-.27.16-.4.1-.33.38-.58.71-.65.41-.07.71-.43.71-.86v-1.11c0-.48-.34-.89-.8-.97-.35-.07-.64-.32-.78-.66l-.04-.1c-.17-.35-.14-.77.07-1.1.27-.39.23-.92-.1-1.26l-.65-.67c-.36-.37-.93-.42-1.35-.12l-.05.04c-.29.21-.67.24-1 .09-.34-.13-.59-.43-.66-.79l-.02-.07A.87.87 0 0 0 12.11 5h-.86c-.5 0-.93.37-1.01.88l-.01.03c-.08.38-.34.7-.7.83-.21.11-.43.2-.65.31-.33.15-.71.11-1.01-.1l-.02-.02c-.4-.3-.95-.25-1.3.11l-.71.73c-.31.31-.34.81-.08 1.17.2.3.22.7.05 1.02-.04.09-.08.18-.12.26-.12.31-.4.54-.73.61-.43.07-.75.45-.74.9v1.24c0 .39.28.72.65.78.31.06.56.29.65.6.06.2.14.4.22.58.13.27.1.59-.07.84-.22.31-.19.73.06.99l.97.99c.25.25.64.28.93.08.24-.17.55-.19.81-.06.21.11.43.2.65.28.28.09.48.33.54.62Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M14 12c0 1.29-1.02 2.33-2.3 2.33S9.4 13.29 9.4 12s1.02-2.33 2.3-2.33S14 10.71 14 12Z"
                strokeWidth="1.5"
              />
            </svg>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;