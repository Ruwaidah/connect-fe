import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/Loading";
import Header from "../header/Header";
import { clearEditCancel } from "../../reducers/usersSlice";

const Chevron = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/60">
    <path d="M9 18l6-6-6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Row = ({ to, icon, title, subtitle, danger, onClick }) => {
  const base =
    "w-full h-14 rounded-2xl px-3 flex items-center justify-between gap-3 " +
    "border border-white/12 bg-white/[0.04] backdrop-blur-xl " +
    "shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_18px_50px_rgba(0,0,0,0.25)] " +
    "hover:bg-white/[0.06] hover:border-sky-200/25 transition active:scale-[0.99]";

  const dangerCls =
    "border-rose-300/20 bg-rose-400/10 hover:bg-rose-400/12 hover:border-rose-200/30";

  return (
    <Link to={to} onClick={onClick} className={`${base} ${danger ? dangerCls : ""}`}>
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`h-10 w-10 rounded-xl grid place-items-center border
          ${danger ? "bg-rose-400/10 border-rose-300/15" : "bg-white/[0.04] border-white/10"}
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${danger ? "text-rose-100" : "text-white/90"}`}>
            {title}
          </p>
          {subtitle ? (
            <p className="text-[11px] text-white/55 truncate">{subtitle}</p>
          ) : null}
        </div>
      </div>

      <Chevron />
    </Link>
  );
};

const AccountSetting = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full text-white flex flex-col">
      <Header
        title="Account"
        subtitle=" Manage your profile and credentials"
        showBack
      />

      <div className="mx-auto w-full max-w-md px-4 pb-24 mt-10">
        {!user ? (
          <div className="mt-8">
            <Loading />
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-2">
            <Row
              to="/setting/editusername"
              title="Username"
              subtitle={user.username}
              icon={<img src="/assets/profile-icon.png" className="w-5 h-5" alt="" />}
            />

            <Row
              to="/setting/editemail"
              title="Email"
              subtitle={user.email}
              icon={<img src="/assets/email-icon.png" className="w-5 h-5" alt="" />}
            />

            <Row
              to="/setting/editpassword"
              title="Password"
              subtitle="**********"
              onClick={() => dispatch(clearEditCancel())}
              icon={<img src="/assets/lock-icon.png" className="w-5 h-5" alt="" />}
            />

            <div className="mt-3">
              <Row
                to="/setting/account"
                title="Delete Account"
                subtitle="Permanently remove your account"
                danger
                icon={<img src="/assets/delete-icon.png" className="w-5 h-5" alt="" />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountSetting;