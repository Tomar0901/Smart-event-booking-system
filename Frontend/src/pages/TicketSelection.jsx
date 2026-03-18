import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios.js";

export default function TicketSelection() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");

  // Fetch Event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/user/event/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/user/profile");
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.log("User not logged in", err);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <h1 className="text-center mt-20">Loading...</h1>;
  if (!event) return <h1 className="text-center mt-20">Event not found</h1>;

  const total = tickets * event.price;

  // Mobile Validation
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // only numbers

    if (value.length > 10) return;

    setMobile(value);

    if (value.length === 10) {
      setMobileError("");
    } else {
      setMobileError("Mobile number must be 10 digits");
    }
  };

  const handleContinue = () => {
    if (mobile.length !== 10) {
      setMobileError("Enter valid 10 digit mobile number");
      return;
    }

    navigate("/payment", {
      state: {
        eventid: id,
        name,
        email,
        mobile,
        tickets,
        total,
        title: event.title
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-2xl font-bold text-center mb-6">
          🎟 Select Tickets
        </h1>

        {/* Name */}
        <label className="text-sm text-gray-600">Name</label>
        <input
          type="text"
          value={name}
          readOnly
          className="w-full mb-3 p-2 border rounded bg-gray-100"
        />

        {/* Email */}
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full mb-3 p-2 border rounded bg-gray-100"
        />

        {/* Mobile */}
        <label className="text-sm text-gray-600">Mobile Number</label>
        <input
          type="text"
          placeholder="Enter 10 digit mobile number"
          value={mobile}
          onChange={handleMobileChange}
          className="w-full mb-1 p-2 border rounded focus:outline-none "
        />

        {mobileError && (
          <p className="text-red-500 text-xs mb-3">{mobileError}</p>
        )}

        {/* Ticket Counter */}
        <div className="flex items-center justify-between my-5">
          <button
            onClick={() => setTickets(Math.max(1, tickets - 1))}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            -
          </button>

          <span className="font-semibold text-lg">{tickets}</span>

          <button
            onClick={() => setTickets(tickets + 1)}
            className="bg-gray-300 px-3 py-1 rounded"
          >
            +
          </button>
        </div>

        {/* Price */}
        <div className="bg-gray-50 p-3 rounded mb-4">
          <p>Price per ticket: ₹{event.price}</p>
          <p className="font-bold text-lg">
            Total: ₹{total}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={mobile.length !== 10}
          className={`w-full py-3 rounded text-white font-semibold transition
          ${mobile.length === 10
              ? "bg-red-500 hover:bg-red-600"
              : "bg-red-300 cursor-not-allowed"
            }`}
        >
          Continue to Payment
        </button>

      </div>
    </div>
  );
}