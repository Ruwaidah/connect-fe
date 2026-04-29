import { useMemo } from "react";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { findNewFriend } from "../../reducers/usersSlice";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Icon from "../homePage/Auth/formInput/Icon";
import SearchFriendForm from "./SearchFriendForm";

const AddNewFriendForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { findFriendLoading, findFriend } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { username: "" },
    mode: "onSubmit",
  });

  const usernameValue = watch("username");

  const onSubmit = ({ username }) => {
    const value = username?.trim();
    if (!value) return;
    dispatch(findNewFriend({ username: value }));
  };

  const isMe = useMemo(() => {
    if (!findFriend?.id) return false;
    return String(findFriend.id) === String(localStorage.getItem("id"));
  }, [findFriend]);

  const hasNoMatch = Boolean(findFriend?.message);
  const hasResult = Boolean(findFriend?.id) && !hasNoMatch;

  if (hasResult && isMe) return <Navigate to="/profile" />;

  return (
    <div className="w-full min-h-[100svh] text-white flex flex-col mt-26">
      {/* Header */}
      <Header
        title="Find Friend"
        subtitle="Search by username"
        showBack
        right={<div className="w-10" />}
      >
        <SearchFriendForm />
      </Header>
      {/* Results */}
      <div className="flex-1 px-1 pb-[calc(env(safe-area-inset-bottom)+16px)]">
        {findFriendLoading ? (
          <div className="mt-10 flex justify-center">
            <div className="rounded-2xl border border-white/12 bg-white/[0.04] backdrop-blur-md px-5 py-4">
              <p className="text-sm text-white/80">Searching...</p>
            </div>
          </div>
        ) : hasNoMatch ? (
          <div className="mt-10 flex justify-center">
            <div className="px-5 py-4 text-center">
              <p className="font-medium">No match</p>
              <p className="text-sm text-white/60 mt-1">Try another username.</p>
            </div>
          </div>
        ) : hasResult ? (
          <div className="mt-4">
            <NavLink
              to={`/friend/profile/${findFriend.id}`}
              className="group w-full rounded-2xl border border-white/15 bg-white/[0.04]
                         backdrop-blur-md p-3 flex items-center gap-3
                         shadow-[0_0_0_1px_rgba(255,255,255,0.10),0_0_22px_rgba(60,170,255,0.08)]
                         hover:border-sky-200/30 hover:bg-white/[0.06] transition"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-full blur-xl bg-sky-400/10 opacity-0 group-hover:opacity-100 transition" />
                {findFriend.image ? (
                  <img
                    src={findFriend.image}
                    alt=""
                    className="relative h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
                  />
                ) : (
                  <div className="relative h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/10" />
                )}
              </div>

              <div className="min-w-0">
                <p className="font-medium truncate">
                  {findFriend.firstName} {findFriend.lastName}
                </p>
                <p className="text-xs text-white/60 truncate">@{findFriend.username}</p>
              </div>

              <div className="ml-auto text-white/60 group-hover:text-white transition">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 18l6-6-6-6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="mt-10 flex justify-center">
            <div className="px-2 pt-6 text-center">
              <p className="font-medium">Find friends</p>
              <p className="text-sm text-white/60 mt-1">
                Search by username to send a friend request.
              </p>
              <div className="mt-4 flex justify-center">
                <img className="w-28 opacity-80" src="./assets/find-friend.png" alt="Find friend" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNewFriendForm;
