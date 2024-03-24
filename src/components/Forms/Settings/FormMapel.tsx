import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import { useCreatePost, usePostById, useUpdatePost } from "@/hooks/mapelHook";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import React, { MouseEvent, useEffect, useState } from "react";

export interface NewForm {
  id?: Number | null;
  code?: string;
  name?: string;
}

interface Props {
  id?: any;
  isEdit?: boolean;
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormMapel = (props: Props) => {
  const {
    data: dataDetail,
    isPending: isDataLoading,
    isError: isPeriodeError,
  } = usePostById(props.id);

  let initialState: NewForm = {
    id: null,
    code: "",
    name: "",
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  useEffect(() => {
    if (props.id != null) {
      setNewData({
        id: props.id,
        code: dataDetail?.code,
        name: dataDetail?.name,
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

      if (newData.code !== "" && newData.name !== "") {
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
                    value="Nama Mapel"
                  />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="nama mapel..."
                  required
                  color={
                    newData.name == ""
                      ? "failure"
                      : saveLoading
                      ? "graySave"
                      : "gray"
                  }
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
                  color={
                    newData.code == ""
                      ? "failure"
                      : saveLoading
                      ? "graySave"
                      : "gray"
                  }
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

export default FormMapel;
