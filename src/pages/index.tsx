import { Inter } from "next/font/google";
import Head from "next/head";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Toast,
} from "flowbite-react";
import GuestLayout from "@/components/GuestLayout";
import { ZodIssue, z } from "zod";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { HiOutlineLockClosed, HiOutlineUser, HiX } from "react-icons/hi";
import Link from "next/link";
import { siteConfig } from "@/libs/config";

const loginSchema = z.object({
  username: z.string().min(3, "minimum 3"),
  password: z.string().min(8),
});

export type NewForm = z.infer<typeof loginSchema>;

const HomePage = () => {
  const router = useRouter();
  let initialState: NewForm = {
    password: "",
    username: "",
  };

  const [errors, setErrors] = useState<ZodIssue[]>([]);

  const [newData, setNewData] = useState<NewForm>(initialState);

  const [showToast, setShowToast] = useState(false);

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
    const formData = loginSchema.safeParse(newData);

    if (!formData.success) {
      const { issues } = formData.error;
      setErrors(issues);
      return false;
    } else {
      setErrors([]);
      return true;
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    let checkValidate = validate();

    let store = null;

    console.log("Ini apa ", checkValidate);

    if (checkValidate) {
      store = await signIn("credentials", {
        username: newData.username,
        password: newData.password,
        redirect: false,
      });

      if (store?.error) {
        setShowToast(true);
      } else {
        router.push("/dashboard");
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
        <title>{`${siteConfig.title} : Masuk`}</title>
      </Head>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="md:mx-auto md:w-96 w-full px-8">
          <h5 className="text-2xl font-bold tracking-tight text-white dark:text-white mb-2">
            Masuk ke akun anda
          </h5>
          <span className="text-gray-400">
            Selamat datang! Isi data diri anda.
          </span>
          <div className="w-full mt-4">
            <form onSubmit={login} className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label
                    className="text-white"
                    htmlFor="username"
                    value="Username"
                  />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  icon={HiOutlineUser}
                  placeholder="Usernama anda disini..."
                  required
                  name="username"
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
                    htmlFor="password1"
                    value="Password"
                    className="text-white"
                  />
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  required
                  name="password"
                  icon={HiOutlineLockClosed}
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
              <div className="w-full text-right">
                <span className="text-white text-sm">Lupa password</span>
              </div>
              <Button gradientDuoTone="pinkToOrange" type="submit">
                Masuk
              </Button>
            </form>
          </div>
        </div>
        <div className="w-full text-center bottom-0 text-xs mt-5 text-gray-400">
          {`Belum punya akun? `}
          <Link href="/register" className="text-blue-500 text-xs">
            Daftar
          </Link>
        </div>
      </div>
      {showToast ? (
        <Toast className="mb-10 fixed bottom-2 right-10">
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
            <HiX className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">
            Salah username atau password
          </div>
          <Toast.Toggle onDismiss={() => setShowToast(false)} />
        </Toast>
      ) : null}
    </>
  );
};

HomePage.getLayout = function getLayout(content: any) {
  return <GuestLayout>{content}</GuestLayout>;
};

export default HomePage;
