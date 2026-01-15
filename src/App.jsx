import Header from "./components/header/Header";
import RoutesComponent from "./routesComponent/RoutesComponent";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <div className="flex flex-col justify-between items-center h-[100vh]">
      {/* <Header /> */}
      <div className="w-full h-full">
        {/* {localStorage.getItem("id") && <NavBar />} */}
        <RoutesComponent />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
