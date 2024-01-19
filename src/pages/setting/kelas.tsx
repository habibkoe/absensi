import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import {
  deleteData,
  editData,
  getAllData,
  getOneData,
  postData,
} from "@/services/classRoomService";
import { ClassRooms } from "@prisma/client";
import {
  Button,
  Card,
  Label,
  Select,
  Table,
  TextInput,
  Toast,
} from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiCheck, HiOutlinePlus } from "react-icons/hi";

export interface NewForm {
  name: string;
  location: string;
  levelClass: number;
  studentTotal: number;
}

const KelasPage = () => {
  let initialState: NewForm = {
    name: "",
    location: "",
    studentTotal: 0,
    levelClass: 0,
  };

  const [showForm, setShowForm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState("");

  const [currentId, setCurrentId] = useState(0);
  const [newData, setNewData] = useState<NewForm>(initialState);
  const [dataKelas, setDataKelas] = useState<ClassRooms[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataKelas(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (id: any) => {
    try {
      let datas = await getOneData(id);
      setNewData({
        name: datas.data.name,
        location: datas.data.location,
        levelClass: datas.data.levelClass,
        studentTotal: datas.data.studentTotal,
      });

      setShowForm(true);
      setCurrentId(id);
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

  const cencelAdd = () => {
    setNewData(initialState);
    setShowForm(!showForm);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let store = null;

      if (newData.name !== "" && newData.location !== "") {
        if (currentId == 0) {
          store = await postData(JSON.stringify(newData));
        } else {
          store = await editData(currentId, JSON.stringify(newData));
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
          <Button
            gradientDuoTone="pinkToOrange"
            className="w-fit mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            Add <HiOutlinePlus />
          </Button>
        ) : null}

        {showForm ? (
          <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" className="text-gray-300" value="Nama kelas" />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={newData.name}
                    color={newData.name == "" ? "failure" : "gray"}
                    placeholder="nama kelas..."
                    required
                    helperText={
                      newData.name == "" ? (
                        <>
                          <span className="font-medium">Oops!</span> Harus diisi
                        </>
                      ) : null
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="location" className="text-gray-300" value="Lokasi" />
                  </div>
                  <TextInput
                    id="location"
                    type="text"
                    name="location"
                    value={newData.location}
                    color={newData.location == "" ? "failure" : "gray"}
                    placeholder="lokasi kelas..."
                    required
                    helperText={
                      newData.location == "" ? (
                        <>
                          <span className="font-medium">Oops!</span> Harus diisi
                        </>
                      ) : null
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="studentTotal" className="text-gray-300" value="Daya Tampung" />
                  </div>
                  <TextInput
                    id="studentTotal"
                    type="text"
                    name="studentTotal"
                    value={newData.studentTotal}
                    color={newData.studentTotal < 1 ? "failure" : "gray"}
                    placeholder="total daya tampung kelas..."
                    required
                    helperText={
                      newData.studentTotal < 1 ? (
                        <>
                          <span className="font-medium">Oops!</span> Harus diisi
                        </>
                      ) : null
                    }
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="levelClass" className="text-gray-300" value="Level" />
                  </div>
                  <Select
                    id="levelClass"
                    name="levelClass"
                    value={newData.levelClass}
                    onChange={handleInputChange}
                  >
                    <option value="">Pilih</option>
                    <option value="1">Kelas VII</option>
                    <option value="2">Kelas VIII</option>
                    <option value="3">Kelas X</option>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                {newData.name == "" ||
                newData.location == "" ||
                newData.studentTotal == 0 ? (
                  <Button color="light">Simpan</Button>
                ) : (
                  <Button
                    outline
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                    className="w-fit"
                  >
                    Simpan
                  </Button>
                )}
                <Button color="light" onClick={cencelAdd}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : null}

        {dataKelas !== null && dataKelas.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Nama Kelas</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Lokasi</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">Daya Tampung</Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300">
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataKelas.map((data, index) => (
                  <Table.Row
                  className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                    key={data.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-300 dark:text-white">
                      {data.name}
                    </Table.Cell>
                    <Table.Cell>{data.location}</Table.Cell>
                    <Table.Cell>{data.studentTotal}</Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full">
                        <a
                          onClick={() => hapusData(data.id)}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                        >
                          Hapus
                        </a>
                        <a
                          onClick={() => ubahData(data.id)}
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

KelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Kelas">{content}</AppLayout>;
};

export default KelasPage;
