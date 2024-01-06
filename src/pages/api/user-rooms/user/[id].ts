import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const dataId = req.query.id;

  if (req.method === "GET") {
    const datas = await prisma.usersOnClassRooms.findMany({
      where: {
        userId: Number(dataId),
      },
      include: {
        classRoom: true,
        periode: true
      }
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  }
}
