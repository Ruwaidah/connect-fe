import "./DashBoard.css"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../reducers/messagesSlice";
import NavBar from "../navBar/NavBar";

const DashBoard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <div className="DashBoard">
      <NavBar />
    </div>
  );
};

export default DashBoard;
