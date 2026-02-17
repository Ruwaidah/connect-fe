import { NavLink } from "react-router-dom";

const NoFriends = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[70%]">
      <img className="w-30 h-30"
        src="./assets/friends-list.png" />
      <p>No Friends yet</p>
      <NavLink to="/addnewfriend" className="bg-[#3261d5] py-2 px-10 m-2 text-sm rounded-lg">
        Add New Friend
      </NavLink>
    </div>)

};

export default NoFriends;
