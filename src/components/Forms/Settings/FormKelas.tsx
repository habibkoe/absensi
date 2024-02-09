import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import { useCreatePost, usePostById, useUpdatePost } from "@/hooks/kelasHook";
import { Button, Label, Select, TextInput, Toast } from "flowbite-react";
import React, { MouseEvent, useEffect, useState } from "react";

export interface NewForm {
  id?: Number | null;
  name?: string;
  location?: string;
  levelClass?: number;
  studentTotal?: number;
}
interface Props {
  id?: any;
  isEdit?: boolean;
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormKelas = (props: Props) => {

  const {
    data: dataDetail,
    isPending: isDataLoading,
    isError: isPeriodeError,
  } = usePostById(props.id);

  let initialState: NewForm = {
    id: null,
    name: "",
    location: "",
    levelClass: 0,
    studentTotal: 0
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  useEffect(() => {
    if (props.id != null) {
      setNewData({
        id: props.id,
        name: dataDetail?.name,
        location: dataDetail?.location,
        levelClass: dataDetail?.levelClass,
        studentTotal: dataDetail?.studentTotal
      });
    }
  }, [isDataLoading]);

  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

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

  const [saveLoading, setSaveLoading] = useState(false);

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
  };

  const {
    mutate: addMutate,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreatePost();

  const {
    mutate: editMudate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdatePost();

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaveLoading(true);
      let store = null;

      if (
        newData.name !== "" && newData.location !== ""
      ) {
        if (!props.isEdit) {
          store = addMutate(newData, {
            onSuccess: (response) => {
              return response.data.body;
            },
          });
        } else {
          store = editMudate(
            { id: props.id, data: newData },
            {
              onSuccess: (response) => {
                return response.data.body;
              },
            }
          );
        }

        if (store !== null) {
          setNewData(initialState);

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

        setSaveLoading(false);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (isDataLoading) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <div className="rounded-lg p-5 mb-4 bg-[#3A3B3C]">
        <form onSubmit={handleFormSubmit} className="space-y-4">
              <CardForm>
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="name"
                      className="text-gray-300"
                      value="Nama kelas"
                    />
                  </div>
                  <TextInput
                    id="name"
                    type="text"
                    name="name"
                    value={newData.name}
                    color={
                      newData.name == ""
                        ? "failure"
                        : saveLoading
                        ? "graySave"
                        : "gray"
                    }
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
                    <Label
                      htmlFor="location"
                      className="text-gray-300"
                      value="Lokasi"
                    />
                  </div>
                  <TextInput
                    id="location"
                    type="text"
                    name="location"
                    value={newData.location}
                    color={
                      newData.location == ""
                        ? "failure"
                        : saveLoading
                        ? "graySave"
                        : "gray"
                    }
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
                    <Label
                      htmlFor="studentTotal"
                      className="text-gray-300"
                      value="Daya Tampung"
                    />
                  </div>
                  <TextInput
                    id="studentTotal"
                    type="text"
                    name="studentTotal"
                    value={newData.studentTotal}
                    color={
                      newData.studentTotal == undefined || newData.studentTotal < 1
                        ? "failure"
                        : saveLoading
                        ? "graySave"
                        : "gray"
                    }
                    placeholder="total daya tampung kelas..."
                    required
                    helperText={
                      newData.studentTotal == undefined || newData.studentTotal < 1 ? (
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
                      htmlFor="levelClass"
                      className="text-gray-300"
                      value="Level"
                    />
                  </div>
                  <Select
                    id="levelClass"
                    name="levelClass"
                    value={newData.levelClass}
                    onChange={handleInputChange}
                    color={saveLoading ? "graySave" : "gray"}
                  >
                    <option value="">Pilih</option>
                    <option value="1">Kelas VII</option>
                    <option value="2">Kelas VIII</option>
                    <option value="3">Kelas IX</option>
                  </Select>
                </div>
              </CardForm>
              <div className="flex gap-4">
                {newData.name == "" ||
                newData.location == "" ||
                newData.studentTotal == 0 ? (
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
                <Button color="dark" onClick={props.handleCancel}>
                  Cancel
                </Button>
              </div>
            </form>
        </div>
        {showToastMessage.type > 0 ? (
          <Toast className="mb-10 fixed bottom-2 right-10 z-50">
            <ToastSave
              type={showToastMessage.type}
              message={showToastMessage.message}
            />
            <Toast.Toggle onDismiss={() => closeToast()} />
          </Toast>
        ) : null}
      </>
    );
  }
};

export default FormKelas;
