import { Inter } from "next/font/google";
import Head from "next/head";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import GuestLayout from "@/components/GuestLayout";

const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Absensi : Login</title>
      </Head>
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="w-80 p-3 bg-white">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Login
          </h5>
          <div className="w-full">
            <form className="flex max-w-md flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput id="password1" type="password" required />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
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
