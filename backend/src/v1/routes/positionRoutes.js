import express from "express";
import {
  DeletePosition,
  GetPosition,
  PostPosition,
  UpdatePosition,
} from "../../controllers/positionController.js";
const router = express.Router();

router.post("/post-position", PostPosition);

router.get("/get-position", GetPosition);

router.delete("/delete-position/:id", DeletePosition);

router.put("/update-position/:id", UpdatePosition);

export default router;
