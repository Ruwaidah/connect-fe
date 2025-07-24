import "./FriendProfile.css";
import { useSelector } from "react-redux";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import FriendCard from "./FriendCard";

const FriendProfile = () => {
  const { isDeleteUser } = useSelector((state) => state.user);
  return (
    <div
      className={isDeleteUser ? "component-div blur-div-out" : "component-div"}
    >
      <Header />
      <div className="mid-section">
        <NavBar />
        <FriendCard />
      </div>
      <Footer />
    </div>
  );
};

export default FriendProfile;
