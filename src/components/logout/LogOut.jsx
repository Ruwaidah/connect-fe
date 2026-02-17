// import "./LogOut.css";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/usersSlice";
import { NavLink } from "react-router-dom";
import { disconnectSocket } from "../../socket";


const LogOut = () => {
  const dispatch = useDispatch();
  const userLoggedout = () => {
    disconnectSocket();
    dispatch(logout());
  };
  return (
    <div
      className="bg-[#f35353]/20 h-14 flex items-center my-1 rounded-md border border-[#f35353]/20"
      to="/" onClick={userLoggedout}
    >
      <NavLink
        className="w-full h-full flex items-center pl-2"
      >
        <img className="w-6 h-6"
          src="./assets/logout-icon.png" />

        <span className="ml-4 text-[#e497b3]">Log Out</span>

      </NavLink>
    </div>
  );
};

export default LogOut;
