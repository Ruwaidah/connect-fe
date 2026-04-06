import { useSelector } from "react-redux";
import Loading from "../../../loading/Loading";
import EditUsernameForm from "./EdiUsernameForm";
import Header from "../../../header/Header";

const EditUsername = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <div className="w-full h-full text-white flex flex-col">
            <Header title="Username"
                subtitle="Choose a new username"
                showBack>
            </Header>

            <div className="mx-auto w-full max-w-md px-4 py-6 pb-24 mt-10">
                {!user ? (
                    <Loading />
                ) : (
                    <>
                        {/* Profile preview */}
                        <div
                            className="w-full rounded-3xl
                            p-5 flex flex-col items-center text-center
                        "
                        >
                            <div className="relative">
                                <div className="absolute -inset-6 rounded-full blur-2xl bg-sky-400/15" />
                                <div
                                    className="relative rounded-full p-[3px]
                                    bg-gradient-to-b from-sky-300/50 via-indigo-300/20 to-white/10
                                    shadow-[0_0_0_1px_rgba(140,230,255,0.18),0_0_22px_rgba(60,170,255,0.12)]"
                                >
                                    {user?.image ? (
                                        <img
                                            src={user.image}
                                            alt="Profile"
                                            className="h-24 w-24 rounded-full object-cover ring-1 ring-white/10"
                                        />
                                    ) : (
                                        <div className="h-24 w-24 rounded-full bg-white/10 ring-1 ring-white/10" />
                                    )}
                                </div>
                            </div>

                            <p className="mt-1 text-lg font-semibold text-white/90">
                                @{user.username}
                            </p>
                        </div>

                        {/* Form */}
                        <div className="mt-4">
                            <EditUsernameForm />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditUsername;