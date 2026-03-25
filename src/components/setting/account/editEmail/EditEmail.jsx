import { useSelector } from "react-redux";
import Loading from "../../../loading/Loading";
import EditEmailForm from "./EditEmailForm";
import Header from "../../../header/Header";

const EditEmail = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <div className="w-full h-full text-white flex flex-col">
            <Header title="Email" showBack>
                <p className="text-xs text-[#7a789a]">
                    Enter your new email address
                </p>
            </Header>

            <div className="mx-auto w-full max-w-md px-4 py-6 pb-24">
                {!user ? <Loading /> : <EditEmailForm />}
            </div>
        </div>
    );
};

export default EditEmail;