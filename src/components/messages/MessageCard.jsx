import "./MessageCard.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../header/Header";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import Loading from "../loading/Loading";
import { getMessagesBetweenTwoUsers } from "../../reducers/messagesSlice";
import PrivateMessageCard from "./PrivateMessageCard";

const MessageCard = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { isMessagesLoading, privateMsg } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    dispatch(getMessagesBetweenTwoUsers(param.friendid));
  }, []);

  return (
    <div className="component-div MessageCard" id="MessageCard-component">
      <Header />
      <div className="mid-section">
        <NavBar />
        {isMessagesLoading || !privateMsg || !user ? (
          <Loading />
        ) : (
          <PrivateMessageCard />
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default MessageCard;
