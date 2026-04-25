import { useNavigate } from "react-router-dom";

const Header = ({ title = "Title", subtitle, right, showBack = true, children }) => {
  const navigate = useNavigate();

  return (
    <header className="inset-x-0 z-50
      bg-white/[0.03] backdrop-blur-xl
      border-b border-white/10
      shadow-[0_10px_30px_rgba(0,0,0,0.25)] w-full">

      <div className="w-full px-2 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                grid place-items-center text-white/80 hover:bg-white/[0.06] transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 18l-6-6 6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ) : <div className="" />}

          <div className="min-w-0">
            <p className="text-white font-semibold truncate">{title}</p>
            {subtitle ? <p className="text-[11px] text-white/55 truncate">{subtitle}</p> : null}
          </div>
        </div>

        <div className="w-10 h-10 flex items-center justify-end overflow-hidden">
          {right}
        </div>
      </div>

      {children ? (
        <div className="mx-auto w-full max-w-md px-2 pb-3">
          {children}
        </div>
      ) : null}
    </header>
  );
};

export default Header;