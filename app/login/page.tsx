"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  phone: z.string().min(2, {
    message: "Please enter your phone number",
  }),
  password: z.string().min(2, {
    message: "Please enter your password",
  }),
});

const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/signin", data);
      console.log(response.data.data.token);

      if (response.data.data.token) {
        Cookies.set("token", response.data.data.token, { expires: 30 });
        toast({
          variant: "default",
          title: "Logged in successfully!",
          description: "You can now access your admin dashboard.",
        });
        router.push("/admin/dashboard");
        setLoading(false);
      }
    } catch (e: any) {
      setLoading(false);

      console.log(e.response.data.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: e.response.data.message,
      });
    }
    setLoading(false);
    form.reset();
  };

  return (
    <div className="w-full h-[100vh] flex items-center">
      <div className="flex flex-1 justify-center items-center">
        <Image
          src="/images/illustration.svg"
          alt="illustration"
          height={411}
          width={442}
        />
      </div>
      <div className="flex flex-col flex-1 justify-center items-start">
        <h1 className="text-[#0F172A] text-[24px] font-bold">
          SIgn In to Admin Account
        </h1>
        <p className="text-[#64748B] text-[14px]">
          Welcome Back! Please enter your details.
        </p>
        {/* login form */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[450px] space-y-4 mt-6"
          >
            <div className="">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="+880123647829"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="text-[#0472ED] text-[14px]">
                <Link href="/forgot-password">Forgot Password</Link>
              </div>
            </div>

            <div className="w-full">
              <Button disabled={loading} className="w-full" type="submit">
                {loading && <Loader2 className="animate-spin" />}
                Login
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
