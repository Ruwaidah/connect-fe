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
  const { isMessagesLoading, errorMessages, isMessagesError, privateMsg } =
    useSelector((state) => state.messages);

  console.log(param);
  useEffect(() => {
    dispatch(getMessagesBetweenTwoUsers(param.friendid));
  }, []);

  return (
    <div className="component-div MessageCard">
      <Header />
      <div className="mid-section">
        <NavBar />
        <div>
          {isMessagesLoading || !privateMsg ? (
            <Loading />
          ) : (
            <PrivateMessageCard />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MessageCard;
