import { useEffect, useRef } from "react";
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
  friendshipAcceptedLive,
  friendshipDeletedLive,
} from "../reducers/messagesSlice";

import {
  getFriendById,
  getFriends,
  getUser,
  friendRequestReceivedLive,
  friendRequestCancelledLive,
  friendRequestAcceptedLive,
  friendRequestRejectedLive,
  friendDeletedLive
} from "../reducers/usersSlice";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();

  const activeChatFriendId = useSelector(
    (state) => state.messages.activeChatFriendId
  );

  const activeChatRef = useRef(activeChatFriendId);

  const hideNav = location.pathname.startsWith(
    "/messages/private"
  );

  useEffect(() => {
    activeChatRef.current = activeChatFriendId;
  }, [activeChatFriendId]);

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
    dispatch(getFriends());
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
        String(activeChatRef.current) === friendId;

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

    const refreshFriendData = () => {
      dispatch(getUser());
      dispatch(getFriends());
    };

    const onFriendRequestReceived = (payload) => {
      dispatch(friendRequestReceivedLive(payload));
    };

    const onFriendRequestCancelled = (payload) => {
      dispatch(friendRequestCancelledLive(payload));
    };

    const onFriendRequestAccepted = (payload) => {
      dispatch(friendRequestAcceptedLive(payload));

      if (payload?.otherUserId) {
        dispatch(
          friendshipAcceptedLive({
            otherUserId: payload.otherUserId,
          })
        );
      }
    };

    const onFriendRequestRejected = (payload) => {
      console.log(
        "FRONTEND RECEIVED REJECT LIVE:",
        payload
      );
      dispatch(friendRequestRejectedLive(payload));
    };

    const onFriendDeleted = (payload) => {
      dispatch(friendDeletedLive(payload));

      const myId = Number(localStorage.getItem("id"));

      const otherUserId =
        myId === Number(payload.userId)
          ? Number(payload.friendId)
          : Number(payload.userId);

      dispatch(
        friendshipDeletedLive({
          otherUserId,
        })
      );
    };

    socket.on("NEW_MESSAGE", onNewMessage);

    socket.on(
      "FRIEND_REQUEST_RECEIVED",
      onFriendRequestReceived
    );

    socket.on(
      "FRIEND_REQUEST_ACCEPTED_LIVE",
      onFriendRequestAccepted
    );

    socket.on(
      "FRIEND_REQUEST_CANCELLED_LIVE",
      onFriendRequestCancelled
    );

    socket.on(
      "FRIEND_REQUEST_REJECTED_LIVE",
      onFriendRequestRejected
    );

    socket.on(
      "FRIEND_DELETED_LIVE",
      onFriendDeleted
    );

    return () => {
      socket.off("NEW_MESSAGE", onNewMessage);

      socket.off(
        "FRIEND_REQUEST_RECEIVED",
        onFriendRequestReceived
      );

      socket.off(
        "FRIEND_REQUEST_ACCEPTED_LIVE",
        onFriendRequestAccepted
      );

      socket.off(
        "FRIEND_REQUEST_CANCELLED_LIVE",
        onFriendRequestCancelled
      );

      socket.off(
        "FRIEND_REQUEST_REJECTED_LIVE",
        onFriendRequestRejected
      );

      socket.off(
        "FRIEND_DELETED_LIVE",
        onFriendDeleted
      );

      disconnectSocket();
    };
  }, [dispatch, token]);

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