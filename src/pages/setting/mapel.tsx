import AppLayout from "@/components/AppLayout";
import ActionButton from "@/components/Attribute/ActionButton";
import AddButton from "@/components/Attribute/AddButton";
import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
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
import { Button, Card, Label, Table, TextInput, Toast } from "flowbite-react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

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

  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

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

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
  };

  const [saveLoading, setSaveLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaveLoading(true);
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

          setShowToastMessage({
            type: 1,
            message: "Berhasil simpan data",
          });

        } else {
          setShowToastMessage({
            type: 2,
            message: "Gagal simpan data",
          });

          console.error("Failed to post data");
        }

        setShowForm(false);
        setSaveLoading(false);
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
          <AddButton handleClick={() => setShowForm(!showForm)}>
            Tambah data mapel
          </AddButton>
        ) : null}

        {showForm ? (
          <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <CardForm>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="name"
                      className="text-gray-300"
                      value="Nama Mapel"
                    />
                  </div>
                  <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="nama mapel..."
                    required
                    color={newData.name == "" ? "failure" : saveLoading
                    ? "graySave"
                    : "gray"}
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
                    <Label
                      htmlFor="code"
                      className="text-gray-300"
                      value="Code Mapel"
                    />
                  </div>
                  <TextInput
                    id="code"
                    name="code"
                    type="text"
                    color={newData.code == "" ? "failure" : saveLoading
                    ? "graySave"
                    : "gray"}
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
              </CardForm>
              <div className="flex gap-4">
                {newData.name == "" || newData.code == "" ? (
                  <Button color="dark">Simpan</Button>
                ) : (
                  <Button
                    type="submit"
                    gradientDuoTone="pinkToOrange"
                    className="w-fit"
                    disabled={saveLoading}
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
        {dataMapel !== null && dataMapel.length > 0 ? (
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head className="border-b border-[#242526]">
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-10/12">
                  Data Mapel
                </Table.HeadCell>
                <Table.HeadCell className="bg-[#3A3B3C] text-gray-300 w-2/12">
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {dataMapel.map((data, index) => (
                  <Table.Row
                    className="border border-[#242526] bg-[#3A3B3C] hover:bg-[#4f5052]"
                    key={data.id}
                  >
                    <Table.Cell className="td-custom">
                      <span className="text-base text-gray-300 dark:text-white">
                        {data.name}
                      </span>
                      <br />
                      <span className="text-xs text-gray-400 dark:text-white">
                        Code: {data.code}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex flex-wrap gap-4 w-full justify-end items-start">
                        <ActionButton
                          handleClick={() => ubahData(data.id)}
                          title="Edit data"
                        >
                          <HiOutlinePencil />
                        </ActionButton>
                        <ActionButton
                          handleClick={() => hapusData(data.id)}
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

      {showToastMessage.type > 0 ? (
        <Toast className="mb-10 fixed bottom-2 right-10">
          <ToastSave
            type={showToastMessage.type}
            message={showToastMessage.message}
          />
          <Toast.Toggle onDismiss={() => closeToast()} />
        </Toast>
      ) : null}
    </>
  );
};

MapelPage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Setting Mapel">{content}</AppLayout>;
};

export default MapelPage;
