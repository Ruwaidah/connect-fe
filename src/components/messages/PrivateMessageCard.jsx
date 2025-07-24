import "./PrivateMessageCard.css";
import { useSelector } from "react-redux";
import PrivateMessageForm from "./PrivateMessageForm";
import { useRef, useEffect, useState } from "react";
import NoMessages from "./NoMessages";

const PrivateMessageCard = () => {
  const [sendMsg, setSendMsg] = useState(false);
  const { user, findFriend } = useSelector((state) => state.user);
  const { privateMsg } = useSelector((state) => state.messages);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [privateMsg, sendMsg]);
  console.log(privateMsg);
  return (
    <div className="PrivateMessageCard">
      <div className="friend-info">
        <img src={privateMsg.friend.image} />
        <h3>
          {`${privateMsg.friend.firstName} ${privateMsg.friend.lastName}`}
        </h3>
      </div>
      <div className="messages-section">
        {privateMsg.messages.length < 1 ? (
          <NoMessages />
        ) : (
          privateMsg.messages.map((msg, indx) => (
            <>
              {indx > 0 &&
              msg.create_at.split("T")[0] !==
                privateMsg.messages[indx - 1].create_at.split("T")[0] ? (
                <p className="date-para">{msg.create_at.split("T")[0]}</p>
              ) : indx === 0 ? (
                <p className="date-para"> {msg.create_at.split("T")[0]}</p>
              ) : null}

              <div
                key={indx}
                className={
                  msg.senderId == localStorage.getItem("id")
                    ? "right-side-text msg-private-img-text"
                    : "left-side-text msg-private-img-text"
                }
              >
                <img
                  src={
                    privateMsg.friend.id === msg.senderId
                      ? privateMsg.friend.image
                      : user.image
                  }
                />
                <div className="text-div">
                  <p> {msg.text}</p>
                </div>
              </div>
            </>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <PrivateMessageForm setSendMsg={setSendMsg} sendMsg={sendMsg} />
    </div>
  );
};

export default PrivateMessageCard;
