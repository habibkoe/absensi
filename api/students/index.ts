import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const datas = await prisma.students.findMany();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "get data success",
      data: datas,
    });
  } else if (req.method === "POST") {
    const {
      nis,
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth,
      address,
      parent,
      rating,
      favoriteLearn,
      Hobby,
    } = req.body;

    const datas = await prisma.students.create({
      data: {
        nis: nis,
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        dateOfBirth: dateOfBirth,
        address: address,
        parent: parent,
        rating: rating,
        favoriteLearn: favoriteLearn,
        Hobby: Hobby,
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
