import SocialIcon from "./SocialIcon";

const Footer = () => {
  return (
    <footer
      className="
        fixed bottom-0 left-0 w-full z-50
        h-[72px]
        px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+12px)]
        bg-white/[0.03] backdrop-blur-xl
        border-t border-sky-300/20
        shadow-[0_-10px_30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(140,230,255,0.10)]
      "
    >
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3">
        {/* Left */}
        <div className="min-w-0 flex flex-col">
          <p className="text-[12px] font-medium text-white/90 truncate">
            Built by <span className="text-white">Ruwaidah Alfakhri</span>
          </p>
          <p className="text-[10px] text-white/55 truncate">
            Full Stack Web Developer
          </p>
        </div>

        {/* Right */}
        <div
          className="
            flex items-center gap-2
            rounded-2xl border border-sky-300/25
            bg-white/[0.05] px-2 py-2
            shadow-[0_0_0_1px_rgba(110,200,255,0.20),0_0_18px_rgba(60,170,255,0.12),inset_0_0_18px_rgba(120,220,255,0.08)]
          "
        >
          {/* LinkedIn */}
          <SocialIcon href="https://www.linkedin.com/in/ruwaidah-a-930b9a8b/" label="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#0288D1"
                d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
              />
              <path
                fill="#FFF"
                d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36z"
              />
            </svg>
          </SocialIcon>

          {/* GitHub */}
          <SocialIcon href="https://github.com/Ruwaidah" label="GitHub">
            <img src="/assets/github.png" alt="" className="h-5 w-5 opacity-90" />
          </SocialIcon>

          {/* Portfolio */}
          <SocialIcon href="https://ru-portfolio.onrender.com" label="Portfolio">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="h-5 w-5 text-white/90"
            >
              <path
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.6 9h16.8M3.6 15h16.8"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
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

      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
    </footer>
  );
};

export default Footer;