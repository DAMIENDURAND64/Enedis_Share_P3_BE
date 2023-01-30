/* eslint-disable no-console */

import { SpaceHandlers } from "./../interface";
import prisma from "../../../../prisma/client";

const createSpace: SpaceHandlers["create"] = async (req, res) => {
  const { name, imageUrl, siteId, ownerId, description } = req.body;
  try {
    const createSpace = await prisma.space.create({
      data: {
        name,
        imageUrl,
        siteId,
        ownerId,
        description,
        members: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
    res.status(200).json(createSpace);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export default createSpace;