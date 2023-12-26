import { Inter } from "next/font/google";
import Head from "next/head";
import { Button, Card, Label, TextInput } from "flowbite-react";
import GuestLayout from "@/components/GuestLayout";
import { ZodIssue, z } from "zod";
import { useState } from "react";
import { postData } from "@/services/userService";
import { useRouter } from "next/router";

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
        <title>Absensi : Register</title>
      </Head>
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="w-80 p-3 bg-white">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Register
          </h5>
          <div className="w-full">
            <form onSubmit={register} className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={newData.email}
                  placeholder="name@flowbite.com"
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
                  <Label htmlFor="username" value="Username" />
                </div>
                <TextInput
                  id="username"
                  type="text"
                  name="username"
                  placeholder="your username here..."
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
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  required
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
                  <Label htmlFor="confirmPassword" value="Confirm password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  required
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
              <Button type="submit">Register</Button>
            </form>
          </div>
        </Card>
      </div>
    </>
  );
};

RegisterPage.getLayout = function getLayout(content: any) {
  return <GuestLayout>{content}</GuestLayout>;
};

export default RegisterPage;
