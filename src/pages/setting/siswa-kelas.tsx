import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import FormSiswaKelas from "@/components/Forms/Settings/FormSiswaKelas";
import { useAllPosts, useDeletePost } from "@/hooks/siswaKelasHook";
import { siteConfig } from "@/libs/config";
import { Table } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

const SiswaKelasPage = () => {
  const [showForm, setShowForm] = useState(false);

  const [idData, setIdData] = useState<any>(null);
  const [idDataClass, setIdDataClass] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);

  const {
    isPending: isPeriodeLoading,
    error: isPeriodeError,
    data: dataAll,
  } = useAllPosts();

  const {
    mutate: deleteMutate,
    isPending: isPeriodeDeleteLOading,
    isError: isErrorDeleteLoading,
  } = useDeletePost();

  const tambahData = () => {
    setIdData(null);
    setShowForm(true);
    setIsEdit(false);
  };

  const cancelAdd = () => {
    setShowForm(false);
    setIsEdit(false);
    setIdData(null);
  };

  const ubahData = (idClass : Number,idStudent: Number) => {
    setIdData(idStudent);
    setIdDataClass(idClass);
    setShowForm(true);
    setIsEdit(true);
  };

  const hapusData = async (idClass : Number,idStudent: Number) => {
    let params = [
      idStudent,idClass
    ]
    deleteMutate(params, {
      onSuccess: (response) => {
        alert("Deleted Successfully!");
      },
    });
  };

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Kelas Siswa`}</title>
      </Head>

      <div className="w-full">
        {!showForm ? (
          <AddButton handleClick={() => setShowForm(!showForm)}>
            Tambah data mapel
          </AddButton>
        ) : null}

        {showForm ? (<FormSiswaKelas handleCancel={cancelAdd} isEdit={isEdit} studentId={idData} classRoomId={idDataClass} />) : null}

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
                    key={"as" + index}
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                  >
                    <Table.Cell className="td-custom">
                      <span className="text-base text-gray-300 dark:text-white">
                        {data.name}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Lokasi: {data.location}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Jml siswa: {data._count.students}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Daya tampung: {data.studentTotal}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full justify-end items-start">
                        <ActionButton
                          handleClick={() =>
                            ubahData(data.classRoomId, data.studentId)
                          }
                          title="Detail data"
                        >
                          <HiOutlinePencil />
                        </ActionButton>
                        <ActionButton
                          handleClick={() =>
                            hapusData(data.classRoomId, data.studentId)
                          }
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

SiswaKelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Kelas Siswa">{content}</AppLayout>;
};

export default SiswaKelasPage;
