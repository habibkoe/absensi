import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import SelectTahun from "@/components/DataComponents/SelectTahun";
import { useCreatePost, usePostById, useUpdatePost } from "@/hooks/periodeHook";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import React, { MouseEvent, useEffect, useState } from "react";

export interface NewForm {
  id?: Number | null;
  name?: string | null;
  periodeStart?: number;
  periodeEnd?: number;
}

interface Props {
  id?: any;
  isEdit?: boolean;
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormPeriode = (props: Props) => {

  const {
    data: dataPeriode,
    isPending: isPeriodeLoading,
    isError: isPeriodeError,
  } = usePostById(props.id);

  let initialState: NewForm = {
    id: null,
    name: "",
    periodeStart: 0,
    periodeEnd: 0,
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  useEffect(() => {
    if (props.id != null) {
      setNewData({
        id: props.id,
        name: dataPeriode?.name,
        periodeStart: dataPeriode?.periodeStart,
        periodeEnd: dataPeriode?.periodeEnd,
      });
    }
  }, [isPeriodeLoading]);

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
        newData.name !== "" &&
        newData.periodeStart !== 0 &&
        newData.periodeEnd !== 0
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

  if (isPeriodeLoading) {
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
                    value="Nama Periode"
                  />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  type="text"
                  placeholder="nama periode..."
                  required
                  color={
                    newData.name == ""
                      ? "failure"
                      : saveLoading
                      ? "graySave"
                      : "gray"
                  }
                  value={newData.name ? newData.name : ""}
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
                <SelectTahun
                  label="Tahun Mulai Ajaran"
                  name="periodeStart"
                  value={newData.periodeStart}
                  handleChange={handleInputChange}
                  color={saveLoading ? "graySave" : "gray"}
                />
              </div>
              <div>
                <SelectTahun
                  label="Tahun Selesai Ajaran"
                  name="periodeEnd"
                  value={newData.periodeEnd}
                  handleChange={handleInputChange}
                  color={saveLoading ? "graySave" : "gray"}
                />
              </div>
            </CardForm>
            <div className="flex gap-4">
              {newData.name == "" ||
              newData.periodeStart == 0 ||
              newData.periodeEnd == 0 ? (
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

export default FormPeriode;
