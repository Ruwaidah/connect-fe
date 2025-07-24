import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomePage from "../components/homePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "../components/homePage/Auth/ResetPassword/ResetPassword";
import DashBoard from "../components/dashBoard/DashBoard";
import { useEffect } from "react";
import { getUser } from "../reducers/usersSlice";
import Profile from "../components/profile/Profile";
import Header from "../components/header/Header";
import Friends from "../components/friends/Friends";
import AddNewFriendForm from "../components/friends/AddNewFriendForm";
import Setting from "../components/setting/Setting";
import NoPageFound from "../components/noPageFound/NoPageFound";
import FriendCard from "../components/friends/FriendCard";
import FriendProfile from "../components/friends/FriendProfile";
import MessageCard from "../components/messages/MessageCard";
import FriendsRequests from "../components/friends/FriendsRequests/FriendsRequests";

const RoutesComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      dispatch(getUser());
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/friend/profile/:friendid" element={<FriendProfile />} />
        <Route path="/messages/:friendid" element={<MessageCard />} />
        <Route path="/addnewfriend" element={<AddNewFriendForm />} />
        <Route path="//friend-request" element={<FriendsRequests />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default RoutesComponent;
