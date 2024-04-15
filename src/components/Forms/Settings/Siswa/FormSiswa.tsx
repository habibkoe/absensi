import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import { useCreatePost, useUpdatePost } from "@/hooks/siswaHook";
import {
  Button,
  Datepicker,
  Label,
  Select,
  TextInput,
  Toast,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Students } from "@prisma/client";
import { useGlobalState } from "@/store/globalStore";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  id: z.number().nullable(),
  nis: z.string().min(3, "Character minimum 3"),
  firstName: z.string().min(3, "Character minimum 3"),
  lastName: z.string().nullable(),
  email: z.string(),
  gender: z.string().min(3, "Character minimum 3"),
  dateOfBirth: z.string().min(3, "Character minimum 3").nullable(),
  address: z.string().min(3, "Character minimum 3").nullable(),
  parent: z.string().min(3, "Character minimum 3").nullable(),
  rating: z.number().nullable(),
  favoriteLearn: z.string().nullable(),
  Hobby: z.string().nullable()
});

export type NewForm = z.infer<typeof formSchema>;

interface Props {
  data?: Students;
}

const FormSiswa = (props: Props) => {
  let initialState: NewForm = {
    id: props.data ? props.data.id : null,
    nis: props.data ? props.data.nis : "",
    firstName: props.data ? props.data.firstName : "",
    lastName: props.data ? props.data.lastName : "",
    email: props.data ? props.data.email : "",
    gender: props.data ? props.data.gender : "",
    dateOfBirth: props.data ? props.data.dateOfBirth : "",
    address: props.data ? props.data.address : "",
    parent: props.data ? props.data.parent : "",
    rating: props.data ? props.data.rating : 0,
    favoriteLearn: props.data ? props.data.favoriteLearn : "",
    Hobby: props.data ? props.data.Hobby : "",
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

  const datePickerHandler = (params: any) => {
    console.log("masuk sini nggak ", params);

    let newDate = format(new Date(params), "dd/MM/yyyy");

    console.log("masuk sini nggak new date ", newDate);
    setNewData({
      ...newData,
      dateOfBirth: newDate,
    });
  };

  const [saveLoading, setSaveLoading] = useState(false);

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

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
  };

  const closeForm = () => {
    console.log("close form ini ");
    if (newData.id === null) {
      setGlobal("showFormSiswa", false);
    } else {
      setGlobalArray("showFormEditSiswa", newData.id, false);
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
            setGlobal("showFormSiswa", false);
          } else {
            setGlobalArray("showFormEditSiswa", newData.id, false);
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
      newData.nis == "" ||
      newData.nis == null ||
      newData.firstName == "" ||
      newData.firstName == null ||
      newData.gender == "" ||
      newData.gender == null ||
      newData.dateOfBirth == "" ||
      newData.dateOfBirth == null
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
                <Label htmlFor="nis" className="form-label" value="NIS" />
              </div>
              <TextInput
                id="nis"
                name="nis"
                type="text"
                placeholder="Nis siswa..."
                required
                color={
                  getError("nis") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("nis") != null ? <>{getError("nis")}</> : null
                }
                value={newData.nis}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="firstName"
                  className="form-label"
                  value="Nama awal"
                />
              </div>
              <TextInput
                id="firstName"
                name="firstName"
                type="text"
                placeholder="nama awal..."
                required
                color={
                  getError("firstName") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("firstName") != null ? <>{getError("firstName")}</> : null
                }
                value={newData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="lastName"
                  className="form-label"
                  value="Nama Ahir"
                />
              </div>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                placeholder="nama ahir..."
                value={String(newData.lastName)}
                onChange={handleInputChange}
              />
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
                type="email"
                name="email"
                placeholder="email siswa..."
                value={newData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="gender"
                  className="form-label"
                  value="Gender"
                />
              </div>
              <Select
                id="gender"
                name="gender"
                required
                value={newData.gender}
                color={
                  getError("gender") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("gender") != null ? <>{getError("gender")}</> : null
                }
                onChange={handleInputChange}
              >
                <option value="">Pilih</option>
                <option value="laki - laki">Laki - Laki</option>
                <option value="perempuan">Perempuan</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="email1"
                  className="form-label"
                  value="DOB"
                />
              </div>
              <Datepicker
                name="dateOfBirth"
                language="ID"
                value={String(newData.dateOfBirth)}
                showTodayButton={false}
                showClearButton={true}
                onSelectedDateChanged={(date) => datePickerHandler(date)}
                color={newData.dateOfBirth == "" ? "failure" : "gray"}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="address"
                  className="form-label"
                  value="Alamat"
                />
              </div>
              <TextInput
                id="address"
                type="text"
                name="address"
                placeholder="Alamat siswa..."
                value={String(newData.address)}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="parent"
                  className="form-label"
                  value="Orang Tua"
                />
              </div>
              <TextInput
                id="parent"
                type="text"
                name="parent"
                placeholder="Nama orang tua siswa..."
                value={String(newData.parent)}
                color={
                  getError("parent") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("parent") != null ? <>{getError("parent")}</> : null
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="rating"
                  className="form-label"
                  value="Rating"
                />
              </div>
              <TextInput
                id="rating"
                type="text"
                name="rating"
                placeholder="Rating siswa..."
                value={Number(newData.rating)}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="favoriteLearn"
                  className="form-label"
                  value="Pelajaran Paforite"
                />
              </div>
              <TextInput
                id="favoriteLearn"
                type="text"
                name="favoriteLearn"
                placeholder="pelajaran paforit siswa..."
                value={String(newData.favoriteLearn)}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Hobby"
                  className="form-label"
                  value="Hobby"
                />
              </div>
              <TextInput
                id="Hobby"
                type="text"
                name="Hobby"
                placeholder="Hobi siswa..."
                value={String(newData.Hobby)}
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

export default FormSiswa;
