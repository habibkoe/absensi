import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.students.findMany({
      where: {
        isEnterClass: false,
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
