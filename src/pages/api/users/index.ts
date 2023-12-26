import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";
import { hash } from "bcrypt";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Username minimal 3 Char").max(15),
  email: z.string().min(3, "email minimal 3").email("Invalid email"),
  password: z.string().min(8, "minimal 8 char"),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.users.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const { email, password, username } = userSchema.parse(req.body);

    const emailExist = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist) {
      return res.status(409).json({
        status: 409,
        success: false,
        message: "email exist",
      });
    }

    const userExist = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (userExist) {
      return res.status(409).json({
        status: 409,
        success: false,
        message: "username exist",
      });
    }

    const hashPassword = await hash(password, 10);
    const datas = await prisma.users.create({
      data: {
        firstName: "-",
        lastName: "-",
        email: email,
        typeTeacher: "-",
        typeOfStudy: "-",
        categoryTeacher: "-",
        rating: 0,
        password: hashPassword,
        username: username,
        roleId: 3
      },
    });
    return res.status(200).json({
      status: 200,
      success: true,
      message: "create data success",
      data: datas,
    });
  }
}
