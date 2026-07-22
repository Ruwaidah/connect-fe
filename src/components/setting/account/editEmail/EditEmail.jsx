import { useSelector } from "react-redux";

import Loading from "../../../loading/Loading";
import EditEmailForm from "./EditEmailForm";
import Header from "../../../header/Header";

const EditEmail = () => {
    const { user, isGettingUserLoading } = useSelector(
        (state) => state.user
    );

    return (
        <div className="min-h-[100dvh] w-full text-white">
            <Header
                title="Email"
                subtitle="Enter your new email address"
                showBack
            />

            <main
                className="
                    mx-auto flex min-h-[100dvh] w-full
                    max-w-[520px] flex-col
                    px-4 pb-[100px] pt-[96px]">
                {isGettingUserLoading || !user ? (
                    <div className="flex flex-1 items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <EditEmailForm />
                )}
            </main>
        </div>
    );
};

export default EditEmail;