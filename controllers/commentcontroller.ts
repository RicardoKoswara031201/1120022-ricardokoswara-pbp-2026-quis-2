import { Request, Response } from "express";
import { Comment } from "../models/comment";

const getSingleQuery = (value: unknown): string | undefined => {
  if (!value) return undefined;
  if (Array.isArray(value)) return value[0];
  return String(value);
};

// GET /post-comment?postId=
export const getComments = async (req: Request, res: Response) => {
  const where: any = { deletedAt: null };

  const postId = getSingleQuery(req.query.postId);

  if (postId) {
    where.postId = postId;
  }

  const data = await Comment.findAll({ where });
  res.json({ data });
};

// POST /post-comment
export const createComment = async (req: Request, res: Response) => {
  const comment = await Comment.create(req.body);
  res.status(201).json({ data: comment });
};

// GET /post-comment/:id
export const getCommentById = async (req: Request, res: Response) => {
  const id = getSingleQuery(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const comment = await Comment.findByPk(id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  res.json({ data: comment });
};

// PUT /post-comment/:id
export const updateComment = async (req: Request, res: Response) => {
  const id = getSingleQuery(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const comment = await Comment.findByPk(id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  await comment.update(req.body);
  res.json({ data: comment });
};

// DELETE
export const deleteComment = async (req: Request, res: Response) => {
  const id = getSingleQuery(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const comment = await Comment.findByPk(id);
  if (!comment) return res.status(404).json({ message: "Not found" });

  await comment.update({ deletedAt: new Date() });
  res.json({ message: "Deleted" });
};