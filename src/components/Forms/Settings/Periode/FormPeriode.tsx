import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import SelectTahun from "@/components/DataComponents/SelectTahun";
import { useCreatePost, useUpdatePost } from "@/hooks/periodeHook";
import { useGlobalState } from "@/store/globalStore";
import { Periode } from "@prisma/client";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(3, "Character minimum 3").nullable(),
  periodeStart: z.number(),
  periodeEnd: z.number(),
});

export type NewForm = z.infer<typeof formSchema>;

interface Props {
  data?: Periode;
}

const FormPeriode = (props: Props) => {
  let initialState: NewForm = {
    id: props.data ? props.data.id : null,
    name: props.data ? props.data.name : "",
    periodeStart: props.data ? props.data.periodeStart : 0,
    periodeEnd: props.data ? props.data.periodeEnd : 0,
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

    let valueReal: any = value;
    if (name == "periodeStart" || name == "periodeEnd") {
      valueReal = Number(value);
    }

    setNewData({
      ...newData,
      [name]: valueReal,
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
    setNewData(initialState);
    if (newData.id === null) {
      setGlobal("showFormPeriode", false);
    } else {
      setGlobalArray("showFormEditPeriode", newData.id, false);
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
          console.log("check save A ", newData);
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
            setGlobal("showFormPeriode", false);
          } else {
            setGlobalArray("showFormEditPeriode", newData.id, false);
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
      newData.periodeEnd == 0 ||
      newData.periodeStart == 0
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
                  value="Nama Periode"
                />
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="nama periode..."
                required
                value={newData.name ? newData.name : ""}
                color={
                  getError("name") !== null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("name") !== null ? <>{getError("name")}</> : null
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <SelectTahun
                label="Tahun Mulai Ajaran"
                name="periodeStart"
                value={String(newData.periodeStart)}
                handleChange={handleInputChange}
                color={saveLoading ? "graySave" : "gray"}
              />
            </div>
            <div>
              <SelectTahun
                label="Tahun Selesai Ajaran"
                name="periodeEnd"
                value={String(newData.periodeEnd)}
                handleChange={handleInputChange}
                color={saveLoading ? "graySave" : "gray"}
              />
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

  // return (
  //   <div>Kucing</div>
  // )
};

export default FormPeriode;
