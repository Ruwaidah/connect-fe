import { useSelector } from "react-redux";

import Loading from "../../../loading/Loading";
import EditPasswordForm from "./EditPasswordForm";
import Header from "../../../header/Header";

const EditPassword = () => {
  const { user, isGettingUserLoading } = useSelector(
    (state) => state.user
  );

  return (
    <div className="min-h-[100dvh] w-full text-white">
      <Header
        title="Password"
        subtitle="Update your password securely"
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
            <EditPasswordForm />
          </div>
        )}
      </main>
    </div>
  );
};

export default EditPassword;