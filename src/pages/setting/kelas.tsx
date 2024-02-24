import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import { useAllPosts, useDeletePost } from "@/hooks/kelasHook";
import { siteConfig } from "@/libs/config";
import { Table } from "flowbite-react";
import Head from "next/head";
import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import FormKelas from "@/components/Forms/Settings/FormKelas";

const KelasPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [idData, setIdData] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);

  const {
    isPending: isDataLoading,
    error: isDataError,
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

  const ubahData = (id: Number) => {
    setIdData(id);
    setShowForm(true);
    setIsEdit(true);
  };

  const hapusData = async (id: Number) => {
    deleteMutate(id, {
      onSuccess: (response) => {
        alert("Deleted Successfully!");
      },
    });
  };

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Kelas`}</title>
      </Head>

      <div className="w-full">
        {!showForm ? (
          <AddButton handleClick={() => tambahData()}>
            Tambah data periode
          </AddButton>
        ) : null}

        {showForm ? (
          <FormKelas handleCancel={cancelAdd} isEdit={isEdit} id={idData} />
        ) : null}

        {dataAll !== undefined && dataAll?.length > 0 ? (
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
                    key={data.id}
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
                        Daya Tampung: {data.studentTotal}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full justify-end items-start">
                        <ActionButton
                          handleClick={() => ubahData(data.id)}
                          title="Edit data"
                        >
                          <HiOutlinePencil />
                        </ActionButton>
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

KelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Kelas">{content}</AppLayout>;
};

export default KelasPage;
