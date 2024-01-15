import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { siteConfig } from "@/libs/config";
import {
  deleteData,
  editData,
  getAllData,
  getOneData,
  postData,
} from "@/services/mapelService";
import { MataPelajarans } from "@prisma/client";
import { Button, Card, Label, Table, TextInput } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";

export interface NewForm {
  code: string;
  name: string;
}

const MapelPage = () => {
  let initialState: NewForm = {
    code: "",
    name: "",
  };

  const [showForm, setShowForm] = useState(false);

  const [currentId, setCurrentId] = useState(0);

  const [newData, setNewData] = useState<NewForm>(initialState);
  const [dataMapel, setDataMapel] = useState<MataPelajarans[]>([]);

  const getData = async () => {
    try {
      let datas = await getAllData();
      setDataMapel(datas.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ubahData = async (id: any) => {
    try {
      let datas = await getOneData(id);
      setNewData({
        code: datas.data.code,
        name: datas.data.name,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

      if (newData.code !== "" && newData.name !== "") {
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
        <title>{`${siteConfig.title} : Setting Mapel`}</title>
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
          <div className="border rounded-lg p-5 mb-4">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Nama Mapel" />
                  </div>
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="nama mapel..."
                    required
                    color={newData.name == "" ? "failure" : "gray"}
                    value={newData.name}
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
                    <Label htmlFor="code" value="Code Mapel" />
                  </div>
                  <TextInput
                    id="code"
                    name="code"
                    type="text"
                    color={newData.code == "" ? "failure" : "gray"}
                    placeholder="code mapel..."
                    value={newData.code}
                    helperText={
                      newData.code == "" ? (
                        <>
                          <span className="font-medium">Oops!</span> Harus diisi
                        </>
                      ) : null
                    }
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {newData.name == "" || newData.code == "" ? (
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
        {dataMapel !== null && dataMapel.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Nama Mapel</Table.HeadCell>
                <Table.HeadCell>Code</Table.HeadCell>
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataMapel.map((data, index) => (
                  <Table.Row
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    key={data.id}
                  >
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {data.name}
                    </Table.Cell>
                    <Table.Cell>{data.code}</Table.Cell>
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

MapelPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Mapel">{content}</AppLayout>;
};

export default MapelPage;
