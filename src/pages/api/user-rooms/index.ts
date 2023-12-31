import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.usersOnClassRooms.findMany({
      select: {
        userId: true,
        classRoomId: true,
        periode: true
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const { userId, classRoomId, periodeId } = req.body;


    const datas = await prisma.usersOnClassRooms.create({
      data: {
        userId: Number(userId),
        classRoomId: Number(classRoomId),
        periodeId: Number(periodeId),
        assignedBy: "-",
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
