import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await prisma.users.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: users,
    });
  } else if (req.method === "POST") {
    const {
      firstName,
      lastName,
      email,
      typeTeacher,
      typeOfStudy,
      categoryTeacher,
      rating,
    } = req.body;

    const user = await prisma.users.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        typeTeacher: typeTeacher,
        typeOfStudy: typeOfStudy,
        categoryTeacher: categoryTeacher,
        rating: rating,
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
