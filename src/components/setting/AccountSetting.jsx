import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../loading/Loading";
import Header from "../header/Header";
import { clearEditCancel } from "../../reducers/usersSlice";

const Chevron = ({ danger = false }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    className={`
      shrink-0 transition
      ${danger
        ? "text-rose-200/50 group-hover:text-rose-100"
        : "text-white/35 group-hover:translate-x-0.5 group-hover:text-white/70"
      }
    `}
  >
    <path
      d="m9 18 6-6-6-6"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SettingRow = ({
  to,
  icon,
  title,
  subtitle,
  danger = false,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        group flex min-h-16 w-full
        items-center gap-3 rounded-2xl
        border px-3 py-3
        backdrop-blur-xl
        transition active:scale-[0.99]
        ${danger
          ? `
              border-rose-400/20
              bg-rose-500/[0.08]
              hover:border-rose-300/35
              hover:bg-rose-500/12
              shadow-[0_8px_28px_rgba(0,0,0,0.18),0_0_18px_rgba(244,63,94,0.06)]
            `
          : `
              border-white/10
              bg-[#0b1220]/50
              hover:border-sky-300/25
              hover:bg-[#142342]/65
              shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
              hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]
            `
        }
      `}
    >
      <div
        className={`
          grid h-10 w-10 shrink-0 place-items-center
          rounded-xl border
          shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]
          ${danger
            ? "border-rose-300/15 bg-rose-400/10"
            : "border-white/10 bg-white/[0.04]"
          }
        `}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p
          className={`
            truncate text-sm font-semibold
            ${danger ? "text-rose-100" : "text-white/90"}
          `}
        >
          {title}
        </p>

        {subtitle ? (
          <p
            className={`
              mt-0.5 truncate text-xs
              ${danger
                ? "text-rose-100/55"
                : "text-white/45"
              }
            `}
          >
            {subtitle}
          </p>
        ) : null}
      </div>

      <Chevron danger={danger} />
    </Link>
  );
};

const AccountSetting = () => {
  const dispatch = useDispatch();

  const { user, isGettingUserLoading } = useSelector(
    (state) => state.user
  );

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Account"
        subtitle="Manage your profile and credentials"
        showBack
      />

      <main
        className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-3 pb-[100px] pt-[78px]
        "
      >
        {isGettingUserLoading || !user ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <section>
              <p
                className="
                  mb-3 px-1 text-xs font-medium
                  uppercase tracking-[0.16em]
                  text-white/35
                "
              >
                Account details
              </p>

              <div className="space-y-2">
                <SettingRow
                  to="/setting/editusername"
                  title="Username"
                  subtitle={`@${user.username}`}
                  icon={
                    <img
                      src="/assets/profile-icon.png"
                      className="h-5 w-5 object-contain"
                      alt=""
                    />
                  }
                />

                <SettingRow
                  to="/setting/editemail"
                  title="Email"
                  subtitle={user.email}
                  icon={
                    <img
                      src="/assets/email-icon.png"
                      className="h-5 w-5 object-contain"
                      alt=""
                    />
                  }
                />

                <SettingRow
                  to="/setting/editpassword"
                  title="Password"
                  subtitle="Change your account password"
                  onClick={() => dispatch(clearEditCancel())}
                  icon={
                    <img
                      src="/assets/lock-icon.png"
                      className="h-5 w-5 object-contain"
                      alt=""
                    />
                  }
                />
              </div>
            </section>

            <section className="mt-7">
              <p
                className="
                  mb-3 px-1 text-xs font-medium
                  uppercase tracking-[0.16em]
                  text-rose-200/45
                "
              >
                Danger zone
              </p>

              <SettingRow
                to="/setting/delete-account"
                title="Delete Account"
                subtitle="Permanently remove your account and data"
                danger
                icon={
                  <img
                    src="/assets/delete-icon.png"
                    className="h-5 w-5 object-contain"
                    alt=""
                  />
                }
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default AccountSetting;