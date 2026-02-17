import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import { socket, connectSocket, disconnectSocket } from "../socket";
import {
  addIncomingMessage,
  setActiveChat,
  clearActiveChat,
  markThreadRead,
  messageRead,
} from "../reducers/messagesSlice";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();
  const activeChatFriendId = useSelector((s) => s.messages.activeChatFriendId);
  const hideNav = location.pathname.startsWith("/messages/private");

  useEffect(() => {
    const m = location.pathname.match(/^\/messages\/private\/(\d+)(\/)?$/);
    if (m?.[1]) dispatch(setActiveChat(m[1]));
    else dispatch(clearActiveChat());
  }, [dispatch, location.pathname]);

  useEffect(() => {
    if (!token) return;
    connectSocket();
    const myId = Number(localStorage.getItem("id"));
    const onNew = ({ message }) => {
      dispatch(addIncomingMessage(message));
      const friendId = String(message.senderId === myId ? message.receiverId : message.senderId);
      if (String(activeChatFriendId) === friendId && message.receiverId === myId) {
        dispatch(markThreadRead(friendId));
        dispatch(messageRead({ data: { userId: myId, friendId: Number(friendId) } }));
      }
    };

    socket.on("MESSAGE_NEW", onNew);
    return () => {
      socket.off("MESSAGE_NEW", onNew);
      disconnectSocket();
    };
  }, [dispatch, token, activeChatFriendId]);

  return token ? (
    <div className="bg-[url('../../assets/bg-003.png')] w-full bg-cover bg-center h-[100vh] flex flex-col items-center">
      <Outlet />
      {!hideNav && <NavBar />}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default PrivateRoute;
