import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(3, "Username minimal 3 Char"),
  lastName: z.string().min(3, "Username minimal 3 Char"),
  typeTeacher: z.string().min(3, "Username minimal 3 Char"),
  typeOfStudy: z.string().min(3, "Username minimal 3 Char"),
  categoryTeacher: z.string().min(3, "Username minimal 3 Char"),
  rating: z.string().min(3, "Username minimal 3 Char").max(15),
  username: z.string().min(3, "Username minimal 3 Char").max(15),
  email: z.string().min(3, "email minimal 3").email("Invalid email"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataId = req.query.id;

  if (req.method === "DELETE") {
    const datas = await prisma.users.delete({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "delete success",
      data: datas,
    });
  } else if (req.method === "GET") {
    const datas = await prisma.users.findFirst({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "PUT" || req.method === "PATCH") {
    const {
      firstName,
      lastName,
      email,
      typeTeacher,
      typeOfStudy,
      categoryTeacher,
      rating,
      username,
    } = req.body;

    const datas = await prisma.users.update({
      where: {
        id: Number(dataId),
      },
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        typeTeacher: typeTeacher,
        typeOfStudy: typeOfStudy,
        categoryTeacher: categoryTeacher,
        rating: rating,
        username: username,
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
