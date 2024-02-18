import express from "express";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ success: true, message: "Hello World"});
})

app.listen(PORT, () => {
    console.log("✨✨ Server is up and Running!!");
})