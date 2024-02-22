import { Router } from "express";
import { deleteInvite, getAllInvites, getInvite, updateInvite } from "../controllers/invite";

const invite = Router();

invite.route("/").get(getAllInvites);
invite.route("/:id").get(getInvite).put(updateInvite).delete(deleteInvite);

export default invite;