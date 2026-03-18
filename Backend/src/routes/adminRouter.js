import express from "express"
import { Admin ,adminProfile, createEvent,deleteEvent,getAllEvents,getEventCount,updateEvent} from "../Controllers/adminController.js"
import upload from "../routes/multer.js"

const router = express.Router()

router.post("/admin_login", Admin)
router.get("/profile", adminProfile)
router.post( "/create_event",upload.fields([
    { name: "img", maxCount: 1 },
    { name: "Banner", maxCount: 1 }
  ]),
  createEvent
)
router.get("/event-count", getEventCount)
router.get("/all_events",getAllEvents)
router.delete("/delete_event/:id",deleteEvent)
router.put(
"/update_event/:id",
upload.fields([
 { name: "img", maxCount: 1 },
 { name: "Banner", maxCount: 1 }
]),
updateEvent
)

export default router