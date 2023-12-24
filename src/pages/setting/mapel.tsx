import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { getAll, getOne, post } from "@/services/mapelService";
import { MataPelajarans } from "@prisma/client";
import { Button, Card, Label, Table, TextInput } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";

export interface NewForm {
  code: string;
  name: string;
}

const MapelPage = () => {
  const [showForm, setShowForm] = useState(false);

  let initialState: NewForm = {
    code: "",
    name: "",
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  const [dataMapel, setDataMapel] = useState<MataPelajarans[]>([]);

  const getData = async () => {
    try {
      let datas = await getAll();
      setDataMapel(datas.data);
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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let store = await post(JSON.stringify(newData));

      if (store.data) {
        setNewData(initialState);
        getData();
      } else {
        console.error("Failed to post data");
      }

      setShowForm(false);
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
        <title>Setting Mapel</title>
      </Head>

      <Card className="w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Mapel
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
                <form
                  action=""
                  onSubmit={handleFormSubmit}
                  className="space-y-4"
                >
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
                        value={newData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label htmlFor="code" value="Code" />
                      </div>
                      <TextInput
                        id="code"
                        name="code"
                        type="text"
                        placeholder="code mapel..."
                        value={newData.code}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      gradientDuoTone="purpleToPink"
                      className="w-fit"
                    >
                      Simpan
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
                              href="#"
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                            >
                              Hapus
                            </a>
                            <a
                              href="#"
                              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
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

MapelPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default MapelPage;
