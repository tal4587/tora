import { Router } from "express";
import { createReading, deleteReading, getAllReadings, getReading, updateReading } from "../controllers/reading";
import { createInviteForReading, getAllInviteFromReading } from "../controllers/invite";

const reading = Router();

reading.route("/").get(getAllReadings).post(createReading);
reading.route("/:id").get(getReading).put(updateReading).delete(deleteReading);
reading.route("/:id/invite").get(getAllInviteFromReading).post(createInviteForReading);

export default reading;