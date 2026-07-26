import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../loading/Loading";
import { getMessagesBetweenTwoUsers } from "../../reducers/messagesSlice";
import PrivateMessageCard from "./PrivateMessageCard";

const MessageCard = () => {
  const { friendid } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const {
    isMessagesLoading,
    isMessagesError,
    errorMessages,
  } = useSelector((state) => state.messages);

  useEffect(() => {
    if (!friendid) return;

    dispatch(getMessagesBetweenTwoUsers(friendid));
  }, [dispatch, friendid]);

  if (isMessagesLoading || !user) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isMessagesError) {
    return (
      <div className="flex min-h-[100dvh] w-full items-center justify-center px-4 text-white">
        <div
          className="
            w-full max-w-[420px]
            rounded-2xl border border-rose-400/20
            bg-rose-500/10 px-4 py-4
            text-center text-sm text-rose-200
          "
        >
          {errorMessages || "Unable to load this conversation."}
        </div>
      </div>
    );
  }

  return (
    <div
      id="MessageCard-component"
      className="min-h-[100dvh] w-full"
    >
      <PrivateMessageCard />
    </div>
  );
};

export default MessageCard;