import RoutesComponent from "./routesComponent/RoutesComponent";
import { useEffect } from "react";
import { connectSocket, disconnectSocket } from "./socket";

function App() {
  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="w-full flex-1 flex flex-col">
        <RoutesComponent />
      </div>
    </div>
  );
}

export default App;
   