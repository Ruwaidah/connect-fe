import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginDemoUser } from "../../reducers/usersSlice";

const demoAccounts = [
    {
        key: "alex",
        name: "Alex Morgan",
        username: "demo_alex",
        image: import.meta.env.VITE_NO_IMAGE,
        description:
            "Use this account in your regular browser.",
    },
    {
        key: "sarah",
        name: "Sarah Johnson",
        username: "demo_sarah",
        image: import.meta.env.VITE_NO_IMAGE,
        description:
            "Use this account in an incognito window or another browser.",
    },
];

const DemoMode = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        isAuthLoading,
        isAuthError,
        errorMessage,
    } = useSelector((state) => state.user);

    const startDemo = async (account) => {
        try {
            await dispatch(loginDemoUser(account)).unwrap();

            navigate("/messages", {
                replace: true,
            });
        } catch (error) {
            console.error("Demo login failed:", error);
        }
    };

    return (
        <main
            className="
                flex min-h-[100dvh] w-full
                items-center justify-center
                px-4 py-10 text-white">
            <div className="w-full max-w-[760px]">
                <div className="text-center">
                    <p
                        className="
                            text-xs font-semibold uppercase
                            tracking-[0.22em] text-sky-200/70">
                        Interactive Demo
                    </p>

                    <h1 className="mt-3 text-3xl font-semibold">
                        Choose a demo account
                    </h1>

                    <p
                        className="
                            mx-auto mt-3 max-w-xl
                            text-sm leading-6 text-white/55">
                        No login is required. Choose an account and start
                        exploring the app.
                    </p>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-2">
                    {demoAccounts.map((account) => (
                        <button
                            key={account.key}
                            type="button"
                            onClick={() => startDemo(account.key)}
                            disabled={isAuthLoading}
                            className="
                                group rounded-3xl border
                                border-white/10
                                bg-[#0b1220]/55 p-5
                                text-left backdrop-blur-xl
                                shadow-[0_14px_40px_rgba(0,0,0,0.28)]
                                transition
                                hover:-translate-y-1
                                hover:border-sky-300/30
                                hover:bg-[#142342]/70
                                disabled:cursor-not-allowed
                                disabled:opacity-50">
                            <div className="flex items-center gap-4">
                                <div
                                    className="
                                        rounded-full p-[2px]
                                        bg-gradient-to-b
                                        from-sky-300/60
                                        via-indigo-300/25
                                        to-white/10">
                                    <img
                                        src={account.image}
                                        alt={account.name}
                                        className="
                                            h-16 w-16 rounded-full
                                            object-cover ring-1 ring-white/10"/>
                                </div>

                                <div className="min-w-0">
                                    <h2 className="truncate text-lg font-semibold">
                                        {account.name}
                                    </h2>

                                    <p className="mt-0.5 text-sm text-sky-200/70">
                                        @{account.username}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-sm leading-6 text-white/50">
                                {account.description}
                            </p>

                            <div
                                className="
                                    mt-5 flex h-11 items-center
                                    justify-center gap-2
                                    rounded-xl border
                                    border-sky-300/25
                                    bg-sky-500/15
                                    text-sm font-semibold
                                    transition
                                    group-hover:bg-sky-400/20">
                                Continue as {account.name.split(" ")[0]}

                                <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="m9 18 6-6-6-6"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>

                {isAuthLoading ? (
                    <p className="mt-5 text-center text-sm text-sky-200">
                        Opening demo account...
                    </p>
                ) : null}

                {isAuthError ? (
                    <div
                        className="
                            mt-5 rounded-xl border
                            border-rose-400/25
                            bg-rose-500/10 px-4 py-3
                            text-center text-sm text-rose-200">
                        {errorMessage || "Unable to open demo mode."}
                    </div>
                ) : null}

                <div
                    className="
                        mt-7 rounded-2xl border
                        border-white/10 bg-white/[0.03]
                        px-4 py-4">
                    <p className="text-sm font-medium text-white/80">
                        Test messaging between both accounts
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/50">
                        Open Alex in your normal browser, then open this page
                        in an incognito window and choose Sarah.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default DemoMode;