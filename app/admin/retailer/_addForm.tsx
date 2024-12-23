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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";

const FormSchema = z.object({
  retailer_phone: z.string().min(2, {
    message: "Please provide a valid phone number",
  }),
  shop_image: z.instanceof(File, { message: "Profile picture is required" }),
  retailer_image: z.instanceof(File, {
    message: "Profile picture is required",
  }),
  retailer_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  shop_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  upazila: z.string().min(2, {
    message: "Please select upazila",
  }),
  union: z.string().min(2, {
    message: "Please select union",
  }),
  bazar: z.string().min(2, {
    message: "Please select bazar",
  }),
  area: z.string().min(2, {
    message: "Please provide an area name",
  }),
});

export function AddRetailerForm() {
  const [shopImagePreview, setShopImagePreview] = useState<string | null>(null);
  const [retailerImagePreview, setRetailerImagePreview] = useState<
    string | null
  >(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      retailer_phone: "",
      shop_image: undefined,
      retailer_image: undefined,
      retailer_name: "",
      shop_name: "",
      upazila: "",
      union: "",
      bazar: "",
      area: "",
    },
  });

  function onSubmit(data: any) {
    // convert json to formData
    const formData = new FormData();

    // Append all form fields to formData
    Object.keys(data).forEach((key) => {
      if (key === "image" && data[key] instanceof File) {
        formData.append(key, data[key] as File);
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key] as string);
      }
    });

    console.log(data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    form.reset();
    setShopImagePreview(null);
    setRetailerImagePreview(null);
    setSuccess(true);
  }

  const handleShopImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("shop_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRetailerImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("retailer_image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setRetailerImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const restForm = () => {
    form.reset();
    setShopImagePreview(null);
    setRetailerImagePreview(null);
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
          <p className="text-[#8A94A6] text-[14px]">
            Retailer successfully created.
          </p>
          <br />
          <Button onClick={() => restForm()}>Add New Retailer</Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full flex items-center gap-3">
              <div className="w-full max-w-sm items-center flex-1">
                <FormField
                  control={form.control}
                  name="retailer_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Retailer Number</FormLabel>
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
              <div className="flex-1"></div>
            </div>

            <div>
              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="shop_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleShopImageChange}
                            ref={field.ref}
                          />
                        </FormControl>
                        {shopImagePreview && (
                          <Image
                            src={shopImagePreview}
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
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="retailer_image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Retailer Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleRetailerImageChange}
                            ref={field.ref}
                          />
                        </FormControl>
                        {retailerImagePreview && (
                          <Image
                            src={retailerImagePreview}
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
              </div>
              <br />
              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="retailer_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Retailer Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Rasel Hossain"
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
                    name="shop_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shop Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Rasel Store"
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
                    name="upazila"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Upazila</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Upazila Name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Upazila">Upazila</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="union"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Union</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Union Name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Union">Union</SelectItem>
                            </SelectContent>
                          </Select>
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
                    name="bazar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Bazar</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Bazar Name" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Bazar">Bazar</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Area name"
                            {...field}
                          />
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
              <Button type="submit">Add Retailer</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
