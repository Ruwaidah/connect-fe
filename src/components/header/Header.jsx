import { useNavigate } from "react-router-dom";

const Header = ({
  title = "Title",
  subtitle,
  right,
  showBack = true,
  children,
  onBack,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    navigate(-1);
  };

  return (
    <header
      className="
        fixed inset-x-0 top-0 z-50
        border-b border-sky-300/15
        bg-[#0b1220]/85
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.28),0_0_0_1px_rgba(140,230,255,0.06)]
      "
    >
      <div className="mx-auto w-full max-w-[520px] px-3">
        <div className="flex h-14 w-full items-center justify-between">
          <div className="flex min-w-0 flex-1 items-center">
            {showBack ? (
              <button
                type="button"
                onClick={handleBack}
                className="
                  mr-3 grid h-10 w-10 shrink-0 place-items-center
                  rounded-xl border border-white/10
                  bg-white/[0.03] text-white/80
                  transition
                  hover:border-white/20
                  hover:bg-white/[0.07]
                  hover:text-white
                "
                aria-label="Back"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : null}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {title}
              </p>

              {subtitle ? (
                <p className="mt-0.5 truncate text-[11px] text-white/55">
                  {subtitle}
                </p>
              ) : null}
            </div>
          </div>

          <div className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden">
            {right || <div className="h-10 w-10" />}
          </div>
        </div>

        {children ? (
          <div className="w-full pb-3">
            {children}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Header;