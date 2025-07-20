import "./DashBoard.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../reducers/messagesSlice";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer.jsx";
import Header from "../header/Header.jsx";
import Messages from "../messages/Messages.jsx";

const DashBoard = () => {
  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <div className="component-div">
      <Header />
      <div className="mid-section">
        <NavBar />
        <Messages />
      </div>{" "}
      <Footer />
    </div>
  );
};

export default DashBoard;
