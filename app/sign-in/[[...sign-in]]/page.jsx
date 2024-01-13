"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

export default function Page() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const result = await signIn?.create({
        identifier: username,
        password,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // router.push("/service");
        // router.push(searchParams.redirect_url);
      } else {
        console.log(result);
      }
    } catch (err) {
      // alert(err.errors[0].longMessage);
      console.error(err.errors[0].longMessage);
      toast({
        title: err.errors[0].longMessage,
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center font-[sans-serif]">
        <Card className="shadow-2xl sm:min-w-[400px]  m-2 px-3 py-3">
          <CardHeader className="my-3">
            <CardTitle className="font-semibold font-[sans-serif]">
              Sign in
            </CardTitle>
            <CardDescription>
              to continue to aasai-cashews-servcie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-2">
              <div>
                <Label htmlFor="username" className="text-sm">
                  Username
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button
                  className="min-w-full mt-2"
                  onClick={async (e) => {
                    await handleSubmit(e);
                    router.refresh();
                  }}
                >
                  Sign in
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
