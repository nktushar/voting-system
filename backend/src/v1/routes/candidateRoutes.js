import express from "express";
import {
  DeleteCandidate,
  GetCandidate,
  GetCandidateById,
  PostCandidate,
  UpdateCandidate,
} from "../../controllers/candidateController.js";
const router = express.Router();

router.post("/post-candidate", PostCandidate);

router.get("/get-candidate", GetCandidate);
router.get("/get-candidate/:id", GetCandidateById);

router.delete("/delete-candidate/:id", DeleteCandidate);

router.put("/update-candidate/:id", UpdateCandidate);

export default router;
