import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import { useCreatePost, useUpdatePost } from "@/hooks/kelasHook";
import { useGlobalState } from "@/store/globalStore";
import { ClassRooms } from "@prisma/client";
import { Button, Label, Select, TextInput, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(3, "Character minimum 3").nullable(),
  location: z.string().min(3, "Character minimum 3").nullable(),
  levelClass: z.number().nullable(),
  studentTotal: z.number().nullable(),
});

export type NewForm = z.infer<typeof formSchema>;

interface Props {
  data?: ClassRooms;
}

const FormKelas = (props: Props) => {
  let initialState: NewForm = {
    id: props.data ? props.data.id : null,
    name: props.data ? props.data.name : "",
    location: props.data ? props.data.location : "",
    levelClass: props.data ? props.data.levelClass : 0,
    studentTotal: props.data ? props.data.studentTotal : 0,
  };

  const [newData, setNewData] = useState<NewForm>(initialState);
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const setGlobalArray = useGlobalState((state) => state.setGlobalArray);

  const [errors, setErrors] = useState<ZodIssue[]>([]);

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

  const validate = () => {
    const formData = formSchema.safeParse(newData);

    if (!formData.success) {
      const { issues } = formData.error;
      setErrors(issues);
      return false;
    } else {
      setErrors([]);
      return true;
    }
  };

  const [saveLoading, setSaveLoading] = useState(false);

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
  };

  const closeForm = () => {
    console.log("close form ini ");
    if (newData.id === null) {
      setGlobal("showFormKelas", false);
    } else {
      setGlobalArray("showFormEditKelas", newData.id, false);
    }
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
      let checkValidate = validate();
      let store = null;

      if (checkValidate) {
        if (newData.id === null) {
          store = addMutate(newData, {
            onSuccess: (response) => {
              return response.data.body;
            },
          });
        } else {
          store = editMudate(
            { id: newData.id, data: newData },
            {
              onSuccess: (response) => {
                return response.data.body;
              },
            }
          );
        }

        if (store !== null) {
          if (newData.id === null) {
            setGlobal("showFormKelas", false);
          } else {
            setGlobalArray("showFormEditKelas", newData.id, false);
          }

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

  const getError = (path: any) => {
    const error = errors.find((error) => error.path[0] === path);
    return error ? error?.message : null;
  };

  const [checkErrors, setCheckErrors] = useState<boolean>(false);

  useEffect(() => {
    if (
      newData.name == "" ||
      newData.name == null ||
      newData.location == "" ||
      newData.location == null ||
      newData.levelClass == 0 ||
      newData.studentTotal == 0
    ) {
      setCheckErrors(true);
    } else {
      setCheckErrors(false);
    }
  }, [newData]);

  return (
    <>
      <div className="card-form">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <CardForm>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="name"
                  className="form-label"
                  value="Nama kelas"
                />
              </div>
              <TextInput
                id="name"
                type="text"
                name="name"
                value={String(newData.name)}
                color={
                  getError("name") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("name") != null ? <>{getError("name")}</> : null
                }
                placeholder="nama kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="location"
                  className="form-label"
                  value="Lokasi"
                />
              </div>
              <TextInput
                id="location"
                type="text"
                name="location"
                value={String(newData.location)}
                color={
                  getError("location") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("location") != null ? (
                    <>{getError("location")}</>
                  ) : null
                }
                placeholder="lokasi kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="studentTotal"
                  className="form-label"
                  value="Daya Tampung"
                />
              </div>
              <TextInput
                id="studentTotal"
                type="text"
                name="studentTotal"
                value={String(newData.studentTotal)}
                color={
                  getError("studentTotal") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("studentTotal") != null ? (
                    <>{getError("studentTotal")}</>
                  ) : null
                }
                placeholder="total daya tampung kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="levelClass"
                  className="form-label"
                  value="Level"
                />
              </div>
              <Select
                id="levelClass"
                name="levelClass"
                value={String(newData.levelClass)}
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
          <div className="form-footer">
            <Button color="dark" onClick={closeForm}>
              Cancel
            </Button>
            {checkErrors ? (
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
          </div>
        </form>
      </div>
      {showToastMessage.type > 0 ? (
        <Toast className="mb-10 fixed bottom-2 right-10 z-50">
          <ToastSave
            type={showToastMessage.type}
            message={showToastMessage.message}
          />
          <Toast.Toggle onDismiss={closeToast} />
        </Toast>
      ) : null}
    </>
  );
};

export default FormKelas;
