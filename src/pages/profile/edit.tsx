import AppLayout from "@/components/AppLayout";
import BottomInfo from "@/components/Attribute/BottomInfo";
import ToastSave from "@/components/Attribute/ToastSave";
import SelectJabatan from "@/components/DataComponents/SelectJabatan";
import { usePostById, useUpdatePost } from "@/hooks/userHook";
import { siteConfig } from "@/libs/config";
import {
  Button,
  Card,
  Label,
  TextInput,
  Toast,
} from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(3, "Character minimum 3"),
  lastName: z.string(),
  email: z.string().min(3, "Character minimum 3"),
  typeTeacher: z.string().min(3, "Character minimum 3"),
  typeOfStudy: z.string().min(3, "Character minimum 3"),
  categoryTeacher: z.string().min(3, "Character minimum 3"),
  rating: z.number(),
  username: z.string().min(3, "Character minimum 3"),
  roleId: z.number().nullable(),
});

export type NewForm = z.infer<typeof formSchema>;

const EditProfilePage = () => {
  const router = useRouter();

  let initialState: NewForm = {
    firstName: "",
    lastName: "",
    email: "",
    typeTeacher: "",
    typeOfStudy: "",
    categoryTeacher: "",
    rating: 0,
    username: "",
    roleId: 0,
  };

  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState<any>({
    type: 0,
    message: "",
  });

  const [newData, setNewData] = useState<NewForm>(initialState);

  const { data: session } = useSession();

  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const {
    isPending: isDataLoading,
    error: isDataError,
    data: dataUser,
  } = usePostById(Number(session?.user?.id));

  useEffect(() => {
    setNewData({
      firstName: dataUser !== undefined ? dataUser.firstName : "",
      lastName: dataUser !== undefined ? dataUser.lastName : "",
      email: dataUser !== undefined ? dataUser.email : "",
      typeTeacher: dataUser !== undefined ? dataUser.typeTeacher : "",
      typeOfStudy: dataUser !== undefined ? dataUser.typeOfStudy : "",
      categoryTeacher: dataUser !== undefined ? dataUser.categoryTeacher : "",
      rating: dataUser !== undefined ? dataUser.rating : 0,
      username: dataUser !== undefined ? dataUser.username : "",
      roleId: dataUser !== undefined ? dataUser.roleId : 0,
    });
  }, [dataUser, isDataLoading]);

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

  const closeToast = () => {
    setShowToastMessage({
      type: 0,
      message: "",
    });
  };

  const {
    mutate: editMudate,
    isPending: isUpdateLoading,
    isError: isUpdateError,
  } = useUpdatePost();

  const [saveLoading, setSaveLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaveLoading(true);
      let checkValidate = validate();

      let store = null;

      if (checkValidate) {
        store = editMudate(
          { id: Number(session?.user?.id), data: newData },
          {
            onSuccess: (response) => {
              return response.data.body;
            },
          }
        );

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
      }

      setSaveLoading(false);
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
      <Head>
        <title>{`${siteConfig.title} : Edit Profile`}</title>
      </Head>

      <div className="w-full">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {/* Basic */}
          <Card className="bg-[#3A3B3C] border-[#3A3B3C]">
            <div className="w-full text-gray-300 font-bold">Basic</div>
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-300"
                    value="Nama Awal"
                  />
                </div>
                <TextInput
                  id="firstName"
                  type="text"
                  required
                  className="!bg-[#3A3B3C]"
                  name="firstName"
                  placeholder="Your first name here..."
                  value={newData.firstName}
                  onChange={handleInputChange}
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
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="lastName"
                    className="text-gray-300"
                    value="Nama Akhir"
                  />
                </div>
                <TextInput
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Your last name here..."
                  value={newData.lastName}
                  onChange={handleInputChange}
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
                />
              </div>
            </div>
          </Card>

          {/* Account */}
          <Card className="bg-[#3A3B3C] border-[#3A3B3C]">
            <div className="w-full text-gray-300 font-bold">Akun</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="email"
                    className="text-gray-300"
                    value="Email"
                  />
                </div>
                <TextInput
                  id="email"
                  type="text"
                  readOnly={true}
                  name="email"
                  placeholder="Your email here..."
                  defaultValue={newData.email}
                  color={saveLoading ? "graySave" : "gray"}
                  helperText={
                    <BottomInfo>Data ini tidak bisa dirubah manual.</BottomInfo>
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="username"
                    className="text-gray-300"
                    value="Username"
                  />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  readOnly={true}
                  name="username"
                  placeholder="Your first name here..."
                  defaultValue={newData.username}
                  color={saveLoading ? "graySave" : "gray"}
                  helperText={
                    <BottomInfo>Data ini tidak bisa dirubah manual.</BottomInfo>
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="roleId"
                    className="text-gray-300"
                    value="Role"
                  />
                </div>
                <TextInput
                  id="roleId"
                  type="number"
                  readOnly={true}
                  name="roleId"
                  placeholder="Your role id here..."
                  value={String(newData.roleId)}
                  onChange={handleInputChange}
                  color={saveLoading ? "graySave" : "gray"}
                  helperText={
                    <BottomInfo>Data ini tidak bisa dirubah manual.</BottomInfo>
                  }
                />
              </div>
            </div>
          </Card>

          {/* Study */}
          <Card className="bg-[#3A3B3C] border-[#3A3B3C]">
            <div className="w-full text-gray-300 font-bold">Profesi</div>
            <div className="grid md:grid-cols-2 gap-4">
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
                    className="text-gray-300"
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
                    className="text-gray-300"
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
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="rating"
                    className="text-gray-300"
                    value="Rating"
                  />
                </div>
                <TextInput
                  id="rating"
                  type="text"
                  readOnly={true}
                  name="rating"
                  placeholder="Your first name here..."
                  value={newData.rating}
                  color={saveLoading ? "graySave" : "gray"}
                  helperText={
                    <BottomInfo>Data ini tidak bisa dirubah manual.</BottomInfo>
                  }
                />
              </div>
            </div>
          </Card>
          <Button
            type="submit"
            gradientDuoTone="pinkToOrange"
            size="sm"
            disabled={saveLoading}
          >
            Update
          </Button>
        </form>
      </div>
      {showToastMessage.type > 0 ? (
        <Toast className="mb-10 fixed bottom-2 right-10">
          <ToastSave
            type={showToastMessage.type}
            message={showToastMessage.message}
          />
          <Toast.Toggle onDismiss={() => closeToast()} />
        </Toast>
      ) : null}
    </>
  );
};

EditProfilePage.getLayout = function getLayout(content: any) {
  return <AppLayout headMenu="Edit Profile">{content}</AppLayout>;
};

export default EditProfilePage;
