import { Outlet } from "react-router-dom";
import NavBarHomePage from "../components/homePage/NavBarHomePage";
import Footer from "../components/footer/Footer";

const Layout = () => {

    return (
        <div className="bg-[url('./assets/background.png')] 
                        w-full h-[100%] bg-cover bg-center h-screen
                          max-sm:bg-[url('./assets/phone-bg.png')]
                        flex flex-col items-center">
            <NavBarHomePage />
            <Outlet />
            <Footer />
        </div>
    );
}


export default Layout