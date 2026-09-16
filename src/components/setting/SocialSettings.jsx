import { Link } from "react-router-dom";
import Header from "../header/Header";

const SocialSettings = () => {
    return (
        <div className="min-h-[100dvh] w-full text-white">
            <Header title="Social" showBack />

            <main
                className="
                    mx-auto w-full max-w-[520px]
                    px-3 pb-[100px] pt-[76px]">
                <div className="space-y-2">
                    <Link
                        to="/addnewfriend"
                        className="
                            flex min-h-16 items-center
                            rounded-2xl border border-white/10
                            bg-[#0b1220]/50 px-4
                            transition
                            hover:border-sky-300/25
                            hover:bg-[#142342]/65">
                        <div className="flex-1">
                            <p className="text-sm font-semibold">
                                Find Friends
                            </p>

                            <p className="mt-0.5 text-xs text-white/45">
                                Search for people to connect with
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/friend-request"
                        className="
                            flex min-h-16 items-center
                            rounded-2xl border border-white/10
                            bg-[#0b1220]/50 px-4
                            transition
                            hover:border-sky-300/25
                            hover:bg-[#142342]/65">
                        <div className="flex-1">
                            <p className="text-sm font-semibold">
                                Friend Requests
                            </p>

                            <p className="mt-0.5 text-xs text-white/45">
                                Review pending requests
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/setting/social/blocked"
                        className="
                            flex min-h-16 items-center
                            rounded-2xl border border-white/10
                            bg-[#0b1220]/50 px-4
                            transition
                            hover:border-rose-300/25
                            hover:bg-[#142342]/65">
                        <div className="flex-1">
                            <p className="text-sm font-semibold">
                                Blocked Users
                            </p>

                            <p className="mt-0.5 text-xs text-white/45">
                                View and unblock people
                            </p>
                        </div>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default SocialSettings;