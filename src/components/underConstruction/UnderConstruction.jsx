import { useNavigate } from "react-router-dom";

const UnderConstruction = ({ imageSrc }) => {
    const navigate = useNavigate();

    return (
        <div
            className="relative w-full min-h-[100svh] overflow-hidden
                 flex items-center justify-center px-4"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/70 via-[#070d18]/55 to-[#050a14]/80" />
            <div className="absolute inset-0 backdrop-blur-[1px]" />

            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-sky-400/15 blur-3xl" />
            <div className="absolute -bottom-28 left-8 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
            <div className="absolute -bottom-28 right-8 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl" />

            <div
                className="relative w-full max-w-[420px]
                   rounded-[28px] border border-white/15
                   bg-white/[0.05] backdrop-blur-xl
                   shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_16px_60px_rgba(0,0,0,0.45)]
                   overflow-hidden"
            >
                <div className="relative">
                    {/* <img
                        src={imageSrc}
                        alt="Under construction"
                        className="w-full h-auto object-cover select-none"
                        draggable={false}
                    /> */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#050a14]/70" />
                </div>

                <div className="px-4 pb-5 pt-10">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 h-11 rounded-xl
                         border border-white/12 bg-white/[0.04]
                         text-white/90 text-sm font-medium
                         shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                         hover:bg-white/[0.07] hover:border-white/18
                         transition active:scale-[0.99]"
                        >
                            Go back
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/messages")}
                            className="flex-1 h-11 rounded-xl
                         border border-sky-300/25 bg-sky-500/15
                         text-white text-sm font-semibold
                         shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_10px_30px_rgba(40,120,255,0.18),0_0_22px_rgba(60,170,255,0.18)]
                         hover:bg-sky-400/20 hover:border-sky-200/40
                         transition active:scale-[0.99]"
                        >
                            Back to chats
                        </button>
                    </div>

                    <div className="mt-3 text-center text-[11px] text-white/45">
                        We’re building this page — check back soon.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnderConstruction;
