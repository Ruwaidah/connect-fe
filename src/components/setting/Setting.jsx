import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import LogOut from "../logout/LogOut.jsx";
import { useEffect } from "react";

const Setting = () => {
  const navigate = useNavigate();
  let targets;
  // useEffect(() => {
  //   targets = document.querySelectorAll(".list");
  //   gsap.set(targets, { xPercent: 100 });
  //   gsap.set(targets[0], { xPercent: 0 });
  // }, []);


  return (
    <div className="flex flex-col text-white justify-center items-center w-full">
      <div className="h-20 w-full text-center flex items-center justify-center">
        <div className="fixed left-2">
          <svg
            onClick={() => navigate(-1)}
            width="18" height="18"
            viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"><g id="SVGRepo_bgCarrier"
              strokeWidth="0"></g><g id="SVGRepo_tracerCarrier"
                strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <p>Setting</p>
      </div>
      <div className="mt-10 flex flex-col w-[98%]">
        <Link className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50"
          to="/setting/account">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/profile-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Account</button>
              <p className="text-[11px]">Profile, Email, Password</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </Link>

        <div className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/security-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Security</button>
              <p className="text-[11px]">Manage account security</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>

        <div className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/chat-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Chats</button>
              <p className="text-[11px]">chats theme, History, Media</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <div className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/notifications-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Notifications</button>
              <p className="text-[11px]">Message alerts</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <div className="bg-[#20274d]/70 h-14 flex items-center mb-  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/appearance-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Appearance</button>
              <p className="text-[11px]">Theme, Backgrounds</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <div className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/social-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Social</button>
              <p className="text-[11px]">Find friends, Contacts sync</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <div className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/app-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">App</button>
              <p className="text-[11px]">Language, Storage, Backup</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
        <div className="bg-[#20274d]/70 h-14 flex items-center mb-1  
                       justify-between w-full pl-2 rounded-md border border-[#20274d]/50">
          <div className="flex items-center">
            <img className="w-6 h-6"
              src="./assets/support-icon.png" />
            <div className="flex flex-col items-start ml-2">
              <button className="text-sm">Support</button>
              <p className="text-[11px]">Help, Privacy & Terms</p>
            </div>
          </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 7L15 12L10 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </div>
      </div>
      <div className="w-[98%] flex flex-col items-center justify-center">
        {" "}
        <div className="w-full">
          <LogOut />
        </div>
      </div>
    </div >
  );
};

export default Setting;
