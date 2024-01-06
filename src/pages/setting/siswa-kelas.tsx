import AppLayout from "@/components/AppLayout";
import SelectClassRoom from "@/components/DataComponents/SelectClassRoom";
import SelectPeriode from "@/components/DataComponents/SelectPeriode";
import SelectStudent from "@/components/DataComponents/SelectStudent";
import SelectTahun from "@/components/DataComponents/SelectTahun";
import MainMenu from "@/components/MainMenu";
import {
  deleteData,
  editData,
  getAllData,
  getOneData,
  postData,
} from "@/services/studentRoomService";
import { ClassRooms, StudentsOnClassRooms } from "@prisma/client";
import { Button, Card, Label, Table, TextInput } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export interface NewForm {
  studentId: number;
  classRoomId: number;
  periodeId: number;
  assignedBy: string;
}

const SiswaKelasPage = () => {
  let initialState: NewForm = {
    studentId: 0,
    classRoomId: 0,
    periodeId: 0,
    assignedBy: "",
  };

  const [showForm, setShowForm] = useState(false);

  const [newData, setNewData] = useState<NewForm>(initialState);

  const [dataKelasSiswa, setDataKelasSiswa] = useState<any[]>([]);

  const [currentRoomId, setCurrentRoomId] = useState(0);
  const [currentStudentId, setCurrentStudentId] = useState(0);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataKelasSiswa(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (classRoomId: any, studentId: any) => {
    try {
      let datas = await getOneData(classRoomId, studentId);
      setNewData({
        studentId: datas.data.studentId,
        classRoomId: datas.data.classRoomId,
        periodeId: datas.data.periodeId,
        assignedBy: datas.data.assignedBy,
      });

      setShowForm(true);
      setCurrentRoomId(classRoomId);
      setCurrentStudentId(studentId);
    } catch (error) {
      console.error(error);
    }
  };

  const hapusData = async (classRoomId: any, studentId: any) => {
    try {
      let datas = await deleteData(classRoomId, studentId);
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
    setShowForm(!showForm)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("apa ini ya ", newData);
    try {
      let store = null;

      if (
        newData.studentId !== 0 &&
        newData.classRoomId !== 0 &&
        newData.periodeId !== 0
      ) {
        if (currentRoomId == 0 && currentStudentId == 0) {
          store = await postData(JSON.stringify(newData));
        } else {
          store = await editData(
            currentRoomId,
            currentStudentId,
            JSON.stringify(newData)
          );
        }

        if (store.data) {
          setNewData(initialState);
          setCurrentRoomId(0);
          setCurrentStudentId(0);
          getData();
        } else {
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
        <title>Setting Kelas Siswa</title>
      </Head>

      <Card className="w-full md:w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Kelas Siswa
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
              <div className="border rounded-lg p-5">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                    <div>
                      <SelectClassRoom
                        value={newData.classRoomId}
                        handleChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <SelectStudent
                        value={newData.studentId}
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
                  <div className="flex gap-4">
                    {newData.classRoomId == 0 || newData.studentId == 0 ? (
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
                    <Button color="light" onClick={cencelAdd}>Cancel</Button>
                  </div>
                </form>
              </div>
            ) : null}

            {dataKelasSiswa !== null && dataKelasSiswa.length > 0 ? (
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Nama Kelas</Table.HeadCell>
                    <Table.HeadCell>Lokasi</Table.HeadCell>
                    <Table.HeadCell>Total Siswa</Table.HeadCell>
                    <Table.HeadCell>Daya Tampung Per Angkatan</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataKelasSiswa.map((data, index) => (
                      <Table.Row
                        key={"as" + index}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.name}
                        </Table.Cell>
                        <Table.Cell>Lantai dasar</Table.Cell>
                        <Table.Cell>{data._count.students}</Table.Cell>
                        <Table.Cell>{data.studentTotal}</Table.Cell>
                        <Table.Cell>
                          <div className="flex flex-wrap gap-4 w-full">
                            <a
                              onClick={() =>
                                hapusData(data.classRoomId, data.studentId)
                              }
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Hapus
                            </a>
                            <a
                              onClick={() =>
                                ubahData(data.classRoomId, data.studentId)
                              }
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
                            >
                              Detail
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
      </Card>
    </>
  );
};

SiswaKelasPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default SiswaKelasPage;
