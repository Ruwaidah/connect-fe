import { useSelector } from "react-redux";
import FriendCard from "./FriendCard";

const FriendProfile = () => {
  const { isDeleteUser } = useSelector((state) => state.user);
  return (
    <FriendCard />
  );
};

export default FriendProfile;
