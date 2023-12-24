import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.query.id;

  if (req.method === "DELETE") {
    const user = await prisma.mataPelajarans.delete({
      where: { id: Number(userId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "delete success",
      data: user,
    });
  } else if (req.method === "GET") {
    const user = await prisma.mataPelajarans.findFirst({
      where: { id: Number(userId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: user,
    });
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const { name, code } = req.body;

    const user = await prisma.mataPelajarans.update({
      where: {
        id: Number(userId),
      },
      data: {
        name: name,
        code: code
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
