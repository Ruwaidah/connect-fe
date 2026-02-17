import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../loading/Loading";
import { getMessagesBetweenTwoUsers } from "../../reducers/messagesSlice";
import PrivateMessageCard from "./PrivateMessageCard";

const MessageCard = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isMessagesLoading } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    dispatch(getMessagesBetweenTwoUsers(param.friendid));
  }, []);

  return (
    <div className="w-full h-full" id="MessageCard-component">
      <div className="h-full mid-section">
        {isMessagesLoading || !user ? (
          <Loading />
        ) : (
          <PrivateMessageCard />
        )}
      </div>
    </div>
  );
};

export default MessageCard;
