
import { useState } from "react";
import API from "../api/axios";

export default function AddEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    total_seats: "",
    avl_seats: "",
    price: "",
    img: null,
    Banner: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "img") {
      setForm({ ...form, img: e.target.files[0] });
    } else if (e.target.name === "Banner") {
      setForm({ ...form, Banner: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("date", form.date);
    formData.append("total_seats", form.total_seats);
    formData.append("avl_seats", form.avl_seats);
    formData.append("price", form.price);
    formData.append("img", form.img);
    formData.append("Banner", form.Banner);

    try {
      const res = await API.post("/admin/create_event", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);

      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        total_seats: "",
        avl_seats: "",
        price: "",
        img: "",
        Banner: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Create New Event
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

        <input
          type="text"
          name="title"
          value={form.title}
          placeholder="Event Title"
          onChange={handleChange}
          className="border p-2 rounded focus:outline-blue-500"
        />

        <input
          type="text"
          name="location"
          value={form.location}
          placeholder="Location"
          onChange={handleChange}
          className="border p-2 rounded focus:outline-blue-500"
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded focus:outline-blue-500"
        />

        <input
          type="text"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded focus:outline-blue-500"
        />

        <input
          type="text"
          name="total_seats"
          value={form.total_seats}
          onChange={handleChange}
          placeholder="Total Seats"
          className="border p-2 rounded focus:outline-blue-500"
        />

        <input
          type="text"
          name="avl_seats"
          value={form.avl_seats}
          onChange={handleChange}
          placeholder="Available Seats"
          className="border p-2 rounded focus:outline-blue-500"
        />

        <input
          type="file"
          name="img"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="file"
          name="Banner"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="col-span-2 border p-2 rounded focus:outline-blue-500"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          Create Event
        </button>

      </form>
    </div>
  );
}

