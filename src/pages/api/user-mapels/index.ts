import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.usersOnMapels.findMany({
      select: {
        userId: true,
        mapelId: true,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const { userId, mapelId, assignedBy } = req.body;

    const datas = await prisma.usersOnMapels.create({
      data: {
        userId: Number(userId),
        mapelId: Number(mapelId),
        assignedBy: assignedBy,
      },
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "create data success",
      data: datas,
    });
  }
}
