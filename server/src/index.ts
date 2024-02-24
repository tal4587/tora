import express from "express";
import cors from "cors"
import "dotenv/config"
import connectDatabase from "./config/database";
import readingRoute from "./routes/reading";
import inviteRoute from "./routes/invite";
import ErrorMiddleware from "./middlewares/error";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN?.split(" ")}))

connectDatabase();

app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello World"});
})

app.use("/reading", readingRoute);
app.use("/invite", inviteRoute);

app.use(ErrorMiddleware)

app.listen(PORT, () => {
    console.log("[SERVER] ✨✨ Up and Running at http://localhost:%s !!", PORT);
})