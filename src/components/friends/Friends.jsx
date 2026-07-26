import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getFriends } from "../../reducers/usersSlice";
import FriendsList from "./FriendsList";
import SearchFriendForm from "./SearchFriendForm";
import Loading from "../loading/Loading";
import Header from "../header/Header";

const Friends = () => {
  const dispatch = useDispatch();

  const {
    user,
    isGettingUserLoading,
  } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getFriends());
  }, [dispatch]);

  const receivedFriendRequests = useMemo(() => {
    if (!user?.friendReq) return [];

    const currentUserId = String(
      user.id || localStorage.getItem("id")
    );

    return user.friendReq.filter(
      (request) =>
        String(request.userRecieveRequest) === currentUserId
    );
  }, [user]);

  const requestCount = receivedFriendRequests.length;

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Friends"
        showBack
        right={
          <Link
            to="/addnewfriend"
            className="
              grid h-10 w-10 place-items-center
              rounded-xl border border-white/10
              bg-white/[0.03] text-white/80
              transition
              hover:border-sky-300/25
              hover:bg-white/[0.07]
              hover:text-white
            "
            aria-label="Add friend"
            title="Add friend"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M19 8v6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />

              <path
                d="M22 11h-6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        }
      >
        {user ? <SearchFriendForm /> : null}
      </Header>

      <main
        className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-3 pb-[96px] pt-[112px]">
        {isGettingUserLoading || !user ? (
          <div className="flex flex-1 items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {requestCount > 0 ? (
              <Link
                to="/friend-request"
                className="
                  group mb-3 flex w-full
                  items-center justify-between gap-3
                  rounded-2xl border border-sky-300/20
                  bg-[#0b1220]/50 p-3
                  backdrop-blur-xl
                  shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_0_1px_rgba(255,255,255,0.04)]
                  transition
                  hover:border-sky-300/35
                  hover:bg-[#142342]/65
                  hover:shadow-[0_12px_34px_rgba(0,0,0,0.28),0_0_22px_rgba(60,170,255,0.10)]
                "
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      grid h-11 w-11 shrink-0
                      place-items-center rounded-xl
                      border border-sky-300/25
                      bg-sky-400/10 text-sky-200
                      shadow-[0_0_18px_rgba(60,170,255,0.12)]
                    "
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M19 8v6"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />

                      <path
                        d="M22 11h-6"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      Friend Requests
                    </p>

                    <p className="mt-0.5 truncate text-xs text-white/50">
                      Review who wants to connect
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <span
                    className="
                      grid h-6 min-w-6 place-items-center
                      rounded-full bg-sky-400 px-1.5
                      text-[11px] font-bold text-white
                      shadow-[0_0_18px_rgba(60,170,255,0.30)]
                    "
                  >
                    {requestCount > 99 ? "99+" : requestCount}
                  </span>

                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="
                      text-white/35 transition
                      group-hover:translate-x-0.5
                      group-hover:text-white/70
                    "
                  >
                    <path
                      d="m9 18 6-6-6-6"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </Link>
            ) : null}

            <div className="flex flex-1 flex-col">
              <FriendsList />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Friends;