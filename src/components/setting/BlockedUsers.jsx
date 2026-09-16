import { useEffect } from "react";
import {
    useDispatch,
    useSelector,
} from "react-redux";

import Header from "../header/Header";
import Loading from "../loading/Loading";

import {
    getBlockedUsers,
    unblockUser,
} from "../../reducers/usersSlice";

const BlockedUsers = () => {
    const dispatch = useDispatch();

    const {
        blockedUsers,
        blockedUsersLoading,
    } = useSelector(
        (state) => state.user
    );

    const currentUserId = Number(
        localStorage.getItem("id")
    );

    useEffect(() => {
        console.log("blocked")

        dispatch(getBlockedUsers());
    }, [dispatch]);

    const handleUnblock = async (
        blockedId
    ) => {
        try {
            await dispatch(
                unblockUser({
                    blockerId: currentUserId,
                    blockedId,
                })
            ).unwrap();
        } catch (error) {
            console.error(
                "Unable to unblock user:",
                error
            );
        }
    };

    return (
        <div className="min-h-[100dvh] text-white">
            <Header
                title="Blocked Users"
                showBack />

            <main className="
                    mx-auto w-full max-w-[520px]
                    px-3 pb-[100px] pt-[84px]">
                {blockedUsersLoading ? (
                    <div className="flex justify-center pt-20">
                        <Loading />
                    </div>
                ) : blockedUsers.length === 0 ? (
                    <div className="pt-20 text-center">
                        <h2 className="text-lg font-semibold">
                            No blocked users
                        </h2>
                        <p className="mt-2 text-sm text-white/45">
                            Users you block will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {blockedUsers.map(
                            (blockedUser) => (
                                <div key={blockedUser.id}
                                    className="
                                        flex items-center gap-3
                                        rounded-2xl border
                                        border-white/10
                                        bg-[#0b1220]/55
                                        p-3 backdrop-blur-xl">
                                    {blockedUser.image ? (
                                        <img src={blockedUser.image}
                                            alt=""
                                            className="
                                                    h-12 w-12
                                                    rounded-full
                                                    object-cover"/>
                                    ) : (
                                        <div className="
                                                grid h-12 w-12
                                                place-items-center
                                                rounded-full
                                                bg-white/10">
                                            {blockedUser
                                                .firstName?.[0] ||
                                                "U"}
                                        </div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold">
                                            {blockedUser.firstName}
                                            {" "}
                                            {blockedUser.lastName}
                                        </p>

                                        <p className="truncate text-xs text-white/45">
                                            @{blockedUser.username}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleUnblock(
                                                blockedUser.id)}
                                        className="
                                            rounded-xl border
                                            border-sky-300/25
                                            bg-sky-500/15
                                            px-4 py-2
                                            text-xs font-semibold
                                            text-sky-100
                                            transition
                                            hover:bg-sky-400/20">
                                        Unblock
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default BlockedUsers;