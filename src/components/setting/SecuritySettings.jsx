import { Link } from "react-router-dom";

import Header from "../header/Header";

const Chevron = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className="
      shrink-0 text-white/35
      transition
      group-hover:translate-x-0.5
      group-hover:text-white/70
    "
  >
    <path
      d="m9 18 6-6-6-6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingRow = ({
  to,
  title,
  subtitle,
  icon,
}) => {
  return (
    <Link
      to={to}
      className="
        group flex min-h-16 w-full
        items-center gap-3
        rounded-2xl border border-white/10
        bg-[#0b1220]/50
        px-3 py-3
        backdrop-blur-xl
        shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
        transition
        hover:border-sky-300/25
        hover:bg-[#142342]/65
        hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]
        active:scale-[0.99]
      "
    >
      <div
        className="
          grid h-10 w-10 shrink-0
          place-items-center rounded-xl
          border border-white/10
          bg-white/[0.04]
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white/90">
          {title}
        </p>

        <p className="mt-0.5 truncate text-xs text-white/45">
          {subtitle}
        </p>
      </div>

      <Chevron />
    </Link>
  );
};

const SecuritySetting = () => {
  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Security"
        subtitle="Protect your account"
        showBack
      />

      <main
        className="
          mx-auto w-full max-w-[520px]
          px-3 pb-[100px] pt-[78px]
        "
      >
        <section>
          <p
            className="
              mb-3 px-1
              text-xs font-medium uppercase
              tracking-[0.16em]
              text-white/35
            "
          >
            Privacy & Security
          </p>

          <div className="space-y-2">
            <SettingRow
              to="/setting/security/blocked"
              title="Blocked Users"
              subtitle="View and manage blocked accounts"
              icon={
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    strokeWidth="1.6"
                  />

                  <path
                    d="m6.5 17.5 11-11"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />

            <SettingRow
              to="/setting/security/sessions"
              title="Active Sessions"
              subtitle="See where your account is signed in"
              icon={
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="11"
                    rx="2"
                    strokeWidth="1.6"
                  />

                  <path
                    d="M9 20h6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />

                  <path
                    d="M12 16v4"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              }
            />

            <SettingRow
              to="/setting/security/login-activity"
              title="Login Activity"
              subtitle="Review recent account access"
              icon={
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 8v4l3 2"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    strokeWidth="1.6"
                  />
                </svg>
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default SecuritySetting;