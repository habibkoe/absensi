import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import LoadingTable from "@/components/Attribute/LoadingTable";
import FormMapel from "@/components/Forms/Profile/FormMapel";
import { usePostByUserId, useUserMapelDeletePost } from "@/hooks/mapelHook";
import { siteConfig } from "@/libs/config";

import { Table, Toast } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useState } from "react";
import {
  HiCheck,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";

export interface NewForm {
  userId: number;
  mapelId: number;
  assignedBy: string;
}

const MapelProfilePage = () => {
  const { data: session } = useSession();

  const [showForm, setShowForm] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState("");

  const [idData, setIdData] = useState<any>(null);
  const [idDataMapel, setIdDataMapel] = useState<any>(null);
  const [isEdit, setIsEdit] = useState<any>(false);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataAll,
  } = usePostByUserId(null,Number(session?.user?.id));

  const {
    mutate: deleteMutate,
    isPending: isDataDeleteLOading,
    isError: isErrorDeleteLoading,
  } = useUserMapelDeletePost();


  const ubahData = (mapelId: Number) => {
    setIdData(Number(session?.user?.id));
    setIdDataMapel(mapelId);
    setShowForm(true);
    setIsEdit(true);
  };

  const hapusData = async (mapelId: Number) => {
    let userId = Number(session?.user?.id);
    let params = [mapelId, userId];
    deleteMutate(params, {
      onSuccess: (response) => {
        alert("Deleted Successfully!");
      },
    });
  };

  const cancelAdd = () => {
    setShowForm(false);
    setIsEdit(false);
    setIdData(null);
  };
  
  if (isDataLoading) {
    return <LoadingTable />;
  }

  return (
    <>
      <Head>
        <title>{`${siteConfig.title} : Setting Mapel`}</title>
      </Head>

      <div className="w-full">
        {!showForm ? (
          <AddButton handleClick={() => setShowForm(!showForm)}>
            Tambah data mapel
          </AddButton>
        ) : null}

        {showForm ? (
          <FormMapel
          handleCancel={cancelAdd}
          isEdit={isEdit}
          userId={idData}
          mapelId={idDataMapel}
        />
        ) : null}

        {dataAll !== undefined && dataAll.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-10/12">
                  Data Mapel
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
                        {data.mapel.name}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full justify-end items-start">
                        <ActionButton
                          handleClick={() => ubahData(data.mapelId)}
                          title="Edit data"
                        >
                          <HiOutlinePencil />
                        </ActionButton>
                        <ActionButton
                          handleClick={() => hapusData(data.mapelId)}
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

      {showToast ? (
        <Toast className="mb-10 fixed bottom-2 right-10">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{showToastMessage}</div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      ) : null}
    </>
  );
};

MapelProfilePage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Mapel">{content}</AppLayout>;
};

export default MapelProfilePage;
