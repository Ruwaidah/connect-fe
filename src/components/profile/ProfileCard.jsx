import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Loading from "../loading/Loading";
import Header from "../header/Header";

const ProfileCard = () => {
  const { isGettingUserLoading, user } = useSelector(
    (state) => state.user
  );

  if (isGettingUserLoading || !user) {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center">
        <Loading />
      </div>
    );
  }

  const cardClass =
    "rounded-2xl border border-white/10 bg-[#0b1220]/50 backdrop-blur-xl " +
    "shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)] " +
    "transition hover:border-sky-300/25 hover:bg-[#142342]/65 " +
    "hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]";

  const rowClass =
    "flex h-14 w-full items-center gap-3 px-4 text-sm font-medium text-white/90";

  const iconClass =
    "grid h-9 w-9 shrink-0 place-items-center rounded-xl " +
    "border border-white/10 bg-white/[0.04] text-white/70 " +
    "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]";

  const initials =
    `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}` ||
    "U";

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header title="Profile" showBack />

      <main
        className="
          mx-auto w-full max-w-[520px]
          px-3 pb-[96px] pt-[78px]
        "
      >
        {/* Profile information */}
        <section className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-full bg-sky-400/15 blur-3xl" />

            <div
              className="
                relative rounded-full p-[3px]
                bg-gradient-to-b
                from-sky-300/60
                via-indigo-300/20
                to-white/10
                shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_26px_rgba(60,170,255,0.16)]
              "
            >
              {user.image ? (
                <img
                  src={user.image}
                  alt={`${user.firstName || ""} ${user.lastName || ""}`}
                  className="
                    h-28 w-28 rounded-full
                    object-cover ring-1 ring-white/10
                  "
                />
              ) : (
                <div
                  className="
                    grid h-28 w-28 place-items-center
                    rounded-full bg-white/10
                    text-2xl font-semibold text-white/75
                    ring-1 ring-white/10
                  "
                >
                  {initials}
                </div>
              )}
            </div>
          </div>

          <h1 className="mt-5 text-xl font-semibold text-white">
            {user.firstName} {user.lastName}
          </h1>

          {user.username ? (
            <p className="mt-1 text-sm text-sky-200/80">
              @{user.username}
            </p>
          ) : null}

          <div className="mt-3 flex max-w-full items-center gap-2 text-sm text-white/55">
            <svg
              className="shrink-0"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
                strokeWidth="1.6"
              />

              <path
                d="m4 7 8 6 8-6"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="max-w-[280px] truncate">
              {user.email}
            </span>
          </div>

          {user.bio ? (
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
              {user.bio}
            </p>
          ) : null}
        </section>

        <section className="mt-8 space-y-3">
          {/* Edit profile */}
          <NavLink
            to="/edit-profile"
            className={`${cardClass} block`}
          >
            <div className={rowClass}>
              <span className={iconClass}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 20h9"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span>Edit Profile</span>

              <svg
                className="ml-auto text-white/35"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="m9 18 6-6-6-6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </NavLink>

          {/* Friends and messages */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <NavLink
              to="/friends"
              className={`${cardClass} block`}
            >
              <div className={rowClass}>
                <span className={iconClass}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                      strokeWidth="1.6"
                    />

                    <path
                      d="M23 21v-2a4 4 0 0 0-3-3.87"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />

                    <path
                      d="M16 3.13a4 4 0 0 1 0 7.75"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>

                <span>Friends</span>

                <svg
                  className="ml-auto text-white/35"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="m9 18 6-6-6-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </NavLink>

            <NavLink
              to="/messages"
              className={`${cardClass} block`}
            >
              <div className={rowClass}>
                <span className={iconClass}>
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
                    />
                  </svg>
                </span>

                <span>Messages</span>

                <svg
                  className="ml-auto text-white/35"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="m9 18 6-6-6-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </NavLink>
          </div>

          {/* Photos */}
          <div className={`${cardClass} p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-white/90">
                  Photos
                </h2>

                <p className="mt-0.5 text-xs text-white/40">
                  Recent activity
                </p>
              </div>

              <NavLink
                to="/photos"
                className="text-xs font-medium text-sky-200/75 hover:text-sky-100"
              >
                View all
              </NavLink>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <img
                src="/assets/messaging.avif"
                alt="Messaging"
                className="
                  aspect-[4/3] w-full rounded-2xl
                  object-cover ring-1 ring-white/10
                "
              />

              <img
                src="/assets/message02.avif"
                alt="Message"
                className="
                  aspect-[4/3] w-full rounded-2xl
                  object-cover ring-1 ring-white/10
                "
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileCard;