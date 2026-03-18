import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../api/axios.js";
import { ChevronRight } from "lucide-react";

export default function EventDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [otherEvents, setOtherEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSticky, setShowSticky] = useState(false);

  const scrollRef = useRef(null);

  // 🔥 LOGIN CHECK + REDIRECT
 const handleBookClick = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  // ✅ Proper check
  if (!token || !user) {
    navigate("/login", {
      state: { from: `/event/${event?.eventid}/tickets` },
    });
    return;
  }

  navigate(`/event/${event.eventid}/tickets`);
};

  // 🔥 Fetch Event Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const eventRes = await API.get(`/user/event/${id}`);
        setEvent(eventRes.data);

        const allRes = await API.get("/admin/all_events");

        const filtered = allRes.data.filter(
          (e) => String(e.eventid) !== String(id)
        );

        setOtherEvents(filtered);
      } catch (error) {
        console.log("ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 🔥 Sticky Header
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  // 🔥 Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <h1 className="text-center mt-20 text-red-500">
        Event not found
      </h1>
    );
  }

  return (
    <div className="w-full pt-0">

      {/* 🔥 STICKY HEADER */}
      {showSticky && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
            <h2 className="font-semibold text-lg truncate">
              {event.title}
            </h2>

            <button
              onClick={handleBookClick}
              className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold cursor-pointer"
            >
              Book Tickets
            </button>
          </div>
        </div>
      )}

      {/* 🔥 HERO */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: event.Banner
            ? `url(http://localhost:5001/images/${event.Banner})`
            : "none",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>

        <div className="relative max-w-6xl mx-auto flex items-center gap-10 h-full px-6">

          <div className="w-[250px] flex-shrink-0">
            <img
              src={`http://localhost:5001/images/${event.img}`}
              alt={event.title}
              className="w-full h-[360px] object-cover rounded-xl shadow-2xl"
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/250x360")
              }
            />
          </div>

          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">
              {event.title}
            </h1>

            <p className="text-gray-300 mb-2">
              {event.language} •{" "}
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            <p className="text-gray-400 mb-5">
              📍 {event.location}
            </p>

            <button
              onClick={handleBookClick}
              className="bg-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
              Book Tickets
            </button>
          </div>
        </div>
      </div>

      {/* 🔥 ABOUT */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-4">
          About the Event
        </h2>

        <p className="text-gray-600 leading-relaxed">
          {event.description}
        </p>
      </div>

      {/* 🔥 YOU MIGHT ALSO LIKE */}
      <div className="max-w-6xl mx-auto px-6 pb-10">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            You Might Also Like
          </h2>

          <button
            onClick={() => navigate("/")}
            className="text-red-500 font-semibold hover:underline"
          >
            View All
          </button>
        </div>

        <div className="relative w-[75%]">

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth"
          >
            {otherEvents.map((e) => (
              <div
                key={e.eventid}
                className="min-w-[220px] bg-white rounded-lg shadow cursor-pointer flex-shrink-0"
                onClick={() =>
                  navigate(`/event/${e.eventid}`)
                }
              >
                <img
                  src={`http://localhost:5001/images/${e.img}`}
                  alt={e.title}
                  className="w-full h-[260px] object-cover rounded-t-lg"
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/220x260")
                  }
                />

                <div className="p-3">
                  <h3 className="font-medium text-sm truncate">
                    {e.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {otherEvents.length > 3 && (
            <button
              onClick={scrollRight}
              className="absolute top-1/2 -right-6 bg-black/60 p-2 rounded-full"
            >
              <ChevronRight className="text-white" />
            </button>
          )}

        </div>
      </div>
    </div>
  );
}