import express from "express";
import { confirmBooking } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/confirm-booking",confirmBooking );

export default router;