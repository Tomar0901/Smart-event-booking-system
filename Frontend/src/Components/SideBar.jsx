import {
  ChevronRight,
  Bell,
  Ticket,
  CreditCard,
  HelpCircle,
  Settings,
  Gift,
  LogOut
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function SideBar({ isOpen, setIsOpen, user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token"); 
  setIsOpen(false);
  navigate("/login", { replace: true });
};

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-100 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* Header */}
        <div className="bg-white px-5 py-4">
          <h2 className="text-lg font-semibold">
            Hey! {user ? user.name : ""}
          </h2>
        </div>

        {/* Offer Card */}
        {!user && (
          <div className="flex items-center justify-between bg-white m-4 p-3 rounded-md shadow-sm">

            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                🎁
              </div>

              <p className="text-sm text-gray-600">
                Unlock special offers & benefits
              </p>
            </div>

            <Link
              to="/login"
              className="border border-red-500 text-red-500 px-3 py-1 text-sm rounded-md hover:bg-red-500 hover:text-white"
            >
              Login / Register
            </Link>
          </div>
        )}

        {/* Menu */}
        <div className="bg-white mx-4 rounded-md shadow-sm">

          {/* Notifications */}
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Bell size={18} />
              <span>Notifications</span>
            </div>
            <ChevronRight size={18} />
          </div>

          {/* Orders */}
          <div
            className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 ${
              !user && "opacity-40 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-3">
              <Ticket size={18} />
              <span>Your Orders</span>
            </div>
            <ChevronRight size={18} />
          </div>

          {/* Credit Card */}
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <CreditCard size={18} />
              <span>Play Credit Card</span>
            </div>
            <ChevronRight size={18} />
          </div>

          {/* Help */}
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <HelpCircle size={18} />
              <span>Help & Support</span>
            </div>
            <ChevronRight size={18} />
          </div>

          {/* Settings */}
          <div
            className={`flex items-center justify-between px-4 py-3 hover:bg-gray-50 ${
              !user && "opacity-40 pointer-events-none"
            }`}
          >
            <div className="flex items-center gap-3">
              <Settings size={18} />
              <span>Accounts & Settings</span>
            </div>
            <ChevronRight size={18} />
          </div>

          {/* Rewards */}
          <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <Gift size={18} />
              <span>Rewards</span>
            </div>
            <ChevronRight size={18} />
          </div>

          {/* Logout (only if user is logged in) */}
          {user && (
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 text-red-600"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-3"
              
              onClick={()=>navigate("/login")}
              >
                <LogOut size={18}
                 />
                <span>Logout</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </>
  );
}