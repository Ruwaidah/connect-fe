import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import AppShell from "./AppShell";
import NavBar from "../components/navBar/NavBar";

import {
  socket,
  connectSocket,
  disconnectSocket,
} from "../socket";

import {
  addIncomingMessage,
  clearActiveChat,
  getMessages,
  markThreadRead,
  messageRead,
  setActiveChat,
} from "../reducers/messagesSlice";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();

  const activeChatFriendId = useSelector(
    (state) => state.messages.activeChatFriendId
  );

  const hideNav = location.pathname.startsWith(
    "/messages/private"
  );

  useEffect(() => {
    const match = location.pathname.match(
      /^\/messages\/private\/(\d+)\/?$/
    );

    if (match?.[1]) {
      dispatch(setActiveChat(match[1]));
    } else {
      dispatch(clearActiveChat());
    }
  }, [dispatch, location.pathname]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const currentToken = localStorage.getItem("token");

    if (!userId || !currentToken) return;

    dispatch(getMessages());
  }, [dispatch]);

  useEffect(() => {
    if (!token) return;

    connectSocket();

    const myId = Number(localStorage.getItem("id"));

    const onNewMessage = (message) => {
      if (!message) return;

      dispatch(addIncomingMessage(message));

      const friendId = String(
        Number(message.senderId) === myId
          ? message.receiverId
          : message.senderId
      );

      const isCurrentChat =
        String(activeChatFriendId) === friendId;

      const messageIsForMe =
        Number(message.receiverId) === myId;

      if (isCurrentChat && messageIsForMe) {
        dispatch(markThreadRead(friendId));

        dispatch(
          messageRead({
            data: {
              userId: myId,
              friendId: Number(friendId),
            },
          })
        );
      }
    };

    socket.on("NEW_MESSAGE", onNewMessage);

    return () => {
      socket.off("NEW_MESSAGE", onNewMessage);
      disconnectSocket();
    };
  }, [dispatch, token, activeChatFriendId]);

  return token ? (
    <AppShell>
      <Outlet />

      {!hideNav ? <NavBar /> : null}
    </AppShell>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;