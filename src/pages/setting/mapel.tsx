import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { MataPelajarans } from "@prisma/client";
import { Button, Card, Label, Table, TextInput } from "flowbite-react";
import Head from "next/head";
import React, { useState } from "react";

const MapelPage = () => {
  const [showForm, setShowForm] = useState(false);

  const [dataMapel, setDataMapel] = useState<MataPelajarans>();
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
              <div className="border rounded-lg p-5 space-y-4">
                <div className="grid md:grid-cols-3 grid-cols-1 gap-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email1" value="Nama Mapel" />
                    </div>
                    <TextInput
                      id="email1"
                      type="email"
                      placeholder="name@flowbite.com"
                      required
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email1" value="Code" />
                    </div>
                    <TextInput
                      id="email1"
                      type="email"
                      placeholder="name@flowbite.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Button
                    gradientDuoTone="purpleToPink"
                    className="w-fit"
                    onClick={() => setShowForm(!showForm)}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            ) : null}

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
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Ipa
                    </Table.Cell>
                    <Table.Cell>IPA-01</Table.Cell>
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
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Ips
                    </Table.Cell>
                    <Table.Cell>IPA-01</Table.Cell>
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
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Matematika
                    </Table.Cell>
                    <Table.Cell>IPA-01</Table.Cell>
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
                </Table.Body>
              </Table>
            </div>
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
