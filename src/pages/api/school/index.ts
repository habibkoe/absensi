import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.schools.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const {
      name,
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
      village
    } = req.body;

    const checkData = await prisma.schools.count({
      where: {
        name: name,
      },
    });

    if (checkData === 0) {
      const datas = await prisma.schools.create({
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
        message: "create data success",
        data: datas,
      });
    } else {
      return res.status(501).json({
        status: 501,
        success: false,
        message: "data duplicate",
        data: null,
      });
    }
  }
}
