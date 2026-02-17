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
        shadow-[0_-10px_30px_rgba(0,0,0,0.35),0_0_0_1px_rgba(140,230,255,0.10)]">
      <div className="mx-auto flex w-full max-w-md items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-medium text-white/90 truncate">
            Built by <span className="text-white">Ruwaidah Alfakhri</span>
          </p>
          <p className="text-[10px] text-white/55 truncate">
            Full Stack Web Developer
          </p>
        </div>
        <div
          className="
            flex items-center gap-2
            rounded-2xl border border-sky-300/25
            bg-white/[0.05] px-2 py-2
            shadow-[0_0_0_1px_rgba(110,200,255,0.20),0_0_18px_rgba(60,170,255,0.12),inset_0_0_18px_rgba(120,220,255,0.08)]">
          <SocialIcon />
          <SocialIcon
            link={<svg width="28" height="28" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 48 48">
              <path fill="#0288D1" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"></path><path fill="#FFF" d="M12 19H17V36H12zM14.485 17h-.028C12.965 17 12 15.888 12 14.499 12 13.08 12.995 12 14.514 12c1.521 0 2.458 1.08 2.486 2.499C17 15.887 16.035 17 14.485 17zM36 36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698-1.501 0-2.313 1.012-2.707 1.99C24.957 25.543 25 26.511 25 27v9h-5V19h5v2.616C25.721 20.5 26.85 19 29.738 19c3.578 0 6.261 2.25 6.261 7.274L36 36 36 36z"></path>
            </svg>} />
          <SocialIcon
            link={
              <img src="../assets/github.png" />}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
    </footer>
  );
};

export default Footer;
