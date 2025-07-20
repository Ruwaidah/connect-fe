import "./Messages.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../reducers/messagesSlice";
import Loading from "../loading/Loading";
import NoMessages from "./NoMessages";
import { Link } from "react-router-dom";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, isMessagesError, errorMessages } =
    useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  const objKeys = Object.keys(messages);
  console.log(messages);
  console.log(objKeys);

  if (isMessagesLoading)
    return (
      <div className="Loading-div">
        <p>Loading ... </p>
      </div>
    );
  else if (objKeys.length === 0) return <NoMessages />;

  return (
    <div className="Messages section-2-div">
      {objKeys.map((msg, indx) => (
        <Link key={indx} className="message" to={`/messages/${messages[msg].friend.id}`}>
          <h4>
            {messages[msg].friend.firstName} {messages[msg].friend.lastName}
          </h4>
          <p>
            {messages[msg].messages[messages[msg].messages.length - 1].text}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Messages;
