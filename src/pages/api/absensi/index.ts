import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      userId,
      mapelId,
      classRoomId,
      studentId,
      pertemuan,
      jamPelajaran,
      semester,
      absensiType,
      infoTambahan,
      absensiDate,
    } = req.body;

    const datas = await prisma.absensi.create({
      data: {
        userId: Number(userId),
        mapelId: Number(mapelId),
        classRoomId: Number(classRoomId),
        studentId: Number(studentId),
        pertemuan: Number(pertemuan),
        jamPelajaran: Number(jamPelajaran),
        semester: Number(semester),
        absensiType: absensiType,
        infoTambahan: infoTambahan,
        absensiDate: absensiDate,
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
