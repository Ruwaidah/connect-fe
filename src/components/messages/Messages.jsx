import "./Messages.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNewChatList, getFriends } from "../../reducers/usersSlice";
import { getMessages, messageRead } from "../../reducers/messagesSlice";
import Loading from "../loading/Loading";
import NoMessages from "./NoMessages";
import { Link } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";
import FriendsList from "../friends/FriendsList";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, isMessagesError, errorMessages } =
    useSelector((state) => state.messages);

  const {
    isStartNewChat,
    isGetFriendsLoading,
    isGetFriendsError,
    isGetFriendsErrorMessage,
    friendsList,
  } = useSelector((state) => state.user);

  setTimeout(() => {
    const e = document.getElementsByClassName("message");
    if (e.length > 0) {
      gsap.to(".message", {
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut",
      });
    }
  }, 50);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isStartNewChat) {
        gsap.from(".StartNewChat .SearchFriendForm", {
          duration: 1,
          ease: "circ.out",
          x: "100%",
        });

        gsap.to(".StartNewChat .SearchFriendForm", {
          duration: 1,
          ease: "circ.out",
          x: "0",
          opacity: 1,
        });

        for (let i = 0; i <= friendsList.length - 1; i++) {
          document.getElementById(`.StartNewChat .FriendsList .friend-${i}`);
          try {
            gsap.from(`.StartNewChat .FriendsList #friend-${i}`, {
              duration: 1,
              ease: "circ.out",
              x: "100%",
              delay: 0.4,
            });

            gsap.to(`.StartNewChat .FriendsList #friend-${i}`, {
              duration: 1,
              ease: "circ.out",
              x: "0",
              opacity: 1,
              delay: 0.4,
            });
          } catch {
            return;
          }
        }
      }
    }, 200);
  }, [isStartNewChat, isGetFriendsLoading]);

  // ************************** OPEN UNREAD MESSAGE ******************************
  const openPrivateMsg = (data) => {
    console.log("open");
    dispatch(
      messageRead({
        numberOfMsgUnread: data.numberOfMsgUnread,
        data: {
          userId: localStorage.getItem("id"),
          friendId: data.friend.id,
        },
      })
    );
  };

  const searchNewChat = () => {
    dispatch(startNewChatList(!isStartNewChat));
    dispatch(getFriends());
  };

  const objKeys = Object.keys(messages);
  console.log(messages);
  return (
    <div className="Messages section-2-div">
      <div className="messages-header page-header">
        <div>
          <img src="./assets/msgs.png" />
          <h2>Messages</h2>
        </div>

        <img src="./assets/new-msg.png" onClick={searchNewChat} />
      </div>
      {isMessagesLoading || isGetFriendsLoading ? (
        <Loading />
      ) : objKeys.length === 0 ? (
        <NoMessages />
      ) : isStartNewChat ? (
        <div className="StartNewChat">
          <SearchFriendForm />
          <FriendsList />
        </div>
      ) : (
        objKeys.map((msg, indx) => (
          <Link
            key={indx}
            className="message"
            onClick={() => openPrivateMsg(messages[msg])}
            to={`/messages/${messages[msg].friend.id}`}
          >
            <div>
              <h4>
                {messages[msg].friend.firstName} {messages[msg].friend.lastName}
              </h4>
              <p>
                {messages[msg].messages[messages[msg].messages.length - 1].text}
              </p>
            </div>
            <p>{messages[msg].numberOfMsgUnread> 0 ? messages[msg].numberOfMsgUnread: null}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Messages;
