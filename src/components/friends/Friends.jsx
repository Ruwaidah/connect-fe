// import "./Friends.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../reducers/usersSlice";
import FriendsList from "./FriendsList";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import NoFriends from "./NoFriends";
import SearchFriendForm from "./SearchFriendForm";
import { Link } from "react-router-dom";
import FriendsRequests from "./FriendsRequests/FriendsRequests";
import Loading from "../loading/Loading";

const Friends = () => {
  const dispatch = useDispatch();
  const {
    isGetFriendsLoading,
    isGetFriendsError,
    isGetFriendsErrorMessage,
    friendsList,
    user,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriends());
  }, []);
  return (
    <div className="component-div">
      <Header />
      <div className="mid-section friend-component-div">
        <NavBar />
        <div className="friends-forms-friendslist-div">
          <div className="friends-header page-header">
            <div>
              <img src="./assets/friends.png" />
              <h2>Friends</h2>
            </div>
            <Link to="/addnewfriend">
              <img src="./assets/add-user.png" />
            </Link>{" "}
          </div>
          {user ? (
            <>
              {" "}
              {user.friendReq.filter(
                (d) => d.userRecieveRequest == localStorage.getItem("id")
              ).length > 0 ? (
                <Link className="friend-request-div" to="/friend-request">
                  {" "}
                  <p className="friend-request-p">{`You have ${
                    user.friendReq.filter(
                      (d) => d.userRecieveRequest == localStorage.getItem("id")
                    ).length
                  } friends request`}</p>
                  <img src="./assets/arrow.png" />{" "}
                </Link>
              ) : null}{" "}
              <SearchFriendForm />
              <FriendsList />
            </>
          ) : (
            <Loading />
          )}
        </div>{" "}
      </div>
      <Footer />
    </div>
  );
};

export default Friends;
