import { Link } from "react-router-dom";

import LogOut from "../logout/LogOut.jsx";
import Header from "../header/Header";

const Chevron = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="shrink-0 text-white/35 transition group-hover:translate-x-0.5 group-hover:text-white/70"
  >
    <path
      d="m9 18 6-6-6-6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const settingsItems = [
  {
    title: "Account",
    subtitle: "Profile, email and password",
    icon: "/assets/profile-icon.png",
    to: "/setting/account",
  },
  {
    title: "Security",
    subtitle: "Manage account security",
    icon: "/assets/security-icon.png",
    to: "/setting/security",
  },
  {
    title: "Chats",
    subtitle: "Theme, history and media",
    icon: "/assets/chat-icon.png",
    to: "/setting/chats",
  },
  {
    title: "Notifications",
    subtitle: "Message alerts",
    icon: "/assets/notifications-icon.png",
    to: "/setting/notifications",
  },
  {
    title: "Appearance",
    subtitle: "Theme and backgrounds",
    icon: "/assets/appearance-icon.png",
    to: "/setting/appearance",
  },
  {
    title: "Social",
    subtitle: "Find friends and contacts",
    icon: "/assets/social-icon.png",
    to: "/setting/social",
  },
  {
    title: "App",
    subtitle: "Language, storage and backup",
    icon: "/assets/app-icon.png",
    to: "/setting/app",
  },
  {
    title: "Support",
    subtitle: "Help, privacy and terms",
    icon: "/assets/support-icon.png",
    to: "/setting/support",
  },
];

const Setting = () => {
  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header title="Settings" showBack />

      <main
        className="
          mx-auto w-full max-w-[520px]
          px-3 pb-[100px] pt-[76px]">
        <section>
          <p className="mb-3 px-1 text-xs font-medium uppercase tracking-[0.16em] text-white/35">
            Preferences
          </p>

          <div className="space-y-2">
            {settingsItems.map((item) => (
              <Link
                key={item.title}
                to={item.to}
                className="
                  group flex min-h-16 w-full
                  items-center gap-3
                  rounded-2xl border border-white/10
                  bg-[#0b1220]/50 px-3 py-3
                  backdrop-blur-xl
                  shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
                  transition
                  hover:border-sky-300/25
                  hover:bg-[#142342]/65
                  hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]
                  active:scale-[0.99]">
                <div
                  className="
                    grid h-10 w-10 shrink-0 place-items-center
                    rounded-xl border border-white/10
                    bg-white/[0.04]
                    shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
                  <img
                    src={item.icon}
                    alt=""
                    className="h-6 w-6 object-contain opacity-85"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white/90">
                    {item.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-white/45">
                    {item.subtitle}
                  </p>
                </div>

                <Chevron />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <p className="mb-3 px-1 text-xs font-medium uppercase tracking-[0.16em] text-white/35">
            Session
          </p>

          <LogOut />
        </section>

        <p className="mt-6 text-center text-[11px] text-white/30">
          Connect version 1.0
        </p>
      </main>
    </div>
  );
};

export default Setting;