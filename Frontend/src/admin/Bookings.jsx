import { useEffect, useState } from "react";
import API from "../api/axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/all-bookings");
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">📊 All Bookings</h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Event</th>
                <th className="p-4 text-left">User</th>
                <th className="p-4 text-left">Tickets</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b) => (
                <tr
                  key={b.bookingid}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">{b.bookingid}</td>

                  <td className="p-4">
                    <div className="font-semibold">{b.title}</div>
                    <div className="text-gray-500 text-xs">
                      {b.location}
                    </div>
                  </td>

                  <td className="p-4">
                    <div>{b.name}</div>
                    <div className="text-gray-500 text-xs">
                      {b.email}
                    </div>
                  </td>

                  <td className="p-4">{b.tickets}</td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹{b.total_amount}
                  </td>

                  <td className="p-4">
                    {new Date(b.booking_date).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        b.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : b.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}