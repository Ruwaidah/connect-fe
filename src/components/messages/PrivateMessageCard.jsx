import "./PrivateMessageCard.css";
import { useSelector } from "react-redux";

const PrivateMessageCard = () => {
  const { privateMsg } = useSelector((state) => state.messages);
  console.log(privateMsg);

  return <div className="PrivateMessageCard"></div>;
};

export default PrivateMessageCard;
