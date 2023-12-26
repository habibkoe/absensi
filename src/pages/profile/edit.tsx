import AppLayout from "@/components/AppLayout";
import MainMenu from "@/components/MainMenu";
import { editData, getOneData } from "@/services/userService";
import { Users } from "@prisma/client";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ZodIssue, z } from "zod";

const formSchema = z.object({
  firstName: z.string().min(3, "minimum 3"),
  lastName: z.string().min(3),
  email: z.string().min(3),
  typeTeacher: z.string().min(8),
  typeOfStudy: z.string().min(8),
  categoryTeacher: z.string().min(8),
  rating: z.number(),
  username: z.string().min(3),
  roleId: z.number(),
});

export type NewForm = z.infer<typeof formSchema>;

const EditProfilePage = () => {
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

  const [newData, setNewData] = useState<NewForm>(initialState);

  const { data: session } = useSession();

  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const getData = async () => {
    let user = await getOneData(Number(session?.user?.id));

    setNewData({
      firstName: user.data.firstName,
      lastName: user.data.lastName,
      email: user.data.email,
      typeTeacher: user.data.typeTeacher,
      typeOfStudy: user.data.typeOfStudy,
      categoryTeacher: user.data.categoryTeacher,
      rating: user.data.rating,
      username: user.data.firstName,
      roleId: user.data.roleId,
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let checkValidate = validate();

    let store = null;

    if (checkValidate) {
      store = await editData(
        Number(session?.user?.id),
        JSON.stringify(newData)
      );

      if (store.data) {
        setNewData(initialState);
      } else {
        console.error("Failed to post data");
      }
    }
  };

  const getError = (path: any) => {
    const error = errors.find((error) => error.path[0] === path);
    return error ? error?.message : null;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>Edit Profile</title>
      </Head>

      <Card className="w-3/6 p-3 bg-white mx-auto">
        <div className="w-full">
          <div className="flex justify-between">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Edit Profile
            </h5>
            <MainMenu />
          </div>
        </div>
        <div className="w-full">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Basic */}
            <Card>
              <div className="w-full text-gray-900 font-bold">Basic</div>
              <div className="grid grid-cols-2 gap-4 w-full">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="firstName" value="Nama Awal" />
                  </div>
                  <TextInput
                    id="firstName"
                    type="text"
                    required
                    name="firstName"
                    placeholder="Your first name here..."
                    value={newData.firstName}
                    onChange={handleInputChange}
                    color={getError("firstName") != null ? "failure" : "gray"}
                    helperText={
                      getError("firstName") != null ? (
                        <>{getError("firstName")}</>
                      ) : null
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="lastName" value="Nama Akhir" />
                  </div>
                  <TextInput
                    id="lastName"
                    type="text"
                    required
                    name="lastName"
                    placeholder="Your last name here..."
                    value={newData.lastName}
                    onChange={handleInputChange}
                    color={getError("lastName") != null ? "failure" : "gray"}
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
            <Card>
              <div className="w-full text-gray-900 font-bold">Akun</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                  </div>
                  <TextInput
                    id="email"
                    type="text"
                    readOnly={true}
                    name="email"
                    placeholder="Your email here..."
                    value={newData.email}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Username" />
                  </div>
                  <TextInput
                    id="username"
                    type="text"
                    readOnly={true}
                    name="username"
                    placeholder="Your first name here..."
                    value={newData.username}
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="roleId" value="Role" />
                  </div>
                  <TextInput
                    id="roleId"
                    type="text"
                    required
                    name="roleId"
                    placeholder="Your first name here..."
                    value={newData.roleId}
                  />
                </div>
              </div>
            </Card>

            {/* Study */}
            <Card>
              <div className="w-full text-gray-900 font-bold">Profesi</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="typeTeacher" value="Tipe Guru" />
                  </div>
                  <TextInput
                    id="typeTeacher"
                    type="text"
                    required
                    name="typeTeacher"
                    placeholder="Your first name here..."
                    value={newData.typeTeacher}
                    onChange={handleInputChange}
                    color={getError("typeTeacher") != null ? "failure" : "gray"}
                    helperText={
                      getError("typeTeacher") != null ? (
                        <>{getError("typeTeacher")}</>
                      ) : null
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="typeOfStudy" value="Tipe pelajaran" />
                  </div>
                  <TextInput
                    id="typeOfStudy"
                    type="text"
                    required
                    name="typeOfStudy"
                    placeholder="Your tipe pelajaran here..."
                    value={newData.typeOfStudy}
                    onChange={handleInputChange}
                    color={getError("typeOfStudy") != null ? "failure" : "gray"}
                    helperText={
                      getError("typeOfStudy") != null ? (
                        <>{getError("typeOfStudy")}</>
                      ) : null
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="categoryTeacher" value="Kategori guru" />
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
                      getError("categoryTeacher") != null ? "failure" : "gray"
                    }
                    helperText={
                      getError("categoryTeacher") != null ? (
                        <>{getError("categoryTeacher")}</>
                      ) : null
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="rating" value="Rating" />
                  </div>
                  <TextInput
                    id="rating"
                    type="text"
                    readOnly={true}
                    name="rating"
                    placeholder="Your first name here..."
                    value={newData.rating}
                  />
                </div>
              </div>
            </Card>
            <Button outline gradientDuoTone="purpleToPink" size="sm">
              Update
            </Button>
          </form>
        </div>
      </Card>
    </>
  );
};

EditProfilePage.getLayout = function getLayout(content: any) {
  return <AppLayout>{content}</AppLayout>;
};

export default EditProfilePage;
