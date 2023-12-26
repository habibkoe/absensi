import AppLayout from "@/components/AppLayout";
import SelectTahun from "@/components/DataComponents/SelectTahun";
import MainMenu from "@/components/MainMenu";
import {
  deleteData,
  editData,
  getAllData,
  getOneData,
  postData,
} from "@/services/periodeService";
import { MataPelajarans, Periode } from "@prisma/client";
import { Button, Card, Label, Table, TextInput } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export interface NewForm {
  name: string;
  periodeStart: number;
  periodeEnd: number;
}

const PeriodePage = () => {
  let initialState: NewForm = {
    name: "",
    periodeStart: 0,
    periodeEnd: 0,
  };

  const [showForm, setShowForm] = useState(false);

  const [currentId, setCurrentId] = useState(0);

  const [newData, setNewData] = useState<NewForm>(initialState);
  const [dataPeriode, setDataPeriode] = useState<Periode[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataPeriode(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (id: any) => {
    try {
      let datas = await getOneData(id);
      setNewData({
        name: datas.data.name,
        periodeStart: datas.data.periodeStart,
        periodeEnd: datas.data.periodeEnd,
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let store = null;

      if (
        newData.name !== "" &&
        newData.periodeStart !== 0 &&
        newData.periodeEnd !== 0
      ) {
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
        <title>Setting Periode</title>
      </Head>

      <Card className="w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Periode
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
                      <div className="mb-2 block">
                        <Label htmlFor="name" value="Nama Periode" />
                      </div>
                      <TextInput
                        id="name"
                        name="name"
                        type="text"
                        placeholder="nama periode..."
                        required
                        color={newData.name == "" ? "failure" : "gray"}
                        value={newData.name}
                        helperText={
                          newData.name == "" ? (
                            <>
                              <span className="font-medium">Oops!</span> Harus
                              diisi
                            </>
                          ) : null
                        }
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <SelectTahun
                        label="Tahun Mulai Ajaran"
                        name="periodeStart"
                        value={newData.periodeStart}
                        handleChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <SelectTahun
                        label="Tahun Selesai Ajaran"
                        name="periodeEnd"
                        value={newData.periodeEnd}
                        handleChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    {newData.name == "" ||
                    newData.periodeStart == 0 ||
                    newData.periodeEnd == 0 ? (
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
            {dataPeriode !== null && dataPeriode.length > 0 ? (
              <div className="overflow-x-auto">
                <Table hoverable>
                  <Table.Head>
                    <Table.HeadCell>Nama Tahun Ajaran</Table.HeadCell>
                    <Table.HeadCell>Tahun Ajaran</Table.HeadCell>
                    <Table.HeadCell>
                      <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataPeriode.map((data, index) => (
                      <Table.Row
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        key={data.id}
                      >
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                          {data.name}
                        </Table.Cell>
                        <Table.Cell>{data.periodeStart} - {data.periodeEnd}</Table.Cell>
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
              <div className="w-full text-black">Belum ada data</div>
            )}
          </Card>
        </div>
      </Card>
    </>
  );
};

PeriodePage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default PeriodePage;
