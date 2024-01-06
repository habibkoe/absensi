import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { params } = req.query;

  const classRoomId = params ? params[0] : null;
  const userId = params ? params[1] : null;
  const studentId = params ? params[2] : null;

  if (req.method === "GET") {
    const datas = await prisma.absensi.findMany({
      where: { classRoomId: Number(classRoomId), userId: Number(userId) },
      include: {
        student: true
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  }
}
