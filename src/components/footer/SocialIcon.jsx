import { Link } from "react-router-dom";

const SocialIcon = ({ href, label, children }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="h-9 w-9 rounded-full bg-white/5 border border-white/10 
                 hover:bg-white/10 transition flex items-center justify-center
                 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
        >
            {children}
        </a>
    );
};

export default SocialIcon;