import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
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
        <title>{`${siteConfig.title} : Setting Users`}</title>
      </Head>

      <div className="w-full">
        {dataUsers !== null && dataUsers.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Nama Users</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Email</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Username</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Role</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataUsers.map((data, index) => (
                  <Table.Row
                    key={data.id}
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-300">
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
      </div>
    </>
  );
};

UserPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Users">{content}</AppLayout>;
};

export default UserPage;
