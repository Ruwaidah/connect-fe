import { useNavigate } from "react-router-dom";

const Header = ({
  title = "",
  showBack = false,
  onBack,
  leftIcon = null,   // JSX (logo) when showBack=false
  right = null,      // JSX (button/link/icon)
  children = null,   // second row (Search, tabs, etc.)
}) => {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
      <div className="mx-auto w-full max-w-md px-4 pt-4 pb-3">
        <div className="flex items-center justify-between gap-3">
          {/* Left */}
          <div className="flex items-center gap-3 min-w-0">
            {showBack ? (
              <button
                type="button"
                onClick={onBack ? onBack : () => navigate(-1)}
                className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                           grid place-items-center text-white/80
                           hover:bg-white/[0.06] hover:text-white transition
                           shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                aria-label="Back"
                title="Back"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 18l-6-6 6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              leftIcon
            )}

            <p className="font-semibold text-lg truncate">{title}</p>
          </div>

          {/* Right */}
          <div className="shrink-0">{right}</div>
        </div>

        {/* Extra row (Search) */}
        {children ? <div className="mt-3">{children}</div> : null}
      </div>

      <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-sky-400/25 to-transparent" />
    </div>
  );
};

export default Header;