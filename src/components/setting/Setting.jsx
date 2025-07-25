import "./Setting.css";
import { Link } from "react-router-dom";
import LogOut from "../logout/LogOut.jsx";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import { useState } from "react";

const Setting = () => {
  const [isAccountSetting, setIsAccountSetting] = useState(false);
  return (
    <div className="component-div">
      <Header />
      <div className="mid-section">
        <NavBar />
        <div className="setting-section">
          {isAccountSetting ? (
            <div className="acount-setting-list">
              <div className="back-arrow-img">
                <img
                  src="./assets/left-arrow.png"
                  onClick={() => setIsAccountSetting(false)}
                />
              </div>
              <button>Change Password</button>
              <button>Change Email</button>
              <button>Delete Account</button>
            </div>
          ) : (
            <div className="setting-list">
              <button onClick={() => setIsAccountSetting(true)}>
                account setting
              </button>
              <LogOut />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Setting;
