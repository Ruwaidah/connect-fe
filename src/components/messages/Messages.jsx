import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../reducers/messagesSlice";
import Loading from "../loading/Loading";

const Messages = () => {
  const dispatch = useDispatch();
  const { messages, isMessagesLoading, isMessagesError, errorMessages } =
    useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  console.log(messages)

  if (isMessagesLoading) return <Loading />;

  return <div className="Messages"></div>;
};

export default Messages;
