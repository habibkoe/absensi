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
import { HiX } from "react-icons/hi";
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
        <title>Absensi : Login</title>
      </Head>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        {showToast ? (
          <Toast className="mb-10">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              Wrong username or password
            </div>
            <Toast.Toggle onDismiss={() => setShowToast(false)} />
          </Toast>
        ) : null}
        <Card className="w-80 p-3 bg-white">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Login
          </h5>
          <div className="w-full">
            <form onSubmit={login} className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Your username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  placeholder="your username here..."
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
                  <Label htmlFor="password1" value="Your password here..." />
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  required
                  name="password"
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
              <Button type="submit">Submit</Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

HomePage.getLayout = function getLayout(content: any) {
  return <GuestLayout>{content}</GuestLayout>;
};

export default HomePage;
