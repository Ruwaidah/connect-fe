import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
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

  const submitBtn = (e) => {
    e.preventDefault();
    document.getElementById("submit-search-user").click();
  };

  const onSubmit = (data) => {
    dispatch(findNewFriend(data));
  };

  console.log(findFriend)
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center bg-gray-200 p-2 py-4">
        <img src="./assets/add-user.png"
          className="w-6 h-6 mr-2" />
        <h2 className="font-bold">Search</h2>
      </div>
      <form className="flex items-center h-10
                        justify-between bg-blue-100 mt-1 mx-1 rounded-sm"
        onSubmit={handleSubmit(onSubmit)}>

        <input
          className="pl-2"
          type="text"
          placeholder="search for friend"
          {...register("username", {
            required: {
              value: true,
              message: "Require",
            },
          })}
        />
        <input type="submit" value="Search" id="submit-search-user"
          className="hidden" />
        <img src="./assets/searching.png" onClick={submitBtn}
          className="w-6 h-6 cursor-pointer" />
      </form>
      <div className="find-friend-div h-full">
        {findFriendLoading ?
          <p

          > Searching ...</p> :
          findFriend ? (
            findFriend.id == localStorage.getItem("id") ? (
              <Navigate to="/profile" />
            ) : (
              <FriendCard />
            )
          ) : (
            <div className="flex items-center justify-center">
              <p className="no-match">No Match</p>
            </div>)}
      </div>
    </div>
  );
};

export default AddNewFriendForm;
