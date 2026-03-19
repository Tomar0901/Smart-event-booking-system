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


export const  bookings =   (req, res) => {
  try {
    const query = `
      SELECT 
        b.bookingid,
        b.name,
        b.email,
        b.mobile,
        b.tickets,
        b.total_amount,
        b.booking_date,
        b.status,
        e.title,
        e.location
      FROM bookings b
      LEFT JOIN events e ON b.eventid = e.eventid
      ORDER BY b.bookingid DESC
    `;

    pool.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error" });
      }

      res.json(results);
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
}