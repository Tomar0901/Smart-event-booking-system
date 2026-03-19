import ticketpng from "../../public/images/ticket.png";
import { Search, Menu } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "./SideBar";

export default function UserNav({ search, setSearch, location, setLocation }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 shadow bg-white sticky top-0 z-50">

        {/* Left */}
        <div className="flex items-center gap-6">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={()=>navigate("/")}>
            <img src={ticketpng} alt="logo" className="w-8" />
            <h1 className="text-xl font-semibold text-indigo-600">
              Eventify
            </h1>
          </div>

          {/* 🔥 Search */}
          <div className="hidden md:flex items-center border border-gray-200 rounded-full px-4 py-2 w-[420px] bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400">

            <Search size={18} className="text-gray-500 mr-2" />

            <input
              type="search"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="outline-none bg-transparent w-full text-sm"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* 🔥 Location Filter */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border px-5 py-1 rounded-full text-sm bg-gray-50"
          >
            <option value="">All Locations</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="indore">Indore</option>
            <option value="bhopal">Bhopal</option>
          </select>

          {/* Auth */}
          {!user ? (
            <button
              className="bg-red-500 text-white px-4 py-1 text-sm rounded-full hover:bg-red-600"
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
          ) : (
            <div className="text-sm text-gray-600">
              Hi, <span className="font-semibold">{user.name}</span>
            </div>
          )}

          {/* Hamburger */}
          <div
            className="cursor-pointer"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </div>
        </div>
      </div>

      <SideBar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        user={user}
      />
    </>
  );
}