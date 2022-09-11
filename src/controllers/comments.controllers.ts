import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createPostCommentService from "../services/comments/createPostComment.service";
import deleteCommentService from "../services/comments/deleteComment.service";
import listPostCommentService from "../services/comments/listPostComments.service";
import listUserCommentsService from "../services/comments/listUserComments.service";
import updateCommentService from "../services/comments/updateComment.service";

const listUserCommentsController = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  const comments = await listUserCommentsService(user_id);
  res.status(200).json(instanceToPlain(comments));
};
const listPostCommentsController = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  console.log("chegou");

  const comments = await listPostCommentService(post_id);
  return res.status(200).json(instanceToPlain(comments));
};
const createPostCommentController = async (req: Request, res: Response) => {
  const { post_id } = req.params;
  const { id } = req.user;
  const { content } = req.body;
  const comment = await createPostCommentService({ post_id, id, content });
  return res.status(201).json(comment);
};
const updateCommentController = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { content } = req.body;
  const { id } = req.user;
  const comment = await updateCommentService(comment_id, id, content);
  return res.status(200).json(instanceToPlain(comment));
};
const deleteCommentController = async (req: Request, res: Response) => {
  const { comment_id } = req.params;
  const { id } = req.user;
  await deleteCommentService(comment_id, id);
  return res.status(204).send();
};

export {
  listUserCommentsController,
  listPostCommentsController,
  createPostCommentController,
  updateCommentController,
  deleteCommentController,
};
