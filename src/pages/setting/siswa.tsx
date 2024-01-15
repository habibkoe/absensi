import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import {
  deleteData,
  getAllData,
  getOneData,
  postData,
  editData,
} from "@/services/studentService";
import { Students } from "@prisma/client";
import { format } from "date-fns";
import {
  Button,
  Card,
  Datepicker,
  Label,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

export interface NewForm {
  nis: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  parent: string;
  rating: number;
  favoriteLearn: string;
  Hobby: string;
}

const SiswaPage = () => {
  let initialState: NewForm = {
    nis: "",
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    parent: "",
    rating: 0,
    favoriteLearn: "",
    Hobby: "",
  };

  const [showForm, setShowForm] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const [newData, setNewData] = useState<NewForm>(initialState);

  const [dataSiswa, setDataSiswa] = useState<Students[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataSiswa(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (id: any) => {
    try {
      let datas = await getOneData(id);
      setNewData({
        nis: datas.data.nis,
        firstName: datas.data.firstName,
        lastName: datas.data.lastName,
        email: datas.data.email,
        gender: datas.data.gender,
        dateOfBirth: datas.data.dateOfBirth,
        address: datas.data.address,
        parent: datas.data.parent,
        rating: datas.data.rating,
        favoriteLearn: datas.data.favoriteLearn,
        Hobby: datas.data.Hobby,
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

  const datePickerHandler = (params: any) => {
    console.log("masuk sini nggak ", params);

    let newDate = format(new Date(params), "dd/MM/yyyy");

    console.log("masuk sini nggak new date ", newDate);
    setNewData({
      ...newData,
      dateOfBirth: newDate,
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
        newData.nis !== "" &&
        newData.firstName !== "" &&
        newData.gender !== "" &&
        String(newData.dateOfBirth) !== ""
      ) {
        console.log("apa ini ya inside ", newData);
        console.log("apa ini ya inside ", currentId);
        if (currentId == 0) {
          store = await postData(JSON.stringify(newData));
        } else {
          store = await editData(currentId, JSON.stringify(newData));
        }

        if (store.data) {
          setNewData(initialState);
          setCurrentId(0);
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
        <title>{`${siteConfig.title} : Setting Siswa`}</title>
      </Head>

      <div className="w-full">
        {!showForm ? (
          <Button
            outline
            gradientDuoTone="purpleToPink"
            className="w-fit mb-4"
            onClick={() => setShowForm(!showForm)}
          >
            Add <HiOutlinePlus />
          </Button>
        ) : null}

        {showForm ? (
          <div className="border rounded-lg p-5">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="nis" value="NIS" />
                  </div>
                  <TextInput
                    id="nis"
                    name="nis"
                    type="text"
                    placeholder="Nis siswa..."
                    required
                    color={newData.nis == "" ? "failure" : "gray"}
                    value={newData.nis}
                    helperText={
                      newData.nis == "" ? (
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
                    <Label htmlFor="firstName" value="Nama awal" />
                  </div>
                  <TextInput
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="nama awal..."
                    required
                    color={newData.firstName == "" ? "failure" : "gray"}
                    value={newData.firstName}
                    helperText={
                      newData.firstName == "" ? (
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
                    <Label htmlFor="lastName" value="Nama Ahir" />
                  </div>
                  <TextInput
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="nama ahir..."
                    value={newData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email siswa..."
                    value={newData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="gender" value="Gender" />
                  </div>
                  <Select
                    id="gender"
                    name="gender"
                    required
                    value={newData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Pilih</option>
                    <option value="laki - laki">Laki - Laki</option>
                    <option value="perempuan">Perempuan</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email1" value="DOB" />
                  </div>
                  <Datepicker
                    name="dateOfBirth"
                    language="ID"
                    value={newData.dateOfBirth}
                    showTodayButton={false}
                    showClearButton={true}
                    onSelectedDateChanged={(date) => datePickerHandler(date)}
                    color="gray"
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="address" value="Alamat" />
                  </div>
                  <TextInput
                    id="address"
                    type="text"
                    name="address"
                    placeholder="Alamat siswa..."
                    value={newData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="parent" value="Orang Tua" />
                  </div>
                  <TextInput
                    id="parent"
                    type="text"
                    name="parent"
                    placeholder="Nama orang tua siswa..."
                    value={newData.parent}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="rating" value="Rating" />
                  </div>
                  <TextInput
                    id="rating"
                    type="text"
                    name="rating"
                    placeholder="Rating siswa..."
                    value={newData.rating}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="favoriteLearn" value="Pelajaran Paforite" />
                  </div>
                  <TextInput
                    id="favoriteLearn"
                    type="text"
                    name="favoriteLearn"
                    placeholder="pelajaran paforit siswa..."
                    value={newData.favoriteLearn}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Hobby" value="Hobby" />
                  </div>
                  <TextInput
                    id="Hobby"
                    type="text"
                    name="Hobby"
                    placeholder="Hobi siswa..."
                    value={newData.Hobby}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {newData.nis == "" ||
                newData.firstName == "" ||
                newData.gender == "" ? (
                  <Button color="light">Simpan</Button>
                ) : (
                  <Button
                    outline
                    type="submit"
                    gradientDuoTone="purpleToPink"
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
        {dataSiswa !== null && dataSiswa.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Nama Siswa</Table.HeadCell>
                <Table.HeadCell>NIS</Table.HeadCell>
                <Table.HeadCell>JK</Table.HeadCell>
                <Table.HeadCell>Alamat</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataSiswa.map((data, index) => (
                  <Table.Row
                    key={data.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {data.firstName} {data.lastName}
                    </Table.Cell>
                    <Table.Cell>{data.nis}</Table.Cell>
                    <Table.Cell>{data.gender}</Table.Cell>
                    <Table.Cell>{data.address}</Table.Cell>
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
    </>
  );
};

SiswaPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Siswa">{content}</AppLayout>;
};

export default SiswaPage;
