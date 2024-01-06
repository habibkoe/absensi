import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { deleteData, getAllData, getOneData } from "@/services/userService";
import { Users } from "@prisma/client";
import { Card, Table } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const [dataUsers, setDataUsers] = useState<Users[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataUsers(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const hapusData = async (id: any) => {
    try {
      let datas = await deleteData(id);
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const roleName = (params: number) => {
    switch (params) {
      case 1:
        return "Superadmin";
      case 2:
        return "Tata Usaha";
      case 3:
        return "Guru";
      default:
        return "User Umum";
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Setting Users</title>
      </Head>
      <Card className="w-full md:w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Users
            </h5>
            <MainMenu />
          </div>
        </div>
        <div className="w-full">
          <Card className="w-full">
            {dataUsers !== null && dataUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Nama Users</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Username</Table.HeadCell>
                    <Table.HeadCell>Role</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataUsers.map((data, index) => (
                      <Table.Row
                        key={data.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.firstName} {data.lastName}
                        </Table.Cell>
                        <Table.Cell>{data.email}</Table.Cell>
                        <Table.Cell>{data.username}</Table.Cell>
                        <Table.Cell>{roleName(Number(data.roleId))}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-wrap gap-4 w-full">
                            <a
                              onClick={() => hapusData(data.id)}
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Hapus
                            </a>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            ) : (
              <div className="w-full text-red-500">Belum ada data</div>
            )}
          </Card>
        </div>
      </Card>
    </>
  );
};

UserPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default UserPage;
