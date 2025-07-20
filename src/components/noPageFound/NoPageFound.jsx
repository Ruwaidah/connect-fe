import { Link } from "react-router-dom";
import "./NoPageFound.css";

const NoPageFound = () => {
  return (
    <div className="NoPageFound">
      <p>No Page Found</p>
      return to <Link to="/"> Home</Link>
    </div>
  );
};

export default NoPageFound;
