import { Request, Response } from "express";
import createReactionService from "../services/reactions/createReaction.service";
import deleteReactionService from "../services/reactions/deleteReaction.service";
import getReactionsOfPostService from "../services/reactions/getReactionsOfPost.service";
import updateReactionService from "../services/reactions/updateReaction.service";

export const createReactionController = async (req: Request, res: Response) => {
  const { post_id } = req.params;

  const reaction = await createReactionService(req.body, post_id, req.user.id);

  const { id, type, created_at, updated_at } = reaction;

  return res.status(201).json({ id, type, created_at, updated_at });
};

export const getReactionsOfPostController = async (
  req: Request,
  res: Response
) => {
  const { post_id } = req.params;

  const reactions = await getReactionsOfPostService(post_id);

  return res.status(200).json(reactions);
};

export const updateReactionController = async (req: Request, res: Response) => {
  const { reaction_id } = req.params;

  const reaction = await updateReactionService(
    reaction_id,
    req.user.id,
    req.body
  );

  const { id, type, created_at, updated_at } = reaction;

  return res.status(200).json({ id, type, created_at, updated_at });
};

export const deleteReactionController = async (req: Request, res: Response) => {
  const { reaction_id } = req.params;

  await deleteReactionService(reaction_id, req.user.id);

  return res.status(204).send();
};
