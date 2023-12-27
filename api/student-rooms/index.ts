import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.classRooms.findMany({
      select: {
        name: true,
        location: true,
        studentTotal: true,
        id: true,
        _count: {
          select: { students: true },
        },
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const { studentId, classRoomId, periodeId } = req.body;

    const datass = await prisma.students.update({
      where: {
        id: Number(studentId),
      },
      data: {
        isEnterClass: true,
      },
    });

    const datas = await prisma.studentsOnClassRooms.create({
      data: {
        studentId: Number(studentId),
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
