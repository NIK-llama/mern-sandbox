import { useState } from "react";
import { SidebarToggle } from "./components/icons/SidebarToggle";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent sidebarOpen={sidebarOpen} />
    </div>
  );
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  return (
    <div>
      {sidebarOpen ? (
        <div className="w-56 h-screen bg-red-300">
          <div
            className="cursor-pointer hover:bg-red-300"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <SidebarToggle />
          </div>
        </div>
      ) : (
        <div className="fixed top-0 left-0">
          <div
            className="cursor-pointer text-white"
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}
          >
            <SidebarToggle />
          </div>
        </div>
      )}
    </div>
  );
}

function MainContent({ sidebarOpen }) {
  return (
    <div className="w-full">
      <div className="h-32 bg-gray-800"></div>
      <div className="grid grid-cols-11 gap-3 p-4">
        <div className="h-48 rounded-2xl shadow-xl -translate-y-10 col-span-2 bg-yellow-200"></div>
        <div className="h-48 rounded-2xl shadow-xl  col-span-6 bg-blue-200"></div>
        <div className="h-48 rounded-2xl shadow-xl  col-span-3 bg-orange-200"></div>
      </div>
    </div>
  );
}

export default App;
