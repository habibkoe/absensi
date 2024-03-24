import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import LoadingTable from "@/components/Attribute/LoadingTable";
import FormKelas from "@/components/Forms/Profile/FormKelas";
import {
  useUserRoomDeletePost,
  useUserRoomPostByUserData,
} from "@/hooks/userHook";
import { siteConfig } from "@/libs/config";
import { Table } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import {
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

const KelasDidikanPage = () => {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);

  const [idData, setIdData] = useState<any>(null);
  const [idDataClass, setIdDataClass] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = useUserRoomPostByUserData(Number(session?.user?.id));

  const {
    mutate: deleteMutate,
    isPending: isDataDeleteLOading,
    isError: isErrorDeleteLoading,
  } = useUserRoomDeletePost();

  const cancelAdd = () => {
    setShowForm(false);
    setIsEdit(false);
    setIdData(null);
  };

  const ubahData = (idClass: Number) => {
    setIdData(Number(session?.user?.id));
    setIdDataClass(idClass);
    setShowForm(true);
    setIsEdit(true);
  };

  const hapusData = async (idClass: Number) => {
    let idStudent = Number(session?.user?.id);
    let params = [idStudent, idClass];
    deleteMutate(params, {
      onSuccess: (response) => {
        alert("Deleted Successfully!");
      },
    });
  };
  if (isDataLoading) {
    return <LoadingTable />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Kelas`}</title>
      </Head>

      <div className="w-full">
        {!showForm ? (
          <AddButton handleClick={() => setShowForm(!showForm)}>
            Tambah data kelas
          </AddButton>
        ) : null}

        {showForm ? (
          <FormKelas
            handleCancel={cancelAdd}
            isEdit={isEdit}
            userId={idData}
            classRoomId={idDataClass}
          />
        ) : null}

        {dataAll !== undefined && dataAll.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-10/12">
                  Data Kelas
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-2/12">
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataAll.map((data, index) => (
                  <Table.Row
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                    key={index}
                  >
                    <Table.Cell className="td-custom">
                      <span className="text-base text-gray-300 dark:text-white">
                        {data.classRoom.name}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        {data.periode.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full justify-end items-start">
                        <ActionButton
                          handleClick={() => ubahData(data.classRoomId)}
                          title="Edit data"
                        >
                          <HiOutlinePencil />
                        </ActionButton>
                        <ActionButton
                          handleClick={() => hapusData(data.classRoomId)}
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

KelasDidikanPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Kelas">{content}</AppLayout>;
};

export default KelasDidikanPage;
