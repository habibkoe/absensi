import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const mapel = await prisma.mataPelajarans.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: mapel,
    });
  } else if (req.method === "POST") {
    const { name, code } = req.body;

    const mapel = await prisma.mataPelajarans.create({
      data: {
        name: name,
        code: code,
      },
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "create data success",
      data: mapel,
    });
  }
}
