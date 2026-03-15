import { NavLink, Link } from "react-router-dom"

const NavBarHomePage = () => {
    const baseStyles = `
  text-white h-10 w-32 
  flex items-center justify-center rounded-sm
  border border-transparent sm:text-sm sm:w-28 
  max-sm:text-xs max-sm:w-16 max-sm:h-8
`.trim();

    const navLinkClass = ({ isActive }) =>
        `${baseStyles} ${isActive ? "!border-gray-600" : ""
        }`;

    return (
        <nav className="w-full flex justify-between bg-gray-900/60
                        items-center py-2 px-4
                        border border-b-gray-800 
                        max-lg:px-1
                        max-sm:border-none">
            <Link to="/" className="lg:text-2xl flex items-center text-white sm:text-base">
                <img src="./assets/logo.png" className="w-16 h-16 mr-2 max-lg:w-12 max-lg:h-12 max-sm:mr-1" /> Connect
            </Link>
            <div className="flex justify-between items-center">
                <NavLink to='/login' end
                    className={navLinkClass}>
                    Login
                </NavLink>
                <NavLink to='/signup' end
                    className={navLinkClass}
                >
                    Sign Up
                </NavLink>
            </div>
        </nav>
    )
}

export default NavBarHomePage