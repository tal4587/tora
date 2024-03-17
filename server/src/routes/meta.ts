import { Router } from "express";
import { getMetaData } from "../controllers/meta";

const meta = Router();

meta.route("/").get(getMetaData);

export default meta;