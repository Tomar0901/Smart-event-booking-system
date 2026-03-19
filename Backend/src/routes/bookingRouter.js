import express from "express";
import { confirmBooking,bookings } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/confirm-booking",confirmBooking );
router.get("/all-bookings",bookings)

export default router;