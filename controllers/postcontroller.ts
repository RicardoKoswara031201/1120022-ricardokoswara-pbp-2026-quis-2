import { Request, Response } from "express";
import { Post } from "../models/post";
import { Comment } from "../models/comment";

const getId = (id: string | string[] | undefined): string | null => {
  if (!id) return null;
  if (Array.isArray(id)) return id[0];
  return id;
};

// GET /post
export const getPosts = async (_: Request, res: Response) => {
  const data = await Post.findAll({ where: { deletedAt: null } });
  res.json({ data });
};

// POST /post
export const createPost = async (req: Request, res: Response) => {
  const post = await Post.create(req.body);
  res.status(201).json({ data: post });
};

// GET /post/:id
export const getPostById = async (req: Request, res: Response) => {
  const id = getId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const post = await Post.findByPk(id, {
    include: [Comment],
  });

  if (!post) return res.status(404).json({ message: "Not found" });

  res.json({ data: post });
};

// PUT /post/:id
export const updatePost = async (req: Request, res: Response) => {
  const id = getId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ message: "Not found" });

  await post.update(req.body);
  res.json({ data: post });
};

// DELETE (soft delete)
export const deletePost = async (req: Request, res: Response) => {
  const id = getId(req.params.id);

  if (!id) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const post = await Post.findByPk(id);
  if (!post) return res.status(404).json({ message: "Not found" });

  await post.update({ deletedAt: new Date() });
  res.json({ message: "Deleted" });
};