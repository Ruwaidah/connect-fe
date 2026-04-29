const ConfirmDialog = ({
    open,
    title = "Are you sure?",
    description,
    confirmText = "Delete",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    tone = "danger", // "danger" | "primary"
}) => {
    if (!open) return null;

    const confirmBtn =
        tone === "danger"
            ? "bg-rose-500/15 border-rose-400/30 text-rose-100 hover:bg-rose-500/20 hover:border-rose-300/45 shadow-[0_0_0_1px_rgba(255,90,95,0.18),0_0_18px_rgba(255,90,95,0.12)]"
            : "bg-sky-500/20 border-sky-300/30 text-white hover:bg-sky-400/25 hover:border-sky-200/45 shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_18px_rgba(60,170,255,0.12)]";

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-2">
            <button
                type="button"
                onClick={onCancel}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                aria-label="Close dialog"
            />

            <div
                className="relative w-full max-w-[360px] rounded-3xl
          border border-white/12 bg-[#0b1220]/55 backdrop-blur-xl
          shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_20px_70px_rgba(0,0,0,0.55)]
          overflow-hidden"
            >
                <div className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />

                <div className="py-4 px-2">
                    <div className="flex items-start gap-3">
                        <div className="mt-0.5 h-10 w-10 rounded-2xl grid place-items-center
              bg-white/[0.05] border border-white/10">
                            {tone === "danger" ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-rose-200">
                                    <path d="M12 9v4" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M12 17h.01" strokeWidth="1.6" strokeLinecap="round" />
                                    <path d="M10.3 3.3h3.4L22 21H2L10.3 3.3Z" strokeWidth="1.6" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-sky-200">
                                    <path d="M12 22s8-4 8-10V6l-8-3-8 3v6c0 6 8 10 8 10Z" strokeWidth="1.6" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>

                        <div className="min-w-0">
                            <p className="text-white font-semibold">{title}</p>
                            {description ? (
                                <p className="mt-1 text-sm text-white/65 leading-relaxed">{description}</p>
                            ) : null}
                        </div>
                    </div>

                    <div className="mt-5 flex gap-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 h-11 rounded-2xl border border-white/10 bg-white/[0.03]
                text-white/80 hover:bg-white/[0.06] transition
                shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                        >
                            {cancelText}
                        </button>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className={`flex-1 h-11 rounded-2xl border transition ${confirmBtn}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;