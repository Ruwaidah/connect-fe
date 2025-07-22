import "./Friends.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../reducers/usersSlice";
import FriendsList from "./FriendsList";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import NoFriends from "./NoFriends";
import SearchFriendForm from "./SearchFriendForm";

const Friends = () => {
  const dispatch = useDispatch();
  const {
    isGetFriendsLoading,
    isGetFriendsError,
    isGetFriendsErrorMessage,
    friendsList,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriends());
  }, []);

  return (
    <div className="component-div">
      <Header />
      <div className="mid-section">
        <NavBar />
        <div className="friends-forms-friendslist-div">
          {/* <div className="friends-forms-div"> */}
            <SearchFriendForm />
          {/* </div> */}
          <FriendsList />
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default Friends;
