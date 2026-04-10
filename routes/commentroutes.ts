import express from "express";
import {
  getComments,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/commentcontroller";

const router = express.Router();

router.get("/", getComments);
router.post("/", createComment);
router.get("/:id", getCommentById);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;