import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  LogOut,
  Plus,
  X,
  CalendarCheck,
} from "lucide-react";
import { useState, useEffect } from "react";
import API from "../api/axios";
import AddEvent from "./AddEvent";

export default function AdminDashboard() {
  const [adminname, setAdminname] = useState("");
  const [showEventForm, setShowEventForm] = useState(false);
  const [countevent, setCountEvent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie.includes("token");

    if (!token) {
      navigate("/admin_login");
      return;
    }

    const fetchAdmin = async () => {
      try {
        const res = await API.get("/admin/profile");

        setAdminname(res.data.name);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchEventCount = async () => {
      try {
        const res = await API.get("/admin/event-count");
        setCountEvent(res.data.totalEvents);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAdmin();
    fetchEventCount();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}

      <div className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-lg font-semibold mb-8">
          Welcome
          <p className="text-blue-500 text-sm">{adminname}</p>
        </h1>

        <ul className="space-y-5">
          <li className="flex items-center gap-3 cursor-pointer hover:text-blue-500">
            <LayoutDashboard size={20} /> Dashboard
          </li>

          <li
            className="flex items-center gap-3 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/admin/all_events")}
          >
            <Calendar size={20} /> Events
          </li>
          <li
            className="flex items-center gap-3 cursor-pointer hover:text-blue-500"
            onClick={() => navigate("/all_bookings")}
          >
            <CalendarCheck size={20} /> Bookings
          </li>
        </ul>
      </div>

      {/* Main Content */}

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Dashboard</h2>

          <button
            onClick={() => setShowEventForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            <Plus size={18} /> Create Event
          </button>
        </div>

        {/* Cards */}

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-500">Total Events</h3>
            <p className="text-2xl font-bold mt-2">{countevent}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-500">Upcoming Events</h3>
            <p className="text-2xl font-bold mt-2">5</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-gray-500">Completed</h3>
            <p className="text-2xl font-bold mt-2">7</p>
          </div>
        </div>
      </div>

      {/* Event Modal */}

      {showEventForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowEventForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black cursor-pointer"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold mb-4">Create Event</h3>

            <AddEvent />
          </div>
        </div>
      )}
    </div>
  );
}
