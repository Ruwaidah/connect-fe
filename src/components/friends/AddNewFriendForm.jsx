import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  NavLink,
} from "react-router-dom";

import Header from "../header/Header";
import SearchFriendForm from "./SearchFriendForm";
import Loading from "../loading/Loading";

const AddNewFriendForm = () => {
  const {
    findFriendLoading,
    findFriend,
  } = useSelector((state) => state.user);

  const currentUserId = localStorage.getItem("id");

  const isMe = useMemo(() => {
    if (!findFriend?.id || !currentUserId) {
      return false;
    }

    return (
      String(findFriend.id) ===
      String(currentUserId)
    );
  }, [findFriend?.id, currentUserId]);

  const hasNoMatch = Boolean(
    findFriend?.message && !findFriend?.id
  );

  const hasResult = Boolean(
    findFriend?.id && !findFriend?.message
  );

  if (hasResult && isMe) {
    return <Navigate to="/profile" replace />;
  }

  const initials =
    `${findFriend?.firstName?.charAt(0) || ""}${findFriend?.lastName?.charAt(0) || ""
    }` || "U";

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Find Friend"
        subtitle="Search by username"
        showBack
      >
        <SearchFriendForm />
      </Header>

      <main
        className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-3 pb-[96px] pt-[112px]
        "
      >
        {findFriendLoading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : hasNoMatch ? (
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-[360px] text-center">
              <div
                className="
                  mx-auto grid h-20 w-20 place-items-center
                  rounded-full border border-white/10
                  bg-white/[0.04]
                  text-white/45
                  shadow-[0_0_30px_rgba(56,189,248,0.08)]
                "
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    strokeWidth="1.5"
                  />

                  <path
                    d="m20 20-4-4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8.5 8.5l5 5M13.5 8.5l-5 5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">
                No friend found
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/55">
                We could not find anyone with that username.
                Check the spelling and try again.
              </p>
            </div>
          </div>
        ) : hasResult ? (
          <div className="pt-3">
            <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wide text-white/40">
              Search result
            </p>

            <NavLink
              to={`/friend/profile/${findFriend.id}`}
              className="
                group flex w-full items-center gap-3
                rounded-2xl border border-white/10
                bg-[#0b1220]/55 p-3
                backdrop-blur-xl
                shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
                transition
                hover:border-sky-300/30
                hover:bg-[#142342]/65
                hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]
              "
            >
              <div className="relative shrink-0">
                <div
                  className="
                    absolute -inset-1 rounded-full
                    bg-sky-400/20 opacity-0 blur-lg
                    transition group-hover:opacity-100
                  "
                />

                <div
                  className="
                    relative rounded-full p-[2px]
                    bg-gradient-to-b
                    from-sky-300/60
                    via-indigo-300/20
                    to-white/10
                  "
                >
                  {findFriend.image ? (
                    <img
                      src={findFriend.image}
                      alt={`${findFriend.firstName || ""} ${findFriend.lastName || ""
                        }`}
                      className="
                        h-14 w-14 rounded-full
                        object-cover ring-1 ring-white/10
                      "
                    />
                  ) : (
                    <div
                      className="
                        grid h-14 w-14 place-items-center
                        rounded-full bg-white/10
                        text-sm font-semibold text-white/70
                        ring-1 ring-white/10
                      "
                    >
                      {initials}
                    </div>
                  )}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">
                  {findFriend.firstName}{" "}
                  {findFriend.lastName}
                </p>

                {findFriend.username ? (
                  <p className="mt-0.5 truncate text-xs text-sky-200/75">
                    @{findFriend.username}
                  </p>
                ) : null}

                <p className="mt-1 truncate text-xs text-white/45">
                  {findFriend.bio || "No status"}
                </p>
              </div>

              <div
                className="
                  grid h-10 w-10 shrink-0 place-items-center
                  rounded-xl border border-white/10
                  bg-white/[0.03] text-white/35
                  transition
                  group-hover:border-sky-300/20
                  group-hover:bg-white/[0.06]
                  group-hover:text-white/75
                "
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="m9 18 6-6-6-6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="w-full max-w-[360px] text-center">
              <div className="relative mx-auto h-28 w-28">
                <div className="absolute -inset-5 rounded-full bg-sky-400/15 blur-3xl" />

                <img
                  src="/assets/find-friend.png"
                  alt="Find a friend"
                  className="
                    relative h-full w-full object-contain
                    drop-shadow-[0_14px_30px_rgba(0,0,0,0.45)]
                  "
                />
              </div>

              <h2 className="mt-5 text-xl font-semibold text-white">
                Find new friends
              </h2>

              <p className="mt-2 text-sm leading-6 text-white/55">
                Enter a username above to find someone and
                send a friend request.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddNewFriendForm;