"use client";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  image: z.instanceof(File, { message: "Profile picture is required" }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  nid: z.string().optional(),
  phone: z.string().min(2, {
    message: "Please provide a valid phone number",
  }),
  role: z.string().min(2, {
    message: "Please select role",
  }),
});

export function AddUserForm({ refetch }: any) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: undefined,
      name: "",
      phone: "",
      nid: "",
      role: "dealer",
    },
  });

  async function onSubmit(data: any) {
    // convert json to formData
    const formData = new FormData();

    // Append all form fields to formData
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] instanceof File) {
        formData.append("file", data[key] as File);
      }
    });

    formData.append(
      "data",
      JSON.stringify({
        name: data.name,
        phone: data.phone,
        nid: data.nid,
        role: data.role,
      }) as string
    );

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      await axiosInstance.post("/users", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        variant: "default",
        title: "User added successfully!",
        description: "You have added a new User.",
      });
      setLoading(false);
      refetch();
      setSuccess(true);
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
    setImagePreview(null);
    setSuccess(true);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const restForm = () => {
    form.reset();
    setImagePreview(null);
    setSuccess(false);
  };

  return (
    <>
      {success ? (
        <div className="p-[100px] flex flex-col justify-center items-center">
          <Image
            src="/images/congratulations.svg"
            alt="Congratulations"
            height={137}
            width={151}
          />
          <br />
          <p className="font-bold text-[18px] text-[#2568EF]">
            Congratulations
          </p>
          <p className="text-[#8A94A6] text-[14px]">User successfully added.</p>
          <br />
          <Button onClick={() => restForm()}>Add New User</Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full flex items-center gap-3">
              <div className="w-full max-w-sm items-center flex-1">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Picture</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={field.ref}
                        />
                      </FormControl>
                      {imagePreview && (
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="mt-2 w-32 h-32 object-cover"
                          height={32}
                          width={32}
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1"></div>
            </div>

            <div>
              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Muhammad Rasel" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
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
              </div>
              <br />

              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="nid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NID NO</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="535-685-3335"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Role</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Role</SelectLabel>
                                <SelectItem value="sr">Sr</SelectItem>
                                <SelectItem value="dealer">Dealer</SelectItem>
                                <SelectItem value="pickupMan">
                                  Pickup Man
                                </SelectItem>
                                <SelectItem value="packingMan">
                                  Packing Man
                                </SelectItem>
                                <SelectItem value="checkoutMan">
                                  Checkout Man
                                </SelectItem>
                                <SelectItem value="deliveryMan">
                                  Delivery Man
                                </SelectItem>
                                <SelectItem value="freelancer">
                                  Freelancer
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant={"outlinered"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="animate-spin" />}
                Submit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
