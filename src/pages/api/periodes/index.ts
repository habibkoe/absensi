import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.periode.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const { name, periodeStart, periodeEnd } = req.body;

    const checkData = await prisma.periode.count({
      where: {
        name: name,
      },
    });

    if (checkData === 0) {
      const datas = await prisma.periode.create({
        data: {
          name: name,
          periodeStart: Number(periodeStart),
          periodeEnd: Number(periodeEnd),
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
