import { Router } from "express";
import { createReading, getAllReadings, getReading } from "../controllers/reading";

const reading = Router();

reading.route("/").get(getAllReadings).post(createReading);
reading.route("/:id").get(getReading)

export default reading;