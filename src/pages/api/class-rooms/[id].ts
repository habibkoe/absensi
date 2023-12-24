import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const classId = req.query.id;

  if (req.method === "DELETE") {
    const user = await prisma.classRooms.delete({
      where: { id: Number(classId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "delete success",
      data: user,
    });
  } else if (req.method === "GET") {
    const user = await prisma.classRooms.findFirst({
      where: { id: Number(classId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: user,
    });
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const { name, location, studentTotal, periodeStart, periodeEnd } = req.body;

    const user = await prisma.classRooms.update({
      where: {
        id: Number(classId),
      },
      data: {
        name: name,
        location: location,
        studentTotal: studentTotal,
        periodeStart: periodeStart,
        periodeEnd: periodeEnd,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "update data success",
      data: user,
    });
  }
}
