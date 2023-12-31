import AppLayout from "@/components/AppLayout";
import SelectClassRoom from "@/components/DataComponents/SelectClassRoom";
import SelectPeriode from "@/components/DataComponents/SelectPeriode";
import MainMenu from "@/components/MainMenu";
import {
  deleteData,
  editData,
  getAllData,
  getByUserData,
  getOneData,
  postData,
} from "@/services/userRoomService";
import { UsersOnClassRooms } from "@prisma/client";
import {
  Button,
  Card,
  Label,
  Select,
  Table,
  TextInput,
  Toast,
} from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiCheck } from "react-icons/hi";

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
        <title>Setting Kelas</title>
      </Head>

      <Card className="w-full md:w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Kelas
            </h5>
            <MainMenu />
          </div>
        </div>

        <div className="w-full">
          <Card className="w-full">
            {!showForm ? (
              <Button
                gradientDuoTone="purpleToPink"
                className="w-fit"
                onClick={() => setShowForm(!showForm)}
              >
                Add +
              </Button>
            ) : null}

            {showForm ? (
              <div className="border rounded-lg p-5 ">
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
                        gradientDuoTone="purpleToPink"
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
                  <Table.Head>
                    <Table.HeadCell>Nama Kelas</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataKelas.map((data, index) => (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={index}
                      >
                        <Table.Cell>{data.classRoom.name}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-wrap gap-4 w-full">
                            <a
                              onClick={() => hapusData(data.classRoomId)}
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Hapus
                            </a>
                            <a
                              onClick={() => ubahData(data.classRoomId)}
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Edit
                            </a>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            ) : (
              <div className="w-full text-black">Belum ada data</div>
            )}
          </Card>
        </div>
      </Card>

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
  return <AppLayout>{content}</AppLayout>;
};

export default KelasDidikanPage;
