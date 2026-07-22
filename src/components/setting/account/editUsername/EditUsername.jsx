import { useSelector } from "react-redux";

import Loading from "../../../loading/Loading";
import EditUsernameForm from "./EdiUsernameForm";
import Header from "../../../header/Header";

const EditUsername = () => {
    const { user, isGettingUserLoading } = useSelector(
        (state) => state.user
    );

    const initials =
        `${user?.firstName?.charAt(0) || ""}${user?.lastName?.charAt(0) || ""
        }` || "U";

    return (
        <div className="min-h-[100dvh] w-full text-white">
            <Header
                title="Username"
                subtitle="Choose a new username"
                showBack
            />

            <main
                className="
          mx-auto flex min-h-[100dvh] w-full
          max-w-[520px] flex-col
          px-4 pb-[100px] pt-[88px]
        "
            >
                {isGettingUserLoading || !user ? (
                    <div className="flex flex-1 items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="mx-auto w-full max-w-[460px]">
                        {/* Profile preview */}
                        <section className="flex flex-col items-center text-center">
                            <div className="relative">
                                <div className="absolute -inset-5 rounded-full bg-sky-400/15 blur-3xl" />

                                <div
                                    className="
                    relative rounded-full p-[3px]
                    bg-gradient-to-b
                    from-sky-300/60
                    via-indigo-300/20
                    to-white/10
                    shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_24px_rgba(60,170,255,0.14)]
                  "
                                >
                                    {user.image ? (
                                        <img
                                            src={user.image}
                                            alt={`${user.firstName || ""} ${user.lastName || ""
                                                }`}
                                            className="
                        h-24 w-24 rounded-full
                        object-cover ring-1 ring-white/10
                      "
                                        />
                                    ) : (
                                        <div
                                            className="
                        grid h-24 w-24 place-items-center
                        rounded-full bg-white/10
                        text-xl font-semibold text-white/70
                        ring-1 ring-white/10
                      "
                                        >
                                            {initials}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <p className="mt-4 text-lg font-semibold text-white">
                                @{user.username}
                            </p>

                            <p className="mt-1 text-xs text-white/45">
                                Your current username
                            </p>
                        </section>

                        {/* Form */}
                        <section className="mt-7">
                            <EditUsernameForm />
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EditUsername;