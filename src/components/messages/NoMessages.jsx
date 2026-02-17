import { NavLink } from "react-router-dom";

const NoMessages = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="./assets/nomessage.png"
        className="w-30 h-30" />
      <h2 className="text-xl py-2">No Chats yet</h2>
      <p className="text-xs pb-2">Start a new conversation</p>
      <NavLink to="/new-chat-friends-list" className="bg-[#3261d5] py-2 px-10 m-2 text-sm rounded-lg">Start a New Chat</NavLink>
    </div>
  );
};

export default NoMessages;
