import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios.js";

export default function PaymentPage() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);

  if (!state) {
    return <h1 className="text-center mt-20">No booking data</h1>;
  }

  const { tickets, total, eventid, name, email, mobile, title } = state;

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await API.post("/confirm-booking", {
        eventid,
        name,
        email,
        mobile,
        tickets,
        total_amount: total,
      });

      navigate("/booking-success", {
        state: { qr: res.data.qr, title }
      });

    } catch (err) {
      console.log("Payment Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-2xl font-bold text-center mb-6">
          💳 Payment Summary
        </h1>

        {/* Event Title */}
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            {title}
          </h2>
        </div>

        {/* User Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-5 text-sm">
          <p><span className="font-semibold">Name:</span> {name}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
          <p><span className="font-semibold">Mobile:</span> {mobile}</p>
        </div>

        {/* Ticket Info */}
        <div className="border rounded-lg p-4 mb-5">
          <div className="flex justify-between mb-2">
            <span>Tickets</span>
            <span className="font-semibold">{tickets}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Amount</span>
            <span className="font-bold text-lg text-green-600">
              ₹{total}
            </span>
          </div>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition
          ${loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>

      </div>
    </div>
  );
}