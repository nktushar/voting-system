import express from "express";
import { GetVote, MyVote, PostVote } from "../../controllers/voteController.js";
const router = express.Router();

router.post("/post-vote", PostVote);

router.get("/get-vote", GetVote);
router.get("/my-vote", MyVote);

export default router;
