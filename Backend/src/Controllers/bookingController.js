import QRCode from "qrcode";
import pool from "../../config/pool.js";

export const confirmBooking = (req, res) => {
  try {
    const {
      eventid,
      name,
      email,
      mobile,
      tickets,
      total_amount
    } = req.body;

    const bookingId = "BOOK_" + Date.now();

    const qrData = JSON.stringify({
      bookingId,
      eventid,
      name,
      tickets
    });

    QRCode.toDataURL(qrData, (err, qrCode) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false });
      }

     pool.query(
  `INSERT INTO bookings 
  (bookingid, eventid, name, email, mobile, tickets, total_amount, booking_date, status) 
  VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?)`,
  [
    bookingId,
    eventid,
    name,
    email,
    mobile,
    tickets,
    total_amount,
    "CONFIRMED"
  ],
        (err, result) => {
          if (err) {
            console.log("DB Error:", err);
            return res.status(500).json({ success: false });
          }

          res.json({
            success: true,
            qr: qrCode
          });
        }
      );
    });

  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ success: false });
  }
};