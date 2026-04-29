import { useSelector } from "react-redux";
import Loading from "../../../loading/Loading";
import EditPasswordForm from "./EditPasswordForm";
import Header from "../../../header/Header"; // ✅ adjust path if needed

const EditPassword = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-full text-white flex flex-col mt-18">
      <Header title="Password"
        subtitle="Update your password securely"
        showBack>
      </Header>

      <div className="mx-auto w-full max-w-md px-4 py-6 pb-24">
        {!user ? <Loading /> : <EditPasswordForm />}
      </div>
    </div>
  );
};

export default EditPassword;