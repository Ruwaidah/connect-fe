import { Navigate, Outlet } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return <>{token ?
    <div className="bg-[url('./assets/bg-003.png')] 
                        w-full h-[100%] bg-cover bg-center h-screen
                        flex flex-col items-center">
      <Outlet />
      <NavBar />
    </div> :
    <Navigate to="/" />}</>;
};

export default PrivateRoute;
