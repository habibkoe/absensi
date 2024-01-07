import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    

    console.log("ini apa ya ", req.body)
    const datas = await prisma.absensi.createMany({
      data: req.body,
      skipDuplicates: true,
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "create data success absensi",
      data: datas,
    });
  }
}
