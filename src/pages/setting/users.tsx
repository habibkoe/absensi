import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import { deleteData, getAllData, getOneData } from "@/services/userService";
import { Users } from "@prisma/client";
import { Card, Table } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

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
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-10/12">
                  Data Users
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-2/12">
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
                      <span className="text-base text-gray-300 dark:text-white">
                        {data.firstName} {data.lastName}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Email: {data.email}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Username: {data.username}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Role: {roleName(Number(data.roleId))}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full justify-end items-start">
                        <ActionButton
                          handleClick={() => hapusData(data.id)}
                          title="Hapus data"
                        >
                          <HiOutlineTrash />
                        </ActionButton>
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
