import { useEffect, useState } from "react";
import API from "../api/axios";
import { ChevronsLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShowAllEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({});
  const [img, setImg] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await API.get("/admin/all_events");
      setEvents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await API.delete(`/admin/delete_event/${id}`);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (event) => {
    const formattedEvent = {
      ...event,
      date: event.date ? event.date.split("T")[0] : "",
    };

    setEditingEvent(event);
    setForm(formattedEvent);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateEvent = async () => {
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("total_seats", form.total_seats);
    formData.append("avl_seats", form.avl_seats);
    formData.append("price", form.price);

    if (img) formData.append("img", img);
    if (banner) formData.append("Banner", banner);

    try {
      await API.put(
        `/admin/update_event/${editingEvent.eventid}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setEditingEvent(null);
      setImg(null);
      setBanner(null);
      fetchEvents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6">All Events</h2>

      {/* Back */}
      <div className="flex items-center gap-2 cursor-pointer mb-6">
        <ChevronsLeft
          onClick={() => navigate("/admin/dashboard")}
          className="text-blue-500"
        />
        <h2 className="text-blue-500">Back To Dashboard</h2>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {events.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-3">📭</div>
              <h2 className="text-xl font-semibold text-gray-600">
                No Events Found
              </h2>
              <p className="text-gray-400 mt-2">
                Please add some events to get started
              </p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.eventid}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:5001/images/${
                    event.img || "default.png"
                  }`}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h3 className="text-lg font-semibold mt-3">
                  {event.title}
                </h3>

                <p className="text-gray-500">{event.location}</p>

                <p className="text-blue-500 font-semibold">
                  ₹{event.price}
                </p>

                <p className="text-sm text-gray-400">
                  {event.date?.split("T")[0]}
                </p>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEvent(event.eventid);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px] shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Event</h2>

            <input
              type="text"
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="Title"
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Description"
              className="border p-2 w-full mb-2"
            />

            <input
              type="text"
              name="location"
              value={form.location || ""}
              onChange={handleChange}
              placeholder="Location"
              className="border p-2 w-full mb-2"
            />

            <input
              type="date"
              name="date"
              value={form.date || ""}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            />

            <input
              type="number"
              name="price"
              value={form.price || ""}
              onChange={handleChange}
              placeholder="Price"
              className="border p-2 w-full mb-2"
            />

            <input
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
              className="mb-3"
            />

            <input
              type="file"
              onChange={(e) => setBanner(e.target.files[0])}
              className="mb-3"
            />

            <div className="flex gap-3">
              <button
                onClick={updateEvent}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Update
              </button>

              <button
                onClick={() => setEditingEvent(null)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}