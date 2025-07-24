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
        right: window.screen.width < 600 ? "-50%" : "-75%",
        duration: 1,
        yoyo: true,
      });
    } else {
      setIsMenuOpen(false);
      gsap.to(".NavBar", {
        right: "-100%",
        duration: 1,
        yoyo: true,
      });
    }
  };

  return (
    <>
      {" "}
      <img
        onClick={menuClick}
        src="./assets/menu-icon-1.png"
        id="menu-icon-img"
      className="img-blur"
      />
      <div className="NavBar">
        <div className="menu-icon-div">
          <img
            onClick={menuClick}
            src="./assets/back-icon.png"
            className="menu-icon"
          />
        </div>
        <div className="menu-div">
          <div className="navbar-section-1">
            <NavLink
              to="/profile"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="./assets/profile.png" />
              Profile
            </NavLink>
            <NavLink
              to="/addnewfriend"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="./assets/add-user.png" />
             Search
            </NavLink>
            <NavLink
              to="/friends"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="./assets/friends.png" />
              Friends
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => dispatch(clearFriendSearch())}
            >
              <img src="./assets/msgs.png" />
              Messages
            </NavLink>
          </div>
          <div className="navbar-section-2">
            <NavLink to="/setting">
              <img src="./assets/setting.png" />
              Setting{" "}
            </NavLink>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default NavBar;
