import Footer from "../footer/Footer";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
// import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";
import { clearFriendSearch } from "../../reducers/usersSlice";
import { useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const { isGettingUserLoading } = useSelector((state) => state.user);
  // useEffect(() => {
  //   dispatch(clearFriendSearch());
  // }, []);

  if (isGettingUserLoading)
    return (
      <div className="Loading-div">
        <p>Loading ... </p>
      </div>
    );
  return (
    <div className="component-div">
      <Header />
      <div className="mid-section">
        <NavBar />
        <ProfileCard />
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
