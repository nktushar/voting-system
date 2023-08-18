
// import { DeleteNotice, GetNotice } from "services/noticeServices.js";
import { PostNotice, GetNotice, DeleteNotice, UpdateNotice } from "../../controllers/noticeController.js";
import express from "express";
const router = express.Router();

router.post("/post-notice", PostNotice);

router.get("/get-notice", GetNotice);

router.delete("/delete-notice/:id", DeleteNotice);

router.put("/update-notice/:id", UpdateNotice);

export default router;
