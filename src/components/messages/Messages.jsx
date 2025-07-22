import "./Messages.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNewChatList, getFriends } from "../../reducers/usersSlice";
import { getMessages } from "../../reducers/messagesSlice";
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
    gsap.to(".message", {
      opacity: 1,
      duration: 1,
      ease: "power1.inOut",
    });
  }, 100);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (isStartNewChat) {
        for (let i = 0; i <= friendsList.length - 1; i++) {
          document.getElementById(`.StartNewChat .FriendsList .friend-${i}`);
          try {
            gsap.from(`.StartNewChat .FriendsList #friend-${i}`, {
              duration: 1,
              ease: "circ.out",
              x: "100%",
            });

            gsap.to(`.StartNewChat .FriendsList #friend-${i}`, {
              duration: 1,
              ease: "circ.out",
              x: "0",
              opacity: 1,
            });
          } catch {
            return;
          }
        }
      }
      // else {
      //   gsap.from(".message", {
      //     duration: 1,
      //     ease: "circ.out",
      //     x: "100%",
      //   });
      //   gsap.to(".message", {
      //     duration: 1,
      //     ease: "circ.out",
      //     x: "0",
      //     opacity: 1,
      //   });
      // }
    }, 200);
  }, [isStartNewChat, isGetFriendsLoading]);

  const searchNewChat = () => {
    dispatch(startNewChatList(!isStartNewChat));
    dispatch(getFriends());
  };


  const objKeys = Object.keys(messages);

  return (
    <div className="Messages section-2-div">
      <div className="messages-header">
        <h2>Messages</h2>
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
            to={`/messages/${messages[msg].friend.id}`}
          >
            <h4>
              {messages[msg].friend.firstName} {messages[msg].friend.lastName}
            </h4>
            <p>
              {messages[msg].messages[messages[msg].messages.length - 1].text}
            </p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Messages;
