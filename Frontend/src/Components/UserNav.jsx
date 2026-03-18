import ticketpng from "../../public/images/ticket.png";
import { Search,Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate  } from "react-router-dom";
import SideBar from "./SideBar";

export default function UserNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between px-8 py-3 shadow bg-white">

        {/* Left Section */}
        <div className="flex items-center gap-6">

          <div className="flex items-center gap-2">
            <img src={ticketpng} alt="logo" className="w-8" />
            <h1 className="text-2xl font-medium text-indigo-600 font-[Montserrat]">
              Eventify
            </h1>
          </div>

          <div className="flex items-center border border-gray-200 rounded-md px-3 py-2 w-[520px] bg-gray-50">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="search"
              placeholder="Search for events"
              className="outline-none bg-transparent w-full text-sm"
            />
          </div>

        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          <select className="outline-none text-sm text-gray-700 cursor-pointer">
            <option>Select Location</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Indore</option>
          </select>

          {!user && (
  <button
    className="bg-red-500 text-white px-6 py-1 text-sm rounded-md hover:bg-red-600"
    onClick={() => navigate("/login")}
  >
    Sign In
  </button>
)} 

          {/* Hamburger */}
          <div
            className="text-2xl cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </div>

        </div>

      </div>

      {/* Sidebar OUTSIDE navbar */}
      <SideBar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        user={user}
      />

    </>
  );
}