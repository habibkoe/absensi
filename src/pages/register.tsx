import { Inter } from "next/font/google";
import Head from "next/head";
import { Button, Card, Label, TextInput, Toast } from "flowbite-react";
import GuestLayout from "@/components/GuestLayout";
import { ZodIssue, z } from "zod";
import { useState } from "react";
import { postData } from "@/services/userService";
import { useRouter } from "next/router";
import {
  HiMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiX,
} from "react-icons/hi";
import Link from "next/link";
import { siteConfig } from "@/libs/config";

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, "minimum 3"),
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
  };

  const router = useRouter();

  const [errors, setErrors] = useState<ZodIssue[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [newData, setNewData] = useState<NewForm>(initialState);

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

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    let checkValidate = validate();

    let store = null;

    if (checkValidate) {
      store = await postData(JSON.stringify(newData));

      if (store.data) {
        router.push("/");
      } else {
        setShowToast(true);
        console.error("Failed to register user");
      }
    } else {
      console.log("Cannot save");
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
          <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white mb-2">
            Buat akun
          </h5>
          <span className="text-gray-400">
            Selamat datang! Isi data diri anda.
          </span>
          <div className="w-full mt-4">
            <form onSubmit={register} className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" className="text-white" value="Email" />
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
                  color={getError("email") != null ? "failure" : "gray"}
                  helperText={
                    getError("email") != null ? <>{getError("email")}</> : null
                  }
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="username"
                    className="text-white"
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
                  color={getError("username") != null ? "failure" : "gray"}
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
                    className="text-white"
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
                  color={getError("password") != null ? "failure" : "gray"}
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
                    className="text-white"
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
                    getError("confirmPassword") != null ? "failure" : "gray"
                  }
                  helperText={
                    getError("confirmPassword") != null ? (
                      <>{getError("confirmPassword")}</>
                    ) : null
                  }
                />
              </div>
              <div className="w-full text-left">
                <span className="text-white text-sm">
                  Pastikan password sesuai
                </span>
              </div>
              <Button type="submit" gradientDuoTone="pinkToOrange">
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
      {showToast ? (
        <Toast className="mb-10 fixed bottom-2 right-10">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Tidak bisa simpan data</div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      ) : null}
    </>
  );
};

RegisterPage.getLayout = function getLayout(content: any) {
  return <GuestLayout>{content}</GuestLayout>;
};

export default RegisterPage;
