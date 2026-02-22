import { Navigate, Outlet } from "react-router-dom";
import NavBarHomePage from "../components/homePage/NavBarHomePage";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const token = localStorage.getItem("token");
  if (token) return <Navigate to="/messages" />;

  return (
    <div className="w-full h-[100dvh] overflow-hidden flex flex-col items-center
                    bg-[url('../../assets/background.png')] bg-cover bg-center bg-no-repeat">
      <NavBarHomePage />
      <main className="w-full flex-1 overflow-auto flex justify-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

