import prisma from "@/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dataId = req.query.id;

  if (req.method === "DELETE") {
    const datas = await prisma.students.delete({
      where: { id: Number(dataId) },
    });

    return res.status(200).json({
      status: 200,
      success: true,
      message: "delete success",
      data: datas,
    });
  } else if (req.method === "GET") {
    const datas = await prisma.students.findFirst({
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

    const datas = await prisma.students.update({
      where: {
        id: Number(dataId),
      },
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
      message: "update data success",
      data: datas,
    });
  }
}
