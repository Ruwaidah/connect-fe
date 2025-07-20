import Footer from "../footer/Footer";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import FriendCard from "./FriendCard";

const FriendProfile = () => {
  return (
    <div className="component-div FriendProfile">
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
