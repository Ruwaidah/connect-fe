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
    <div className="h-12 flex items-center
              my-1 rounded-xl
              border border-[#f35353]/20
              bg-[#f35353]/15"
      onClick={userLoggedout}>
      <NavLink to="/" className="flex h-full w-full
              items-center px-3">
        <img className="h-5 w-5"
          src="/assets/logout-icon.png"
          alt="" />

        <span className="ml-3 text-[13px] font-medium text-[#e497b3]">
          Log Out
        </span>
      </NavLink>
    </div>
  );
};

export default LogOut;