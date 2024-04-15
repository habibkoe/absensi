import { Inter } from "next/font/google";
import Head from "next/head";
import { Button, Label, TextInput, Toast } from "flowbite-react";
import GuestLayout from "@/components/GuestLayout";
import { ZodIssue, z } from "zod";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  HiMail,
  HiOutlineLockClosed,
  HiOutlineUser,
} from "react-icons/hi";
import Link from "next/link";
import { siteConfig } from "@/libs/config";
import { useCreatePost } from "@/hooks/userHook";
import ToastSave from "@/components/Attribute/ToastSave";

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, "minimum 3"),
    refCode: z.string().min(3, "minimum 3"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export type NewForm = z.infer<typeof registerSchema>;

const RegisterPage = () => {
  let initialState: NewForm = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    refCode: ""
  };

  const router = useRouter();

  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const [newData, setNewData] = useState<NewForm>(initialState);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const validate = () => {
    const formData = registerSchema.safeParse(newData);

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

  const {
    mutate: addMutate,
    isPending: isCreateLoading,
    isError: isCreateError,
  } = useCreatePost();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaveLoading(true);
      let checkValidate = validate();

      let store = null;

      if (checkValidate) {
        store = addMutate(newData, {
          onSuccess: (response) => {
            return response.data.body;
          },
        });

        if (store !== null) {
          router.push("/");
        } else {
          setShowToastMessage({
            type: 2,
            message: "Gagal simpan data",
          });
          console.error("Failed to register user");
        }
      } else {
        console.log("Cannot save");
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
        <title>{`${siteConfig.title} : Daftar`}</title>
      </Head>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="md:mx-auto md:w-96 w-full px-8">
          <h5 className="text-2xl font-bold tracking-tight dark:text-white text-gray-900 mb-2">
            Buat akun
          </h5>
          <span className="text-gray-400">
            Selamat datang! Isi data diri anda.
          </span>
          <div className="w-full mt-4">
            <form onSubmit={register} className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" className="form-label" value="Email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  icon={HiMail}
                  value={newData.email}
                  placeholder="email@goabsensi.com"
                  required
                  onChange={handleInputChange}
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
                  type="text"
                  name="username"
                  icon={HiOutlineUser}
                  placeholder="Username anda disini..."
                  required
                  value={newData.username}
                  onChange={handleInputChange}
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
                  type="password"
                  name="password"
                  icon={HiOutlineLockClosed}
                  required
                  placeholder="Password anda disini..."
                  value={newData.password}
                  onChange={handleInputChange}
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
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="confirmPassword"
                    className="form-label"
                    value="Confirm Password"
                  />
                </div>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  icon={HiOutlineLockClosed}
                  required
                  placeholder="Confirm password anda..."
                  value={newData.confirmPassword}
                  onChange={handleInputChange}
                  color={
                    getError("confirmPassword") != null
                      ? "failure"
                      : saveLoading
                      ? "graySave"
                      : "gray"
                  }
                  helperText={
                    getError("confirmPassword") != null ? (
                      <>{getError("confirmPassword")}</>
                    ) : null
                  }
                />
              </div>
              
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="refCode"
                    className="form-label"
                    value="Referensi Kode"
                  />
                </div>
                <TextInput
                  id="refCode"
                  type="text"
                  name="refCode"
                  icon={HiOutlineUser}
                  placeholder="Referensi kode sekolah anda disini..."
                  required
                  value={newData.refCode}
                  onChange={handleInputChange}
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
                />
              </div>
              <div className="w-full text-left">
                <span className="dark:text-white text-gray-700 text-sm">
                  Hubungi admin sekolah untuk mendapatkan kode referensi
                </span>
              </div>
              <Button
                type="submit"
                gradientDuoTone="pinkToOrange"
                disabled={saveLoading}
              >
                Daftar
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full text-center bottom-0 text-xs mt-5 text-gray-400">
          {`Sudah punya akun? `}
          <Link href="/" className="text-blue-500 text-xs">
            Masuk
          </Link>
        </div>
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
};

RegisterPage.getLayout = function getLayout(content: any) {
  return <GuestLayout>{content}</GuestLayout>;
};

export default RegisterPage;
