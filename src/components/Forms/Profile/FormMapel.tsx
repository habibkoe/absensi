import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import SelectMapel from "@/components/DataComponents/SelectMapel";
import {
  useUserMapelCreatePost,
  useUserMapelPostById,
  useUserMapelUpdatePost,
} from "@/hooks/mapelHook";
import { Button, Toast } from "flowbite-react";
import { useSession } from "next-auth/react";
import React, { MouseEvent, useEffect, useState } from "react";

export interface NewForm {
  userId: number;
  mapelId: number;
  assignedBy: string;
}

interface Props {
  userId?: any;
  mapelId?: any;
  isEdit?: boolean;
  handleCancel?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const FormMapel = (props: Props) => {
  const { data: session } = useSession();

  let {
    isPending: isDataLoading,
    error: isPeriodeError,
    data: dataDetail,
  } = useUserMapelPostById(props.mapelId, Number(session?.user?.id));

  let initialState: NewForm = {
    userId: Number(session?.user?.id),
    mapelId: 0,
    assignedBy: String(session?.user?.username),
  };

  const [newData, setNewData] = useState<NewForm>(initialState);

  useEffect(() => {
    if (props.userId != null && props.mapelId) {
      setNewData({
        userId: Number(session?.user?.id),
        mapelId: dataDetail?.classRoomId,
        assignedBy: dataDetail?.assignedBy,
      });
    }
  }, [isDataLoading]);

  const {
    mutate: addMutate,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useUserMapelCreatePost();

  const {
    mutate: editMudate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
  } = useUserMapelUpdatePost();

  const [saveLoading, setSaveLoading] = useState(false);

  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
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
      setSaveLoading(true);
      let store = null;

      if (newData.mapelId !== 0) {
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
                <SelectMapel
                  value={newData.mapelId}
                  handleChange={handleInputChange}
                />
              </div>
            </CardForm>
            <div className="flex gap-4">
              {newData.mapelId == 0 ? (
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

export default FormMapel;
