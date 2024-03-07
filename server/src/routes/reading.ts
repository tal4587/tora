import { Router } from "express";
import { createReading, deleteReading, getAllReadings, getReading, updateReading } from "../controllers/reading";
import { createInviteForReading, getAllInviteFromReading, getRandomInviteFromReading } from "../controllers/invite";

const reading = Router();

reading.route("/").get(getAllReadings).post(createReading);
reading.route("/:id").get(getReading).put(updateReading).delete(deleteReading);
reading.route("/:id/invite").get(getAllInviteFromReading).post(createInviteForReading);
reading.route("/:id/invite/random").get(getRandomInviteFromReading);

export default reading;