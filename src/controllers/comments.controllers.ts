import { Request, Response } from "express";
import createPostCommentService from "../services/comments/createPostComment.service";
import deleteCommentService from "../services/comments/deleteComment.service";
import listPostCommentService from "../services/comments/listPostComments.service";
import listUserCommentsService from "../services/comments/listUserComments.service";
import updateCommentService from "../services/comments/updateComment.service";

const listUserCommentsController = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const comments = await listUserCommentsService(user_id);
  res.status(200).json(comments);
};
const listPostCommentsController = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const comments = await listPostCommentService(post_id);
  return res.status(200).json(comments);
};
const createPostCommentController = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const { user_id, content } = req.body;
  const comment = await createPostCommentService({ post_id, user_id, content });
  return res.status(201).json(comment);
};
const updateCommentController = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { user_id, content } = req.body;
  const comment = await updateCommentService(comment_id, user_id, content);
  return res.status(200).json(comment);
};
const deleteCommentController = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { user_id } = req.body;
  await deleteCommentService(comment_id, user_id);
  return res.status(204).send();
};

export {
  listUserCommentsController,
  listPostCommentsController,
  createPostCommentController,
  updateCommentController,
  deleteCommentController,
};
