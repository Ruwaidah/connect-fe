import "./NavBar.css"
import { NavLink } from "react-router-dom";
import LogOut from "../logout/LogOut";

const NavBar = () => {
  return <div className="NavBar">
    <NavLink>Message</NavLink>
    <NavLink>Friends</NavLink>
    <NavLink>Profile</NavLink>
    {/* <LogOut /> */}
  </div>;
};

export default NavBar;
