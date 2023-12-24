import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.classRooms.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: users,
    });
  } else if (req.method === "POST") {
    const { name, location, studentTotal, periodeStart, periodeEnd } = req.body;

    const user = await prisma.classRooms.create({
      data: {
        name: name,
        location: location,
        studentTotal: studentTotal,
        periodeStart: periodeStart,
        periodeEnd: periodeEnd,
      },
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "create data success",
      data: user,
    });
  }
}
