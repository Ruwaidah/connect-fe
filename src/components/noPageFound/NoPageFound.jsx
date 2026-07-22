import { useNavigate } from "react-router-dom";

const NoPageFound = () => {
  const navigate = useNavigate();

  return (
    <main
      className="
        relative flex min-h-[100dvh] w-full
        items-center justify-center overflow-hidden
        bg-[#050814]
        bg-[url('/assets/background.jpg')]
        bg-cover bg-center bg-no-repeat
        px-4 text-white
      "
    >
      <div className="absolute inset-0 bg-[#050814]/45" />

      <div className="relative z-10 w-full max-w-[420px] text-center">
        <div
          className="
            mx-auto grid h-24 w-24 place-items-center
            rounded-3xl border border-sky-300/20
            bg-[#0b1220]/55
            text-3xl font-bold text-sky-200
            backdrop-blur-xl
            shadow-[0_0_30px_rgba(56,189,248,0.12)]
          "
        >
          404
        </div>

        <h1 className="mt-6 text-2xl font-semibold">
          Page under construction
        </h1>

        <p className="mt-2 text-sm leading-6 text-white/55">
          This page is not available yet. We are currently working on it.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            mt-7 flex h-12 w-full
            items-center justify-center gap-2
            rounded-xl border border-sky-300/30
            bg-sky-500/20
            text-sm font-semibold text-white
            shadow-[0_10px_30px_rgba(40,120,255,0.18)]
            transition
            hover:border-sky-200/50
            hover:bg-sky-400/25
            active:scale-[0.99]
          "
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

          Go Back
        </button>
      </div>
    </main>
  );
};

export default NoPageFound;