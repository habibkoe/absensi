import AppLayout from "@/components/AppLayout";
import SelectMapel from "@/components/DataComponents/SelectMapel";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import {
  deleteData,
  editData,
  getByUserData,
  getOneData,
  postData,
} from "@/services/userMapelService";
import { Button, Card, Table, Toast } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiCheck, HiOutlinePlus } from "react-icons/hi";

export interface NewForm {
  userId: number;
  mapelId: number;
  assignedBy: string;
}

const MapelProfilePage = () => {
  const { data: session } = useSession();

  let initialState: NewForm = {
    userId: Number(session?.user?.id),
    mapelId: 0,
    assignedBy: String(session?.user?.username),
  };

  const [dataMapels, setDataMapels] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [newData, setNewData] = useState<NewForm>(initialState);
  const [currentId, setCurrentId] = useState(0);

  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState("");

  const getData = async () => {
    try {
      let datas = await getByUserData(Number(session?.user?.id));

      console.log("ada nggak ni ", datas);
      setDataMapels(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (id: any) => {
    try {
      let datas = await getOneData(id, Number(session?.user?.id));
      setNewData({
        userId: datas.data.userId,
        mapelId: datas.data.mapelId,
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

      if (newData.mapelId !== 0) {
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
        <title>{`${siteConfig.title} : Setting Mapel`}</title>
      </Head>

      <div className="w-full">
        <Card className="w-full">
          {!showForm ? (
            <Button
              outline
              gradientDuoTone="purpleToPink"
              className="w-fit"
              onClick={() => setShowForm(!showForm)}
            >
              Add <HiOutlinePlus />
            </Button>
          ) : null}

          {showForm ? (
            <div className="border rounded-lg p-5 ">
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                  <div>
                    <SelectMapel
                      value={newData.mapelId}
                      handleChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  {newData.mapelId == 0 ? (
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

          {dataMapels !== null && dataMapels.length > 0 ? (
            <div className="overflow-x-auto">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell>Nama Mapel</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {dataMapels.map((data, index) => (
                    <Table.Row
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={index}
                    >
                      <Table.Cell>{data.mapel.name}</Table.Cell>
                      <Table.Cell>
                        <div className="flex flex-wrap gap-4 w-full">
                          <a
                            onClick={() => hapusData(data.mapelId)}
                            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                          >
                            Hapus
                          </a>
                          <a
                            onClick={() => ubahData(data.mapelId)}
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
            <div className="w-full text-red-500">Belum ada data</div>
          )}
        </Card>
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
