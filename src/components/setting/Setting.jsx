import { Link } from "react-router-dom";
import LogOut from "../logout/LogOut.jsx";
import Header from "../header/Header";

const itemClass =
  "w-full h-14 rounded-2xl px-3 flex items-center justify-between gap-3 " +
  "border border-white/12 bg-white/[0.04] backdrop-blur-xl " +
  "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.25)] " +
  "hover:bg-white/[0.06] hover:border-sky-200/25 transition active:scale-[0.99]";

const leftWrap = "flex items-center gap-3 min-w-0";
const iconWrap =
  "h-10 w-10 rounded-xl grid place-items-center bg-white/[0.04] border border-white/10 " +
  "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]";

const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60">
    <path d="M9 18l6-6-6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Setting = () => {
  return (
    <div className="w-full h-full text-white flex flex-col mt-6">
      <Header title="Settings" showBack />

      <div className="mx-auto w-full max-w-md px-2 py-5 pb-24 mt-10">
        {/* Account */}
        <Link className={itemClass} to="/setting/account">
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/profile-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Account</p>
              <p className="text-[11px] text-white/55 truncate">Profile, Email, Password</p>
            </div>
          </div>
          <Chevron />
        </Link>

        {/* Security */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/security-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Security</p>
              <p className="text-[11px] text-white/55 truncate">Manage account security</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* Chats */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/chat-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Chats</p>
              <p className="text-[11px] text-white/55 truncate">Theme, History, Media</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* Notifications */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/notifications-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Notifications</p>
              <p className="text-[11px] text-white/55 truncate">Message alerts</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* Appearance */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/appearance-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Appearance</p>
              <p className="text-[11px] text-white/55 truncate">Theme, Backgrounds</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* Social */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/social-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Social</p>
              <p className="text-[11px] text-white/55 truncate">Find friends, Contacts sync</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* App */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/app-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">App</p>
              <p className="text-[11px] text-white/55 truncate">Language, Storage, Backup</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* Support */}
        <div className={`${itemClass} mt-2`}>
          <div className={leftWrap}>
            <div className={iconWrap}>
              <img src="/assets/support-icon.png" className="w-6 h-6" alt="" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white/90 truncate">Support</p>
              <p className="text-[11px] text-white/55 truncate">Help, Privacy & Terms</p>
            </div>
          </div>
          <Chevron />
        </div>

        {/* Logout */}
        <div className="mt-4">
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Setting;