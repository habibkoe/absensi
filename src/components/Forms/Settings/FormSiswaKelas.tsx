import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import SelectClassRoom from "@/components/DataComponents/SelectClassRoom";
import SelectPeriode from "@/components/DataComponents/SelectPeriode";
import SelectStudent from "@/components/DataComponents/SelectStudent";
import {
  useCreatePost,
  usePostById,
  useUpdatePost,
} from "@/hooks/siswaKelasHook";
import { Button, Toast } from "flowbite-react";
import React, { MouseEvent, useEffect, useState } from "react";

export interface NewForm {
  studentId?: number;
  classRoomId?: number;
  periodeId?: number | null;
  assignedBy?: string;
}

interface Props {
  studentId?: any;
  classRoomId?: any;
  isEdit?: boolean;
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormSiswaKelas = (props: Props) => {
  const {
    data: dataDetail,
    isPending: isDataLoading,
    isError: isPeriodeError,
  } = usePostById(props.studentId, props.classRoomId);

  let initialState: NewForm = {
    studentId: 0,
    classRoomId: 0,
    periodeId: 0,
    assignedBy: "",
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  useEffect(() => {
    if (props.studentId != null && props.classRoomId) {
      setNewData({
        studentId: dataDetail?.studentId,
        classRoomId: dataDetail?.classRoomId,
        periodeId: dataDetail?.periodeId,
        assignedBy: dataDetail?.assignedBy,
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
        newData.studentId !== 0 &&
        newData.classRoomId !== 0 &&
        newData.periodeId !== 0
      ) {
        if (!props.isEdit) {
          store = addMutate(newData, {
            onSuccess: (response) => {
              return response.data.body;
            },
          });
        } else {
          store = editMudate(
            { data: newData },
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
                <SelectClassRoom
                  value={newData.classRoomId}
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <SelectStudent
                  value={newData.studentId}
                  handleChange={handleInputChange}
                />
              </div>
              <div>
                <SelectPeriode
                  value={newData.periodeId !== null ? newData.periodeId : 0}
                  handleChange={handleInputChange}
                />
              </div>
            </CardForm>
            <div className="flex gap-4">
              {newData.classRoomId == 0 || newData.studentId == 0 ? (
                <Button color="dark">Simpan</Button>
              ) : (
                <Button
                  type="submit"
                  gradientDuoTone="pinkToOrange"
                  className="w-fit"
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

export default FormSiswaKelas;
