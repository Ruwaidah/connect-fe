import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddNewFriendForm.css";
import { useForm } from "react-hook-form";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import NavBar from "../navBar/NavBar";
import { findNewFriend } from "../../reducers/usersSlice";
import FriendCard from "./FriendCard";
import { Navigate } from "react-router-dom";

const AddNewFriendForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const {
    findFriendLoading,
    findFriendError,
    findFriendErrorMessage,
    findFriend,
  } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(findNewFriend(data));
  };


  return (
    <div className="component-div addNewFriend-component">
      <Header />
      <div className="mid-section">
        <NavBar />
        <div className="section-2-div add-new-friend-form-div">
          <form className="AddNewFriendForm" onSubmit={handleSubmit(onSubmit)}>
            <p> {findFriendLoading ? "Searching ..." : null}</p>
            <input
              className="search-input"
              type="text"
              placeholder="search"
              {...register("text", {
                required: {
                  value: true,
                  message: "Require",
                },
              })}
            />
            <input type="submit" value="Search" />
          </form>
          <div className="find-friend-div">
            {findFriend ? (
              findFriend.id == localStorage.getItem("id") ? (
                <Navigate to="/profile" />
              ) : (
                <FriendCard />
              )
            ) : (
              <p className="no-match">No match</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddNewFriendForm;
