// import "./NavBar.css";
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
    <div className="flex flex-col float-left w-[12%]
                     h-[82vh] items-start pl-2 border-r border-gray-400">
      {" "}
      <img
        onClick={menuClick}
        src="./assets/menu-icon-1.png"
        id="menu-icon-img"
        className="hidden"
      />
      <div className="flex h-full">
        <div className="menu-icon-div">
          <img
            onClick={menuClick}
            src="./assets/back-icon.png"
            className="hidden"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <NavLink
              to="/profile"
              onClick={() => dispatch(clearFriendSearch())}
              className="flex items-center mt-10 mb-10"
            >
              <img src="./assets/profile.png"
                className="w-5 h-5 mr-2" />
              Profile
            </NavLink>
            <NavLink
              to="/addnewfriend"
              onClick={() => dispatch(clearFriendSearch())}
              className="flex items-center mb-10"
            >
              <img src="./assets/add-user.png"
                className="w-5 h-5 mr-2" />
              Search
            </NavLink>
            <NavLink
              to="/friends"
              onClick={() => dispatch(clearFriendSearch())}
              className="flex items-center mb-10"
            >
              <img src="./assets/friends.png"
                className="w-5 h-5 mr-2" />
              Friends
            </NavLink>
            <NavLink
              to="/dashboard"
              onClick={() => dispatch(clearFriendSearch())}
              className="flex items-center mb-10"
            >
              <img src="./assets/msgs.png"
                className="w-5 h-5 mr-2" />
              Messages
            </NavLink>
          </div>
          <div className="mb-10">
            <NavLink to="/setting"
              className="flex items-center">
              <img src="./assets/setting.png"
                className="w-5 h-5 mr-2" />
              Setting{" "}
            </NavLink>
          </div>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default NavBar;
