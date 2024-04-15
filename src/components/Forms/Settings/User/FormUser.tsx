import CardForm from "@/components/Attribute/CardForm";
import ToastSave from "@/components/Attribute/ToastSave";
import { useCreatePost, useUpdatePost } from "@/hooks/userHook";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import React, { useState } from "react";
import { Users } from "@prisma/client";
import { useGlobalState } from "@/store/globalStore";
import SelectJabatan from "@/components/DataComponents/SelectJabatan";
import BottomInfo from "@/components/Attribute/BottomInfo";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  id: z.number().nullable(),
  firstName: z.string().min(3, "Character minimum 3"),
  lastName: z.string(),
  email: z.string().min(3, "Character minimum 3"),
  username: z.string().min(3, "Character minimum 3"),
  password: z.string().min(3, "Character minimum 3"),
  typeTeacher: z.string().min(3, "Character minimum 3"),
  typeOfStudy: z.string().min(3, "Character minimum 3"),
  categoryTeacher: z.string().min(3, "Character minimum 3"),
  rating: z.number(),
  roleId: z.number().nullable(),
  schoolId: z.number().nullable(),
});

export type NewForm = z.infer<typeof formSchema>;

interface Props {
  data?: Users;
}

const FormUser = (props: Props) => {
  let initialState: NewForm = {
    id: props.data ? props.data.id : null,
    firstName: props.data ? props.data.firstName : "",
    lastName: props.data ? props.data.lastName : "",
    email: props.data ? props.data.email : "",
    username: props.data ? props.data.username : "",
    password: props.data ? props.data.password : "",
    typeTeacher: props.data ? props.data.typeTeacher : "",
    typeOfStudy: props.data ? props.data.typeOfStudy : "",
    categoryTeacher: props.data ? props.data.categoryTeacher : "",
    rating: props.data ? props.data.rating : 0,
    roleId: props.data ? props.data.roleId : null,
    schoolId: props.data ? props.data.roleId : null,
  };

  const [newData, setNewData] = useState<NewForm>(initialState);
  const setGlobal = useGlobalState((state) => state.setGlobal);
  const setGlobalArray = useGlobalState((state) => state.setGlobalArray);

  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

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

  return (
    <>
      <div className="card-form">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <CardForm>
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
                value={newData.firstName}
                color={
                  getError("firstName") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("firstName") != null ? (
                    <>{getError("firstName")}</>
                  ) : null
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="lastName"
                  className="form-label"
                  value="Nama Akhir"
                />
              </div>
              <TextInput
                id="lastName"
                name="lastName"
                type="text"
                placeholder="nama akhir..."
                required
                value={newData.lastName}
                color={
                  getError("lastName") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("lastName") != null ? (
                    <>{getError("lastName")}</>
                  ) : null
                }
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
                name="email"
                type="email"
                placeholder="email..."
                required
                value={newData.email}
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
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="username"
                  className="form-label"
                  value="Username"
                />
              </div>
              <TextInput
                id="username"
                name="username"
                type="text"
                placeholder="nama akhir..."
                required
                value={newData.username}
                color={
                  getError("username") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("username") != null ? (
                    <>{getError("username")}</>
                  ) : null
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="password"
                  className="form-label"
                  value="Password"
                />
              </div>
              <TextInput
                id="password"
                name="password"
                type="text"
                placeholder="nama akhir..."
                required
                value={newData.password}
                color={
                  getError("password") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("password") != null ? (
                    <>{getError("password")}</>
                  ) : null
                }
                onChange={handleInputChange}
              />
            </div>
            <div>
              <SelectJabatan
                color={saveLoading ? "graySave" : "gray"}
                errors={getError("typeTeacher")}
                value={newData.typeTeacher}
                handleChange={handleInputChange}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="typeOfStudy"
                  className="form-label"
                  value="Jurusan"
                />
              </div>
              <TextInput
                id="typeOfStudy"
                type="text"
                required
                name="typeOfStudy"
                placeholder="Your tipe pelajaran here..."
                value={newData.typeOfStudy}
                onChange={handleInputChange}
                color={
                  getError("typeOfStudy") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("typeOfStudy") != null ? (
                    <>{getError("typeOfStudy")}</>
                  ) : (
                    <BottomInfo>example : penjas, ipa, matematika</BottomInfo>
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="categoryTeacher"
                  className="form-label"
                  value="Mapel yang diajarkan"
                />
              </div>
              <TextInput
                id="categoryTeacher"
                type="text"
                required
                name="categoryTeacher"
                placeholder="Your first name here..."
                value={newData.categoryTeacher}
                onChange={handleInputChange}
                color={
                  getError("categoryTeacher") != null
                    ? "failure"
                    : saveLoading
                    ? "graySave"
                    : "gray"
                }
                helperText={
                  getError("categoryTeacher") != null ? (
                    <>{getError("categoryTeacher")}</>
                  ) : (
                    <BottomInfo>example : ipa, matematika, dll</BottomInfo>
                  )
                }
              />
            </div>
          </CardForm>
          <div className="form-footer">
            <Button color="dark" onClick={closeForm}>
              Cancel
            </Button>
            {!validate() ? (
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

export default FormUser;
