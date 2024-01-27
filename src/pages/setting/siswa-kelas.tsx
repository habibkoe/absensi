import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import CardForm from "@/components/Attribute/CardForm";
import SelectClassRoom from "@/components/DataComponents/SelectClassRoom";
import SelectPeriode from "@/components/DataComponents/SelectPeriode";
import SelectStudent from "@/components/DataComponents/SelectStudent";
import SelectTahun from "@/components/DataComponents/SelectTahun";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
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
import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

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
    setShowForm(!showForm);
  };

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
        <title>{`${siteConfig.title} : Setting Kelas Siswa`}</title>
      </Head>

      <div className="w-full">
        {!showForm ? (
          <AddButton handleClick={() => setShowForm(!showForm)}>
            Tambah data mapel
          </AddButton>
        ) : null}

        {showForm ? (
          <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <CardForm>
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
              </CardForm>
              <div className="flex gap-4">
                {newData.classRoomId == 0 || newData.studentId == 0 ? (
                  <Button color="dark">Simpan</Button>
                ) : (
                  <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                    className="w-fit"
                  >
                    Simpan
                  </Button>
                )}
                <Button color="dark" onClick={cencelAdd}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        ) : null}

        {dataKelasSiswa !== null && dataKelasSiswa.length > 0 ? (
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
                {dataKelasSiswa.map((data, index) => (
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
