// import "./LogOut.css";
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/usersSlice";
import { Link } from "react-router-dom";

const LogOut = () => {
  const dispatch = useDispatch();
  const userLoggedout = () => {
    dispatch(logout());
  };
  return (
    <div className="LogOut">
      <img src="./assets/logout.png" />
      <Link to="/" onClick={userLoggedout}>
        Log Out
      </Link>
    </div>
  );
};

export default LogOut;
