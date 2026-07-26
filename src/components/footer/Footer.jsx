import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer
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
          mx-auto flex min-h-[72px] w-full max-w-[520px]
          items-center justify-between gap-3
          px-4 pt-2
          pb-[calc(env(safe-area-inset-bottom)+8px)]
        "
      >
        {/* Developer information */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-medium text-white/85">
            Built by{" "}
            <span className="font-semibold text-white">
              Ruwaidah Alfakhri
            </span>
          </p>

          <p className="mt-0.5 truncate text-[10px] text-white/45">
            Full-Stack Web Developer
          </p>
        </div>

        {/* Social links */}
        <div
          className="
            flex shrink-0 items-center gap-1.5
            rounded-2xl border border-white/10
            bg-white/[0.04] p-1.5
            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_0_18px_rgba(60,170,255,0.08)]
          "
        >
          <SocialIcon
            href="https://www.linkedin.com/in/ruwaidah-a-930b9a8b/"
            label="LinkedIn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                fill="#0288D1"
                d="M42 37c0 2.762-2.238 5-5 5H11c-2.761 0-5-2.238-5-5V11c0-2.762 2.239-5 5-5h26c2.762 0 5 2.238 5 5v26Z"
              />

              <path
                fill="#FFF"
                d="M12 19h5v17h-5V19Zm2.485-2h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12 16.035 12 16.972 13.08 17 14.499 17 15.887 16.035 17 14.485 17ZM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19 33.316 19 36 21.25 36 26.274V36Z"
              />
            </svg>
          </SocialIcon>

          <SocialIcon
            href="https://github.com/Ruwaidah"
            label="GitHub"
          >
            <img
              src="/assets/github.png"
              alt=""
              className="h-5 w-5 object-contain opacity-90"
            />
          </SocialIcon>

          <SocialIcon
            href="https://ruwaidah.dev/"
            label="Portfolio"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-white/85"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
                strokeWidth="1.7"
              />

              <path
                d="M3.6 9h16.8M3.6 15h16.8"
                strokeWidth="1.7"
                strokeLinecap="round"
              />

              <path
                d="M12 3c2.5 2.7 4 5.8 4 9s-1.5 6.3-4 9c-2.5-2.7-4-5.8-4-9s1.5-6.3 4-9Z"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SocialIcon>
        </div>
      </div>

      <div
        className="
          pointer-events-none absolute left-0 top-0
          h-px w-full
          bg-gradient-to-r
          from-transparent via-sky-400/30 to-transparent
        "
      />
    </footer>
  );
};

export default Footer;