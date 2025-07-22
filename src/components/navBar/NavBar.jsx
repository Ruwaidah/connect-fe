import "./NavBar.css";
import gsap from "gsap";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearFriendSearch } from "../../reducers/usersSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuClick = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      gsap.registerPlugin();
      gsap.to(".NavBar", {
        right: 0,
        duration: 2,
        yoyo: true,
      });
    } else {
      setIsMenuOpen(false);
      gsap.to(".NavBar", {
        right: "-100%",
        duration: 2,
        yoyo: true,
      });
    }
  };

  return (
    <>
      <img
        onClick={menuClick}
        src="../src/assets/menu-icon-1.png"
        id="menu-icon-img"
      />

      <div className="NavBar">
        <div className="menu-icon-div">
          <img
            onClick={menuClick}
            src="../src/assets/back-icon.png"
            className="menu-icon"
          />
        </div>
        <div className="menu-div">
          <div className="navbar-section-1">
            <NavLink
              to="/profile"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="../src/assets/profile.png" />
              Profile
            </NavLink>
            <NavLink
              to="/addnewfriend"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="../src/assets/add-user.png" />
              Add Friend
            </NavLink>
            <NavLink
              to="/friends"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="../src/assets/friends.png" />
              Friends
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="../src/assets/msgs.png" />
              Messages
            </NavLink>
          </div>
          <div className="navbar-section-2">
            <NavLink to="/setting">
              <img src="../src/assets/setting.png" />
              Setting{" "}
            </NavLink>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default NavBar;
