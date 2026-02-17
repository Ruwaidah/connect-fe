import { Link } from "react-router-dom";

const SocialIcon = ({ link }) => {
    return (
        <Link
            type="button"
            className="h-9 w-9 rounded-full bg-white/5 border border-white/10 
                        hover:bg-white/10 transition flex items-center justify-center"
            aria-label="social">
            {link}
        </Link>
    );
}


export default SocialIcon