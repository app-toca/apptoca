import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createPostService from "../services/posts/createPost.service";
import deletePostService from "../services/posts/deletePost.service";
import getAllPostsService from "../services/posts/getAllPosts.service";
import getOnePostService from "../services/posts/getOnePost.service";
import getPostsByAreaService from "../services/posts/getPostsByArea.service";
import updatePostService from "../services/posts/updatePost.service";

export const createPostController = async (req: Request, res: Response) => {
  const { area_id } = req.params;

  const post = await createPostService(req.body, area_id, req.user.id);

  return res.status(201).json(instanceToPlain(post));
};

export const getAllPostsController = async (req: Request, res: Response) => {
  const { organization } = req.user;

  const posts = await getAllPostsService(organization);

  return res.status(200).json(instanceToPlain(posts));
};

export const getOnePostController = async (req: Request, res: Response) => {
  const { post_id } = req.params;

  const post = await getOnePostService(post_id);

  return res.status(200).json(instanceToPlain(post));
};

export const getPostsByAreaController = async (req: Request, res: Response) => {
  const { area_id } = req.params;

  const posts = await getPostsByAreaService(area_id, req.user.organization);

  return res.status(200).json(instanceToPlain(posts));
};

export const updatePostController = async (req: Request, res: Response) => {
  const { post_id } = req.params;

  const post = await updatePostService(post_id, req.user.id, req.body);

  return res.status(200).json(instanceToPlain(post));
};

export const deletePostController = async (req: Request, res: Response) => {
  const { post_id } = req.params;

  await deletePostService(post_id, req.user.id);

  return res.status(204).send();
};
