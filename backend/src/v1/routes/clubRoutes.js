// import { PostNotice, GetNotice, DeleteNotice, UpdateNotice } from "../../controllers/noticeController.js";
import {
  PostClub,
  GetClub,
  DeleteClub,
  UpdateClub,
} from "../../controllers/clubController.js";
import express from "express";
const router = express.Router();

router.post("/post-club", PostClub);

router.get("/get-club", GetClub);

router.delete("/delete-club/:id", DeleteClub);

router.put("/update-club/:id", UpdateClub);

export default router;
