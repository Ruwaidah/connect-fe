import { useNavigate } from "react-router-dom";
import Header from "../header/Header";

const UnderConstruction = ({ imageSrc }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full text-white flex flex-col mt-18">
            <Header
                title="Notifications"
                showBack={true}
                leftIcon={<img src="/assets/logo.png" className="w-10 h-10" alt="Connect" />}
            />
            <div className="px-4 pb-5 pt-10 flex flex-col justify-center h-[90%]">
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

                <div className="mt-3 text-center text-[11px] text-white/60">
                    We’re building this page — check back soon.
                </div>
            </div>
        </div>
    );
};

export default UnderConstruction;
