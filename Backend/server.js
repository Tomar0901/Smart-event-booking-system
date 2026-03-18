import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import adminRouter from "./src/routes/adminRouter.js"
import userRouter from "./src/routes/userRouter.js"
import cookieParser from "cookie-parser"
import bookingRouter from "./src/routes/bookingRouter.js"



dotenv.config() // ye isleye hai kyuki jo env file mai jo likhte hai vo apne ap process.env se load hojata hai

const app = express()   //Ye backend server ka main object create karta hai.
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}))
app.use(cookieParser())
app.use("/images", express.static("public/images"))
app.use(express.json())     //Ye JSON data ko read karne ke liye hota hai.
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api", bookingRouter)



app.get("/", (req, res) => {
    res.send("API is running")
})

app.listen(5001, () => {
    console.log("Server is running on port 5001");
})