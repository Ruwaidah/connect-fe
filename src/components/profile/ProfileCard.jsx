import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import Header from "../header/Header";

const ProfileCard = () => {
  const navigate = useNavigate();

  const { isGettingUserLoading, user } = useSelector((state) => state.user);

  if (isGettingUserLoading || !user) return <Loading />;

  const cardBtn =
    "w-full h-14 rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-xl " +
    "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.35)] " +
    "hover:bg-white/[0.06] hover:border-sky-200/25 transition active:scale-[0.99]";

  const rowBtn =
    "w-full h-full flex items-center justify-center gap-2 px-4 text-sm text-white/90";

  const iconWrap =
    "h-9 w-9 rounded-xl grid place-items-center bg-white/[0.04] border border-white/10 " +
    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]";

  return (
    <div className="w-full h-full text-white flex flex-col">
      {/* Header */}
      <Header title="Profile" showBack />

      {/* Content */}
      <div className="mx-auto w-full max-w-md px-4 py-6 pb-24">
        {/* Avatar + Name */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full blur-2xl bg-sky-400/15" />
            <div
              className="relative rounded-full p-[3px]
                         bg-gradient-to-b from-sky-300/50 via-indigo-300/20 to-white/10
                         shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_22px_rgba(60,170,255,0.14)]"
            >
              {user?.image ? (
                <img
                  src={user.image}
                  alt="Profile"
                  className="h-28 w-28 rounded-full object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="h-28 w-28 rounded-full bg-white/10 ring-1 ring-white/10" />
              )}
            </div>
          </div>

          <h2 className="mt-4 text-xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-white/70 text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M4 7l8 6 8-6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                strokeWidth="1.6"
              />
            </svg>
            <span className="truncate max-w-[260px]">{user.email}</span>
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-3">
          {/* Edit Profile */}
          <div className={cardBtn}>
            <NavLink to="/edit-profile" className={rowBtn}>
              <span className={iconWrap}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M12 20h9"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>Edit Profile</span>
              <span className="ml-auto text-white/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </NavLink>
          </div>

          {/* Friends + Messages */}
          <div className="grid grid-cols-2 gap-3">
            <div className={cardBtn}>
              <NavLink to="/friends" className={rowBtn}>
                <span className={iconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Friends</span>
              </NavLink>
            </div>

            <div className={cardBtn}>
              <NavLink to="/messages" className={rowBtn}>
                <span className={iconWrap}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M8 9h8M8 13h6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Messages</span>
              </NavLink>
            </div>
          </div>

          {/* Photos */}
          <div
            className="rounded-3xl border border-white/12 bg-white/[0.04] backdrop-blur-xl
                       p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white/90">Photos</p>
              <p className="text-xs text-white/45">Recent</p>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <img
                className="h-24 w-full rounded-2xl object-cover ring-1 ring-white/10"
                src="/assets/messaging.avif"
                alt="Messaging"
              />
              <img
                className="h-24 w-full rounded-2xl object-cover ring-1 ring-white/10"
                src="/assets/message02.avif"
                alt="Message"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;