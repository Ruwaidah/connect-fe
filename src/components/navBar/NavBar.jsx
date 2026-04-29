import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../../reducers/usersSlice";

const baseIcon =
  "w-5 h-5 opacity-75 transition duration-200 group-hover:opacity-100";
const activeIcon =
  "w-5 h-5 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]";

const NavBar = () => {
  const dispatch = useDispatch();
  const { totalUnreadMsgs } = useSelector((state) => state.messages);

  const linkClass = ({ isActive }) =>
    `group flex items-center justify-center w-12 h-10 rounded-xl transition
     ${isActive ? "bg-white/10" : "hover:bg-white/5"}`;

  const iconClass = ({ isActive }) => (isActive ? activeIcon : baseIcon);

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50
      bg-gray-900/70 backdrop-blur-xl
      border-t border-white/10
      shadow-[0_-10px_30px_rgba(0,0,0,0.35)]">
      <div className="border-t border-white/10 bg-gray-900/70 backdrop-blur-xl px-4 py-3">
        <div className="flex items-center justify-around">
          <NavLink to="/messages" onClick={() => dispatch(clearState())} className={linkClass}>
            {({ isActive }) => (
              <div className="relative">
                <svg className={isActive ? activeIcon : baseIcon}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cccccc">
                  <path
                    d="M3 7.2C3 6.08 3 5.52 3.218 5.092c.192-.376.498-.682.874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.108.218.376.192.682.498.874.874C21 5.52 21 6.08 21 7.2V20l-3.324-1.662A3.3 3.3 0 0 0 16.245 18H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 16.48 3 15.92 3 14.8V7.2Z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {totalUnreadMsgs > 0 && (
                  <span
                    className="absolute -top-2 -right-2 min-w-5 h-5 px-1
            rounded-full text-[11px] font-semibold
            flex items-center justify-center
            bg-sky-400 text-white
            border border-white/20
            shadow-[0_0_18px_rgba(60,170,255,0.30)]"
                  >
                    {totalUnreadMsgs > 99 ? "99+" : totalUnreadMsgs}
                  </span>
                )}
              </div>)}
          </NavLink>

          <NavLink to="/profile" onClick={() => dispatch(clearState())} className={linkClass}>
            {(<svg className={iconClass} width="18" height="18" viewBox="0 0 32 32" fill="#cccccc">
              <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z" />
              <path d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z" />
            </svg>)}
          </NavLink>

          <NavLink to="/friends" onClick={() => dispatch(clearState())} className={linkClass}>
            <svg className={iconClass} width="18" height="18" viewBox="0 0 24 24" fill="#cccccc">
              <path d="M12 1C7.15 1 2 4.27 2 10c0 1.93.49 3.53 1.48 4.85.81 1.08 1.92 1.93 3.24 2.64-.51 1.09-1.28 2.09-1.98 2.87-.52.58-.46 1.34-.19 1.83.28.5.92.97 1.74.74 2.47-.7 6.78-2.11 9.76-4.1 2.29-1.53 3.8-2.87 4.73-4.29C21.72 13.09 22 11.63 22 10 22 4.27 16.85 1 12 1Z" />
              <path d="M11 7a1 1 0 0 1 2 0v2h2a1 1 0 1 1 0 2h-2v2a1 1 0 1 1-2 0v-2H9a1 1 0 1 1 0-2h2V7Z" />
            </svg>
          </NavLink>

          <NavLink to="/notifications" onClick={() => dispatch(clearState())} className={linkClass}>
            <svg className={iconClass} width="18" height="18" viewBox="0 0 24 24" fill="#cccccc">
              <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22Zm7-6V11a7 7 0 1 0-14 0v5l-2 2v1h18v-1l-2-2Z" />
            </svg>
          </NavLink>

          <NavLink to="/setting" onClick={() => dispatch(clearState())} className={linkClass}>
            <svg className={iconClass} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cccccc">
              <path
                d="M10.3 18.37c.06.36.36.63.72.63h1.35c.37 0 .68-.28.74-.65.05-.3.26-.54.54-.64.2-.07.39-.16.58-.26.27-.14.59-.12.84.05.3.22.71.19.97-.08l.91-.93c.28-.29.32-.75.09-1.08-.18-.27-.2-.61-.07-.9.06-.13.11-.27.16-.4.1-.33.38-.58.71-.65.41-.07.71-.43.71-.86v-1.11c0-.48-.34-.89-.8-.97-.35-.07-.64-.32-.78-.66l-.04-.1c-.17-.35-.14-.77.07-1.1.27-.39.23-.92-.1-1.26l-.65-.67c-.36-.37-.93-.42-1.35-.12l-.05.04c-.29.21-.67.24-1 .09-.34-.13-.59-.43-.66-.79l-.02-.07A.87.87 0 0 0 12.11 5h-.86c-.5 0-.93.37-1.01.88l-.01.03c-.08.38-.34.7-.7.83-.21.11-.43.2-.65.31-.33.15-.71.11-1.01-.1l-.02-.02c-.4-.3-.95-.25-1.3.11l-.71.73c-.31.31-.34.81-.08 1.17.2.3.22.7.05 1.02-.04.09-.08.18-.12.26-.12.31-.4.54-.73.61-.43.07-.75.45-.74.9v1.24c0 .39.28.72.65.78.31.06.56.29.65.6.06.2.14.4.22.58.13.27.1.59-.07.84-.22.31-.19.73.06.99l.97.99c.25.25.64.28.93.08.24-.17.55-.19.81-.06.21.11.43.2.65.28.28.09.48.33.54.62Z"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M14 12c0 1.29-1.02 2.33-2.3 2.33S9.4 13.29 9.4 12s1.02-2.33 2.3-2.33S14 10.71 14 12Z" strokeWidth="1.5" />
            </svg>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;