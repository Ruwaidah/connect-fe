const Loading = () => {
  return (
    <div className="w-full h-full min-h-[40vh] flex items-center justify-center text-white">
      <div
        className="flex items-center gap-3 rounded-2xl border border-white/15
        bg-white/[0.04] backdrop-blur-md px-5 py-4
        shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_28px_rgba(60,170,255,0.12)]"
      >
        {/* Spinner */}
        <div
          className="h-5 w-5 rounded-full border-2 border-white/25 border-t-sky-200/80
          animate-spin"
        />
        <p className="text-sm text-white/80">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;

