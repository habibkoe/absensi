import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import SelectClassRoom from "@/components/DataComponents/SelectClassRoom";
import SelectPeriode from "@/components/DataComponents/SelectPeriode";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import {
  deleteData,
  editData,
  getByUserData,
  getOneData,
  postData,
} from "@/services/userRoomService";
import { Button, Card, Table, Toast } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiCheck, HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

export interface NewForm {
  userId: number;
  classRoomId: number;
  periodeId: number;
  assignedBy: string;
}

const KelasDidikanPage = () => {
  const { data: session } = useSession();

  let initialState: NewForm = {
    userId: Number(session?.user?.id),
    classRoomId: 0,
    periodeId: 0,
    assignedBy: String(session?.user?.username),
  };

  const [currentId, setCurrentId] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState("");

  const [dataKelas, setDataKelas] = useState<any[]>([]);

  const [newData, setNewData] = useState<NewForm>(initialState);

  const getData = async () => {
    try {
      let datas = await getByUserData(Number(session?.user?.id));

      console.log("ada nggak ni ", datas);
      setDataKelas(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (id: any) => {
    try {
      let datas = await getOneData(id, Number(session?.user?.id));
      setNewData({
        userId: datas.data.userId,
        classRoomId: datas.data.classRoomId,
        periodeId: datas.data.periodeId,
        assignedBy: datas.data.assignedBy,
      });

      setShowForm(true);
      setCurrentId(id);
    } catch (error) {
      console.error(error);
    }
  };

  const hapusData = async (id: any) => {
    try {
      let datas = await deleteData(id, Number(session?.user?.id));
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let store = null;

      if (newData.classRoomId !== 0) {
        if (currentId == 0) {
          store = await postData(JSON.stringify(newData));
        } else {
          store = await editData(
            currentId,
            Number(session?.user?.id),
            JSON.stringify(newData)
          );
        }

        if (store.data) {
          setNewData(initialState);
          setCurrentId(0);
          getData();
          setShowToast(true);
          setShowToastMessage("Berhasil simpan data");
        } else {
          setShowToast(true);
          setShowToastMessage("Gagal simpan data");
          console.error("Failed to post data");
        }

        setShowForm(false);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <SelectClassRoom
                    value={newData.classRoomId}
                    handleChange={handleInputChange}
                  />
                </div>
                <div>
                  <SelectPeriode
                    value={newData.periodeId}
                    handleChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                {newData.classRoomId == 0 ? (
                  <Button color="light">Simpan</Button>
                ) : (
                  <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                    className="w-fit"
                  >
                    Simpan
                  </Button>
                )}
              </div>
            </form>
          </div>
        ) : null}

        {dataKelas !== null && dataKelas.length > 0 ? (
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
                {dataKelas.map((data, index) => (
                  <Table.Row
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                    key={index}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-300 dark:text-white">
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

KelasDidikanPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Kelas">{content}</AppLayout>;
};

export default KelasDidikanPage;
