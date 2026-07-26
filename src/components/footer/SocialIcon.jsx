const SocialIcon = ({ href, label, children }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="
        grid h-9 w-9 shrink-0 place-items-center
        rounded-full border border-white/10
        bg-white/[0.05] text-white/80
        shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]
        transition duration-200
        hover:-translate-y-0.5
        hover:border-sky-300/25
        hover:bg-white/10
        hover:text-white
        hover:shadow-[0_0_18px_rgba(56,189,248,0.12)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-sky-300/40
      "
        >
            {children}
        </a>
    );
};

export default SocialIcon;