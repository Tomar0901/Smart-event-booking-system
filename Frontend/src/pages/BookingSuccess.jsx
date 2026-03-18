import { useLocation } from "react-router-dom";

export default function BookingSuccess() {
  const { state } = useLocation();

  if (!state) {
    return <h1 className="text-center mt-20">No Data</h1>;
  }

  // ✅ Download QR function
  const downloadQR = () => {
    const link = document.createElement("a");
    link.href = state.qr;
    link.download = "event-ticket.png";
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">

        {/* ✅ Success Message */}
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Booking Confirmed!
        </h1>

        {/* ✅ Subtitle */}
        <p className="mt-2 text-gray-600">
          Your ticket has been successfully generated.
        </p>

        {/* ✅ Event Title */}
        <p className="mt-4 text-lg text-gray-700">
          Event: <span className="font-semibold">{state.title}</span>
        </p>

        {/* ✅ QR Code */}
        <div className="mt-6 flex justify-center">
          <img
            src={state.qr}
            alt="QR Code"
            className="w-56 h-56 border rounded-lg p-2"
          />
        </div>

        {/* ✅ Download Text */}
        <p className="mt-4 text-sm text-gray-500">
          📥 Download your QR code and show it at entry
        </p>

        {/* ✅ Download Button */}
        <button
          onClick={downloadQR}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          Download QR Code
        </button>

      </div>

    </div>
  );
}