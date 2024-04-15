import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import SelectKecamatan from "@/components/DataComponents/SelectKecamatan";
import SelectKelurahan from "@/components/DataComponents/SelectKelurahan";
import SelectKota from "@/components/DataComponents/SelectKota";
import SelectProvinsi from "@/components/DataComponents/SelectProvinsi";
import { useCreatePost, useUpdatePost } from "@/hooks/schoolHook";
import { useGlobalState } from "@/store/globalStore";
import { Schools } from "@prisma/client";
import { Button, Label, Select, TextInput, Toast } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  id: z.number().nullable(),
  name: z.string().min(3, "Character minimum 3").nullable(),
  location: z.string().min(3, "Character minimum 3").nullable(),
  studentTotal: z.number().nullable(),
  teacherTotal: z.number().nullable(),
  status: z.string().min(3, "Character minimum 3").nullable(),
  email: z.string().min(3, "Character minimum 3").nullable(),
  telp: z.string().min(3, "Character minimum 3").nullable(),
  posCode: z.string().min(3, "Character minimum 3").nullable(),
  province: z.number().nullable(),
  city: z.number().nullable(),
  district: z.number().nullable(),
  village: z.number().nullable(),
  nspn: z.string().min(3, "Character minimum 3").nullable(),
  refCode: z.string().min(3, "Character minimum 3").nullable(),
});

export type NewForm = z.infer<typeof formSchema>;

interface Props {
  data?: Schools;
}

const FormSekolah = (props: Props) => {
  let initialState: NewForm = {
    id: props.data ? props.data.id : null,
    name: props.data ? props.data.name : "",
    location: props.data ? props.data.location : "",
    studentTotal: props.data ? props.data.studentTotal : 0,
    teacherTotal: props.data ? props.data.teacherTotal : 0,
    status: props.data ? props.data.status : "",
    email: props.data ? props.data.email : "",
    telp: props.data ? props.data.telp : "",
    posCode: props.data ? props.data.posCode : "",
    province: props.data ? props.data.province : 0,
    city: props.data ? props.data.city : 0,
    district: props.data ? props.data.district : 0,
    village: props.data ? props.data.village : 0,
    nspn: props.data ? props.data.nspn : "",
    refCode: props.data ? props.data.refCode : "",
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
      setGlobal("showFormSekolah", false);
    } else {
      setGlobalArray("showFormEditSekolah", newData.id, false);
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
            setGlobal("showFormSekolah", false);
          } else {
            setGlobalArray("showFormEditSekolah", newData.id, false);
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
      newData.status == "" ||
      newData.status == null ||
      newData.telp == "" ||
      newData.telp == null ||
      newData.refCode == "" ||
      newData.refCode == null
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
                  value="Total Siswa Aktif"
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
                  htmlFor="teacherTotal"
                  className="form-label"
                  value="Total Pengajar / Staf"
                />
              </div>
              <TextInput
                id="teacherTotal"
                type="text"
                name="teacherTotal"
                value={String(newData.teacherTotal)}
                color={
                  getError("teacherTotal") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("teacherTotal") != null ? (
                    <>{getError("teacherTotal")}</>
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
                  htmlFor="status"
                  className="form-label"
                  value="Status Sekolah"
                />
              </div>
              <Select
                id="status"
                name="status"
                value={String(newData.status)}
                onChange={handleInputChange}
                color={
                  getError("status") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("status") != null ? <>{getError("status")}</> : null
                }
              >
                <option value="">Pilih</option>
                <option value="Sekolah Negeri">Sekolah Negeri</option>
                <option value="Sekolah Swasta">Sekolah Swasta</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email"
                  className="form-label"
                  value="Email"
                />
              </div>
              <TextInput
                id="email"
                type="text"
                name="email"
                value={String(newData.email)}
                color={
                  getError("email") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("email") != null ? <>{getError("email")}</> : null
                }
                placeholder="total daya tampung kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="telp" className="form-label" value="Telp" />
              </div>
              <TextInput
                id="telp"
                type="text"
                name="telp"
                value={String(newData.telp)}
                color={
                  getError("telp") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("telp") != null ? <>{getError("telp")}</> : null
                }
                placeholder="total daya tampung kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="posCode"
                  className="form-label"
                  value="Kode Pos"
                />
              </div>
              <TextInput
                id="posCode"
                type="text"
                name="posCode"
                value={String(newData.posCode)}
                color={
                  getError("posCode") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("posCode") != null ? (
                    <>{getError("posCode")}</>
                  ) : null
                }
                placeholder="total daya tampung kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <SelectProvinsi />
            <SelectKota />
            <SelectKecamatan />
            <SelectKelurahan />
            <div>
              <div className="mb-2 block">
                <Label htmlFor="nspn" className="form-label" value="NSPN" />
              </div>
              <TextInput
                id="nspn"
                type="text"
                name="nspn"
                value={String(newData.nspn)}
                color={
                  getError("nspn") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("nspn") != null ? <>{getError("nspn")}</> : null
                }
                placeholder="total daya tampung kelas..."
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="refCode"
                  className="form-label"
                  value="Kode Referensi"
                />
              </div>
              <TextInput
                id="refCode"
                type="text"
                name="refCode"
                value={String(newData.refCode)}
                color={
                  getError("refCode") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("refCode") != null ? (
                    <>{getError("refCode")}</>
                  ) : null
                }
                placeholder="total daya tampung kelas..."
                required
                onChange={handleInputChange}
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
};

export default FormSekolah;
