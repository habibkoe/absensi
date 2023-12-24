import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { Students } from "@prisma/client";
import { Button, Card, Label, Table, TextInput } from "flowbite-react";
import Head from "next/head";
import React, { useState } from "react";

const SiswaPage = () => {
  const [showForm, setShowForm] = useState(false);

  const [dataSiswa, setDataSiswa] = useState<Students>();

  return (
    <>
      <Head>
        <title>Setting Siswa</title>
      </Head>

      <Card className="w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Setting Siswa
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
                      <Label htmlFor="email1" value="NIS" />
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
                      <Label htmlFor="email1" value="Nama" />
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
                      <Label htmlFor="email1" value="Email" />
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
                      <Label htmlFor="email1" value="Gender" />
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
                      <Label htmlFor="email1" value="DOB" />
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
                      <Label htmlFor="email1" value="Alamat" />
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
                      <Label htmlFor="email1" value="Orang Tua" />
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
                      <Label htmlFor="email1" value="Rating" />
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
                      <Label htmlFor="email1" value="Pelajaran Paforite" />
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
                      <Label htmlFor="email1" value="Hobby" />
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
                  <Table.HeadCell>Nama Siswa</Table.HeadCell>
                  <Table.HeadCell>NIS</Table.HeadCell>
                  <Table.HeadCell>JK</Table.HeadCell>
                  <Table.HeadCell>Alamat</Table.HeadCell>
                  <Table.HeadCell>
                    <span className="sr-only">Edit</span>
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      Imin
                    </Table.Cell>
                    <Table.Cell>0239230023</Table.Cell>
                    <Table.Cell>Laki - Laki</Table.Cell>
                    <Table.Cell>KLU</Table.Cell>
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
                      Imin
                    </Table.Cell>
                    <Table.Cell>0239230023</Table.Cell>
                    <Table.Cell>Laki - Laki</Table.Cell>
                    <Table.Cell>KLU</Table.Cell>
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
                      Imin
                    </Table.Cell>
                    <Table.Cell>0239230023</Table.Cell>
                    <Table.Cell>Laki - Laki</Table.Cell>
                    <Table.Cell>KLU</Table.Cell>
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
                      Imin
                    </Table.Cell>
                    <Table.Cell>0239230023</Table.Cell>
                    <Table.Cell>Laki - Laki</Table.Cell>
                    <Table.Cell>KLU</Table.Cell>
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

SiswaPage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default SiswaPage;
