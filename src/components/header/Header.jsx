import { useNavigate } from "react-router-dom";

const Header = ({ title = "Title", subtitle, right, showBack = true, children }) => {
  const navigate = useNavigate();

  return (
    <header
      className="
        fixed top-0 inset-x-0 z-50
        bg-[#0b1220]/45 backdrop-blur-xl
        border-b border-sky-300/15
        shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(140,230,255,0.06)]
      "
    >
      <div className="flex flex-col px-2 flex flex-col">
        <div className="h-14 w-full flex items-center justify-between">
          <div className="flex items-center min-w-0">
            {showBack ? (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="mr-2 h-10 w-10 rounded-xl border border-white/10 bg-white/[0.03]
                  grid place-items-center text-white/80 hover:bg-white/[0.06] transition"
                aria-label="Back"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <div className="" />
            )}

            <div className="min-w-0">
              <p className="text-white font-semibold truncate">{title}</p>
              {subtitle ? (
                <p className="text-[11px] text-white/55 truncate">{subtitle}</p>
              ) : null}
            </div>
          </div>

          <div className="w-10 h-10 flex items-center justify-end overflow-hidden">
            {right}
          </div>
        </div>

        {children ? <div className="pb-3 max-w-[420px]">{children}</div> : null}
      </div>
    </header>
  );
};

export default Header;