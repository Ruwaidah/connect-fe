import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Header from "../header/Header";
import Loading from "../loading/Loading";

const Notifications = () => {
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("all");


    const {
        notifications = [],
        isNotificationsLoading = false,
    } = useSelector(
        (state) => state.notifications || {}
    );

    const sortedNotifications = useMemo(() => {
        return [...notifications]
            .filter(Boolean)
            .sort((a, b) => {
                const aTime = new Date(
                    a.created_at || a.createdAt || 0
                ).getTime();

                const bTime = new Date(
                    b.created_at || b.createdAt || 0
                ).getTime();

                return bTime - aTime;
            });
    }, [notifications]);

    const visibleNotifications = useMemo(() => {
        if (filter === "unread") {
            return sortedNotifications.filter(
                (notification) => !notification.isRead
            );
        }

        return sortedNotifications;
    }, [filter, sortedNotifications]);

    const unreadCount = sortedNotifications.filter(
        (notification) => !notification.isRead
    ).length;

    const formatNotificationTime = (dateValue) => {
        if (!dateValue) return "";

        const date = new Date(dateValue);
        const now = new Date();

        const difference =
            now.getTime() - date.getTime();

        const minutes = Math.floor(
            difference / (1000 * 60)
        );

        const hours = Math.floor(
            difference / (1000 * 60 * 60)
        );

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        if (minutes < 1) return "Just now";
        if (minutes < 60) return `${minutes}m`;
        if (hours < 24) return `${hours}h`;
        if (days < 7) return `${days}d`;

        return date.toLocaleDateString([], {
            month: "short",
            day: "numeric",
        });
    };

    const getNotificationLink = (notification) => {
        if (notification.link) {
            return notification.link;
        }

        switch (notification.type) {
            case "message":
                return notification.userId
                    ? `/messages/private/${notification.userId}`
                    : "/messages";

            case "friend_request":
                return "/friend-request";

            case "friend_accepted":
                return notification.userId
                    ? `/friend/profile/${notification.userId}`
                    : "/friends";

            case "profile":
                return notification.userId
                    ? `/friend/profile/${notification.userId}`
                    : "/profile";

            default:
                return "/notifications";
        }
    };

    const getNotificationText = (notification) => {
        if (notification.message) {
            return notification.message;
        }

        const name =
            notification.firstName ||
            notification.username ||
            "Someone";

        switch (notification.type) {
            case "message":
                return `${name} sent you a message.`;

            case "friend_request":
                return `${name} sent you a friend request.`;

            case "friend_accepted":
                return `${name} accepted your friend request.`;

            default:
                return "You have a new notification.";
        }
    };

    const getNotificationTitle = (notification) => {
        if (notification.title) {
            return notification.title;
        }

        switch (notification.type) {
            case "message":
                return "New message";

            case "friend_request":
                return "Friend request";

            case "friend_accepted":
                return "Request accepted";

            case "system":
                return "Connect update";

            default:
                return "Notification";
        }
    };

    const markNotificationRead = (notification) => {
        if (notification.isRead) return;

    };

    const markAllAsRead = () => {
        if (unreadCount === 0) return;
    };

    return (
        <div className="min-h-[100dvh] w-full text-white">
            <Header
                title="Notifications"
                subtitle={
                    unreadCount > 0
                        ? `${unreadCount} unread`
                        : "You are all caught up"
                }
                showBack
                right={
                    unreadCount > 0 ? (
                        <button
                            type="button"
                            onClick={markAllAsRead}
                            className="
                whitespace-nowrap rounded-lg
                px-2 py-1 text-[11px]
                font-medium text-sky-200
                transition
                hover:bg-sky-400/10
                hover:text-sky-100"
                        >
                            Read all
                        </button>
                    ) : null
                }
            />

            <main
                className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-3 pb-[100px] pt-[76px]">

                {/* Filters */}
                <div
                    className="
                        mb-4 grid grid-cols-2
                        rounded-xl border border-white/10
                        bg-[#0b1220]/45 p-1
                        backdrop-blur-xl">
                    <button
                        type="button"
                        onClick={() => setFilter("all")}
                        className={`
                            h-10 rounded-lg text-sm
                            font-medium transition
                            ${filter === "all"
                                ? `
                            bg-white/10 text-white
                            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]`
                                : `
                            text-white/45
                            hover:text-white/75`
                            }`}>
                        All
                    </button>

                    <button
                        type="button"
                        onClick={() => setFilter("unread")}
                        className={`
                            flex h-10 items-center
                            justify-center gap-2 rounded-lg
                            text-sm font-medium transition
                            ${filter === "unread"
                                ? `
                            bg-white/10 text-white
                            shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]`
                                : `
                            text-white/45
                            hover:text-white/75`
                            }`}>
                        Unread

                        {unreadCount > 0 ? (
                            <span
                                className="
                                    grid h-5 min-w-5 place-items-center
                                    rounded-full bg-sky-400 px-1
                                    text-[10px] font-bold text-white">
                                {unreadCount > 99
                                    ? "99+"
                                    : unreadCount}
                            </span>
                        ) : null}
                    </button>
                </div>

                {isNotificationsLoading ? (
                    <div className="flex flex-1 items-center justify-center">
                        <Loading />
                    </div>
                ) : visibleNotifications.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center px-4">
                        <div className="w-full max-w-[360px] text-center">
                            <div
                                className="
                                    relative mx-auto grid h-24 w-24
                                    place-items-center rounded-full
                                    border border-white/10
                                    bg-white/[0.04]">
                                <div
                                    className="
                                        absolute -inset-5 rounded-full
                                        bg-sky-400/15 blur-3xl"/>

                                <svg
                                    width="38"
                                    height="38"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    className="relative text-sky-200/70"
                                >
                                    <path
                                        d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    <path
                                        d="M10 21h4"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            <h2 className="mt-5 text-xl font-semibold text-white">
                                {filter === "unread"
                                    ? "No unread notifications"
                                    : "No notifications yet"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-white/50">
                                {filter === "unread"
                                    ? "You have read all your notifications."
                                    : "Messages, friend requests and account updates will appear here."}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {visibleNotifications.map(
                            (notification, index) => {
                                const notificationId =
                                    notification.id ||
                                    `${notification.type}-${index}`;

                                const image =
                                    notification.image ||
                                    notification.userImage;

                                const initials =
                                    `${notification.firstName?.charAt(
                                        0
                                    ) || ""
                                    }${notification.lastName?.charAt(
                                        0
                                    ) || ""
                                    }` || "C";

                                return (
                                    <Link
                                        key={notificationId}
                                        to={getNotificationLink(
                                            notification
                                        )}
                                        onClick={() =>
                                            markNotificationRead(
                                                notification
                                            )
                                        }
                                        className={`
                                            group relative flex w-full
                                            items-center gap-3
                                            rounded-2xl border p-3
                                            backdrop-blur-xl
                                            transition
                                            active:scale-[0.99]
                                            ${notification.isRead
                                                ? `
                                            border-white/10
                                            bg-[#0b1220]/45
                                            hover:border-white/20
                                            hover:bg-[#142342]/55`
                                                : `
                                            border-sky-300/20
                                            bg-sky-500/[0.08]
                                            shadow-[0_8px_28px_rgba(0,0,0,0.22),0_0_20px_rgba(56,189,248,0.07)]
                                            hover:border-sky-300/35
                                            hover:bg-sky-500/[0.12]`}`}>
                                        {!notification.isRead ? (
                                            <span
                                                className="
                                            absolute left-1.5 top-1/2
                                            h-1.5 w-1.5
                                            -translate-y-1/2
                                            rounded-full bg-sky-300
                                            shadow-[0_0_10px_rgba(125,211,252,0.8)]"/>
                                        ) : null}

                                        <div className="relative ml-1 shrink-0">
                                            <div
                                                className="
                                                    relative rounded-full p-[2px]
                                                    bg-gradient-to-b
                                                    from-sky-300/50
                                                    via-indigo-300/20
                                                    to-white/10">
                                                {image ? (
                                                    <img
                                                        src={image}
                                                        alt=""
                                                        className="
                                                            h-12 w-12 rounded-full
                                                            object-cover ring-1
                                                            ring-white/10"/>
                                                ) : (
                                                    <div className="
                                                        grid h-12 w-12 place-items-center
                                                        rounded-full bg-white/10
                                                        text-sm font-semibold
                                                        text-white/65
                                                        ring-1 ring-white/10">
                                                        {notification.type ===
                                                            "system"
                                                            ? "C"
                                                            : initials}
                                                    </div>
                                                )}
                                            </div>

                                            <div
                                                className="
                                                    absolute -bottom-1 -right-1
                                                    grid h-6 w-6 place-items-center
                                                    rounded-full border-2
                                                    border-[#0b1220]
                                                    bg-[#172442]
                                                    text-sky-200">
                                                {notification.type ===
                                                    "message" ? (
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                ) : notification.type ===
                                                    "friend_request" ? (
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                        />

                                                        <path
                                                            d="M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                                                            strokeWidth="1.8"
                                                        />

                                                        <path
                                                            d="M19 8v6M22 11h-6"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        width="13"
                                                        height="13"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"
                                                            strokeWidth="1.8"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                )}
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-3">
                                                <p
                                                    className={`truncate text-sm ${notification.isRead
                                                        ? "font-medium text-white/75"
                                                        : "font-semibold text-white"
                                                        }`}>
                                                    {getNotificationTitle(
                                                        notification
                                                    )}
                                                </p>

                                                <span className="shrink-0 text-[11px] text-white/35">
                                                    {formatNotificationTime(
                                                        notification.created_at ||
                                                        notification.createdAt
                                                    )}
                                                </span>
                                            </div>

                                            <p
                                                className={`mt-1 line-clamp-2 text-xs leading-5
                                                    ${notification.isRead
                                                        ? "text-white/45"
                                                        : "text-white/65"
                                                    }`}>
                                                {getNotificationText(
                                                    notification
                                                )}
                                            </p>
                                        </div>

                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            className="
                                            shrink-0 text-white/25
                                            transition
                                            group-hover:translate-x-0.5
                                            group-hover:text-white/55">
                                            <path
                                                d="m9 18 6-6-6-6"
                                                strokeWidth="1.6"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </Link>
                                );
                            }
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Notifications;