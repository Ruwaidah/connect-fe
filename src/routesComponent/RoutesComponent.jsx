import { Route, Routes } from "react-router-dom";
import uniqid from "uniqid";
import { socket } from "../socket";
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
import NewNotification from "../components/notifications/NewNotification";
import FriendsRequests from "../components/friends/FriendsRequests/FriendsRequests";
import Login from "../components/homePage/Auth/Login/Login";
import SignUp from "../components/homePage/Auth/SignUp/SignUp";
import Layout from "./Layout";
import Messages from "../components/messages/Messages";

const RoutesComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id")) {
      socket.emit("reconnect", localStorage.getItem("id"));
      dispatch(getUser());
    }
  }, [localStorage.getItem("id")]);
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="reset-password" element={<ResetPassword />} /> */}
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/messages"
          element={[
            <NewNotification key={uniqid()} />,
            <Messages key={uniqid()} />,
          ]}
        />
        <Route
          path="/profile"
          element={[
            <NewNotification key={uniqid()} />,
            <Profile key={uniqid()} />,
          ]}
        />
        <Route
          path="/friends"
          element={[
            <NewNotification key={uniqid()} />,
            <Friends key={uniqid()} />,
          ]}
        />
        <Route
          path="/friend/profile/:friendid"
          element={[
            <NewNotification key={uniqid()} />,
            <FriendProfile key={uniqid()} />,
          ]}
        />
        <Route
          path="/messages/:friendid"
          element={[
            ,
            <NewNotification key={uniqid()} />,
            <MessageCard key={uniqid()} />,
          ]}
        />
        <Route
          path="/addnewfriend"
          element={[
            <NewNotification key={uniqid()} />,
            <AddNewFriendForm key={uniqid()} />,
          ]}
        />
        <Route
          path="//friend-request"
          element={[
            <NewNotification key={uniqid()} />,
            <FriendsRequests key={uniqid()} />,
          ]}
        />
        <Route
          path="/setting"
          element={[<NewNotification key={uniqid()} />, <Setting key={uniqid()} />]}
        />
      </Route>
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default RoutesComponent;
