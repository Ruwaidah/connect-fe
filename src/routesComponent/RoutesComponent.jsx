import { Route, Routes } from "react-router-dom";
import { socket } from "../socket";
import { useDispatch } from "react-redux";
import HomePage from "../components/homePage/HomePage";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "../components/homePage/Auth/ResetPassword/ResetPassword";
import { useEffect } from "react";
import { getUser } from "../reducers/usersSlice";
import Friends from "../components/friends/Friends";
import AddNewFriendForm from "../components/friends/AddNewFriendForm";
import Setting from "../components/setting/Setting";
import NoPageFound from "../components/noPageFound/NoPageFound";
import FriendCard from "../components/friends/FriendCard";
import MessageCard from "../components/messages/MessageCard";
import NewNotification from "../components/notifications/NewNotification";
import FriendsRequests from "../components/friends/FriendsRequests/FriendsRequests";
import Login from "../components/homePage/Auth/Login/Login";
import SignUp from "../components/homePage/Auth/SignUp/SignUp";
import Layout from "./Layout";
import Messages from "../components/messages/Messages";
import StartNewChat from "../components/messages/StartNewChat";
import ProfileForm from "../components/profile/ProfileForm";
import AccountSetting from "../components/setting/AccountSetting";
import EditUsername from "../components/setting/account/editUsername/EditUsername";
import EditEmail from "../components/setting/account/editEmail/EditEmail";
import EditPassword from "../components/setting/account/editPassword/EditPassword";
import ProfileCard from "../components/profile/ProfileCard";

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
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path="/messages"
          element={<Messages />}
        />
        <Route
          path="/new-chat-friends-list"
          element={<StartNewChat />}
        />
        <Route
          path="/profile"
          element={<ProfileCard />}
        />
        <Route
          path="/edit-profile"
          element={<ProfileForm />}
        />
        <Route
          path="/friends"
          element={<Friends />}
        />
        <Route
          path="/friend/profile/:friendid"
          element={<FriendCard />}
        />
        <Route
          path="/messages/private/:friendid"
          element={<MessageCard />}
        />
        <Route
          path="/addnewfriend"
          element={<AddNewFriendForm />}
        />
        <Route
          path="/friend-request"
          element={<FriendsRequests />}
        />
        <Route
          path="/setting"
          element={<Setting />}
        />
        <Route
          path="/setting/account"
          element={<AccountSetting />}
        />
        <Route
          path="/setting/editusername"
          element={<EditUsername />}
        />
        <Route
          path="/setting/editemail"
          element={<EditEmail />}
        />
        <Route
          path="/setting/editpassword"
          element={<EditPassword />}
        />
        <Route
          path="/notifications"
          element={<NewNotification />}
        />
      </Route>
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
};

export default RoutesComponent;
