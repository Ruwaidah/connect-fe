import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../reducers/messagesSlice";
import Messages from "../messages/Messages.jsx";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);

  // console.log(localStorage.clear())
  useEffect(() => {
    dispatch(getMessages());
  }, []);


  return (
      <Messages />
  );
};

export default DashBoard;
