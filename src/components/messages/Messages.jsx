// import "./Messages.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startNewChatList, getFriends } from "../../reducers/usersSlice";
import { getMessages, messageRead } from "../../reducers/messagesSlice";
import Loading from "../loading/Loading";
import NoMessages from "./NoMessages";
import { Link, NavLink } from "react-router-dom";
import SearchFriendForm from "../friends/SearchFriendForm";
import FriendsList from "../friends/FriendsList";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, isMessagesError, errorMessages } =
    useSelector((state) => state.messages);

  const {
    user,
    isStartNewChat,
    isGetFriendsLoading,
    isGettingUserError,
    isGettingUserErrorMessage,
    isGettingUserLoading,
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

  console.log(friendsList)

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
  return (
    <div className="flex flex-col w-full h-[80vh] text-white">
      <div className="flex flex-col items-center justify-between p-2 pt-4 pb-3  
                      border border-b-white/10">
        <div className="flex justify-between items-center w-full  mb-4">
          <div className="flex items-center">
            <img src="./assets/connect-logo03.png"
              className="w-8 w-8 mr-4" />
            <h2 className="font-bold text-lg">Chats</h2>
          </div>
          <NavLink to="/profile">
            <img src={user && user.image ? user.image : null}
              className="w-8 h-8 rounded-full" onClick={searchNewChat} />
          </NavLink>
        </div>
        <SearchFriendForm />
      </div>
      {isMessagesLoading || isGetFriendsLoading ? (
        <Loading />
      ) : objKeys.length === 0 ? (
        <div className="flex w-full justify-center items-center h-full">
          <NoMessages />
        </div>
      ) : isStartNewChat ? (
        <div className="StartNewChat">
          {/* <SearchFriendForm /> */}
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
            <p>{messages[msg].numberOfMsgUnread > 0 ? messages[msg].numberOfMsgUnread : null}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default Messages;
