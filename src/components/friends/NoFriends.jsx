import { Link } from "react-router-dom";

const NoFriends = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[70%]">
      <img className="w-30 h-30"
        src="./assets/friends-list.png" />
      <p>No Friends yet</p>
      <Link
        to="/addnewfriend"
        className="w-[92%] mt-4 h-11 rounded-2xl
             flex items-center justify-center gap-2
             bg-sky-500/20 border border-sky-300/30
             text-white text-sm font-medium
             shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_12px_34px_rgba(40,120,255,0.22),0_0_30px_rgba(80,200,255,0.18)]
             hover:bg-sky-400/25 hover:border-sky-200/45
             active:scale-[0.99] transition"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19 8v6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 11h-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Add New Friend
      </Link>
    </div>)

};

export default NoFriends;
