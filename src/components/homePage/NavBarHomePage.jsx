import { NavLink, Link } from "react-router-dom";

const NavBarHomePage = () => {
    const baseStyles = `
    text-white h-10 w-32 flex items-center justify-center rounded-md
    border border-transparent sm:text-sm sm:w-28
    max-sm:text-xs max-sm:w-20 max-sm:h-9
  `.trim();

    const navLinkClass = ({ isActive }) =>
        `${baseStyles} ${isActive ? "!border-sky-300/40 bg-white/[0.06]" : ""}`;

    return (
        <nav
            className="
        w-full flex justify-between items-center
        bg-gray-900/60 py-2 px-4
        border-b border-gray-800
        max-lg:px-2 max-sm:border-none
      "
        >
            {/* Logo */}
            <Link
                to="/"
                className="lg:text-2xl flex items-center gap-2 text-white sm:text-base"
            >
                <img
                    src="/assets/logo.png"
                    className="w-16 h-16 max-lg:w-12 max-lg:h-12 max-sm:w-10 max-sm:h-10"
                />
                Connect
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-2">
                <NavLink to="/login" end className={navLinkClass}>
                    Login
                </NavLink>

                <NavLink to="/signup" end className={navLinkClass}>
                    Sign Up
                </NavLink>
            </div>
        </nav>
    );
};

export default NavBarHomePage;
