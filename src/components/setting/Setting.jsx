// import "./Setting.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import gsap from "gsap";
import LogOut from "../logout/LogOut.jsx";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import { useEffect, useState } from "react";
import ChangePassword from "./ChangePassword.jsx";
import { clearChangePassword } from "../../reducers/usersSlice.jsx";

const Setting = () => {
  const dispatch = useDispatch();
  let count = 0;
  let targets;
  useEffect(() => {
    targets = document.querySelectorAll(".list");
    gsap.set(targets, { xPercent: 100 });
    gsap.set(targets[0], { xPercent: 0 });
  }, []);

  function slideOneNext() {
    if (count === 0) {
      gsap.fromTo("#back-arrow", { opacity: 0 }, { opacity: 1, delay: 1 });
    }
    gsap.fromTo(
      targets[count],
      { xPercent: 0, zIndex: 10 },
      { delay: 0.5, duration: 1.2, xPercent: 0, zIndex: 0 }
    );
    count = count < targets.length - 1 ? ++count : 0;
    gsap.fromTo(
      targets[count],
      { xPercent: 100, zIndex: 0 },
      { xPercent: 0.2, zIndex: 10, duration: 1 }
    );
  }

  // Previous button
  function slideOnePrev() {
    dispatch(clearChangePassword());
    gsap.fromTo(
      targets[count],
      { xPercent: 0, zIndex: 10 },
      { duration: 1.2, xPercent: 0, zIndex: 0 }
    );
    count =
      count == 0 ? targets.length - 1 : count < targets.length ? --count : 0;
    gsap.fromTo(
      targets[count],
      { xPercent: 100, zIndex: 0 },
      { duration: 1, xPercent: 0, zIndex: 10 }
    );
    console.log(count);
    if (count === 0) {
      gsap.fromTo("#back-arrow", { opacity: 1 }, { opacity: 0 });
    }
    // setSlideCount(count);
  }
  console.log(count);

  return (
    <div className="component-div">
      <Header />
      <div className="mid-section">
        <NavBar />
        <div className="setting-section">
          <img
            src="./assets/left-arrow.png"
            onClick={() => slideOnePrev()}
            id="back-arrow"
          />
          <div className="setting-container">
            <div className="list list01">
              {" "}
              <div className="list01-btns-div">
                {" "}
                <div>
                  <button onClick={slideOneNext}>account setting</button>
                </div>{" "}
                <LogOut />
              </div>
            </div>

            <div className="list list02">
              {" "}
              <div className="back-arrow-img">
                {/* <img
                  src="./assets/left-arrow.png"
                  onClick={() => slideOnePrev()}
                /> */}
              </div>
              <div className="list02-btns-div">
                <button onClick={() => slideOneNext()}>Change Password</button>
                <button>Change Email</button>
                <button>Delete Account</button>
              </div>
            </div>
            <div className="list list03">
              {" "}
              <ChangePassword slideOnePrev={slideOnePrev} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Setting;
