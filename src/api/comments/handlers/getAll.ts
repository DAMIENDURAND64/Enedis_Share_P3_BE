/* eslint-disable no-console */

import { ICommentHandlers } from "../interface";
import prisma from "../../../../prisma/client";

const getAllComments: ICommentHandlers["getAll"] = async (req, res) => {
  const { postId, author } = req.query;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        post: {
          id: {
            contains: postId ? postId : "",
          },
        },
      },
      include: {
        author: author === "true" ? true : false,
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default getAllComments;