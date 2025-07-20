import "./Setting.css";
import LogOut from "../logout/LogOut.jsx";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";


const Setting = () => {
  return (
    <div className="component-div">
      <Header />
      <div className="mid-section">
        <NavBar />
        <LogOut />
      </div>
      <Footer />
    </div>
  );
};

export default Setting;
