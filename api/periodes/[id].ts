import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataId = req.query.id;

  if (req.method === "DELETE") {
    const datas = await prisma.periode.delete({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "delete success",
      data: datas,
    });
  } else if (req.method === "GET") {
    const datas = await prisma.periode.findFirst({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const { name, periodeStart, periodeEnd } = req.body;

    const datas = await prisma.periode.update({
      where: {
        id: Number(dataId),
      },
      data: {
        name: name,
        periodeStart: Number(periodeStart),
        periodeEnd : Number(periodeEnd)    
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
