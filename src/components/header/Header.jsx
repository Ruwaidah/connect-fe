import { useNavigate } from "react-router-dom";

const Header = ({ title = "Title", subtitle, right, showBack = true }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 inset-x-0 z-50
      bg-white/[0.03] backdrop-blur-xl
      border-b border-white/10
      shadow-[0_10px_30px_rgba(0,0,0,0.25)]">

      <div className="mx-auto w-full max-w-3xl px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                grid place-items-center text-white/80 hover:bg-white/[0.06] transition"
              aria-label="Back"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : null}

          <div className="min-w-0">
            <p className="text-white font-semibold truncate">{title}</p>
            {subtitle ? (
              <p className="text-[11px] text-white/55 truncate">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div className="shrink-0">{right}</div>
      </div>
    </header>
  );
};

export default Header;