import express from "express";
import { UserRegister,UserLogin, EventDetail,verifyToken,UserProfile } from "../Controllers/userController.js";

const router = express.Router()

router.post("/register",UserRegister)
router.post("/login",UserLogin)
router.get("/event/:id",EventDetail)
router.get("/profile", verifyToken, UserProfile);


export default router