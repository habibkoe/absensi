import { Inter } from "next/font/google";
import Head from "next/head";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import GuestLayout from "@/components/GuestLayout";
import { z } from "zod";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export interface NewForm {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = z
  .object({
    email: z.string().email(),
    username: z.string().min(3, "minimum 3"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmpassword"],
  });

const RegisterPage = () => {
  let initialState: NewForm = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };

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

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedForm = registerSchema.parse(newData);
      
    console.log("masuk nggak ni inside ", validatedForm);
      
    } catch (error) {
      console.log(error);
    }
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
