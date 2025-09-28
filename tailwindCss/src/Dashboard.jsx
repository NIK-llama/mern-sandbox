import { useEffect, useState } from "react";
import { SidebarToggle } from "./components/icons/SidebarToggle";

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect (() => {
    if (isDesktop === false) {
        setSidebarOpen(false);
    } else {
        setSidebarOpen(true);
    }
  }, [isDesktop]);

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
        <div className="w-56 h-screen bg-red-300 fixed md:relative">
          <div
            className="cursor-pointer"
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
            className="cursor-pointer text-black md:text-white"
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
      <div className="h-32 bg-gray-800 hidden md:block"></div>
      <div className="grid grid-cols-11 gap-3 p-4">
        <div className="h-48 rounded-2xl shadow-xl -translate-y-10 md:col-span-2 col-span-11 hidden md:block bg-yellow-200"></div>
        <div className="h-48 rounded-2xl shadow-xl md:col-span-6 col-span-11 bg-blue-200"></div>
        <div className="h-48 rounded-2xl shadow-xl md:col-span-3 col-span-11 bg-orange-200"></div>
      </div>
    </div>
  );
}

export default App;
