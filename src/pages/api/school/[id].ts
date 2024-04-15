import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataId = req.query.id;

  if (req.method === "DELETE") {
    const datas = await prisma.schools.delete({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "delete success",
      data: datas,
    });
  } else if (req.method === "GET") {
    const datas = await prisma.schools.findFirst({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const { name,
        city,
        district,
        email,
        location,
        nspn,
        posCode,
        province,
        refCode,
        status,
        studentTotal,
        teacherTotal,
        telp,
        village } = req.body;

    const datas = await prisma.schools.update({
      where: {
        id: Number(dataId),
      },
      data: {
        name: name,
        city: city,
        district: district,
        email: email,
        location: location,
        nspn: nspn,
        posCode: posCode,
        province: province,
        refCode: refCode,
        status: status,
        studentTotal: studentTotal,
        teacherTotal: teacherTotal,
        telp: telp,
        village: village,
      },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "update data success",
      data: datas,
    });
  }
}
