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

const FormSchema = z.object({
  image: z.instanceof(File, { message: "Profile picture is required" }),
  product_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  product_name_bangla: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Please provide a category",
  }),
  piece: z.string().min(2, {
    message: "Please provide peices",
  }),
  box_type: z.string().min(2, {
    message: "Please provide a box type",
  }),
  rate: z.string().min(2, {
    message: "Please provide rate.",
  }),
  stock: z.string().min(2, {
    message: "Please provide stock.",
  }),
  profit_margin: z.string().min(2, {
    message: "Please provide profit margin.",
  }),
  dealer: z.string().min(2, {
    message: "Please provide dealer.",
  }),
  company: z.string().min(2, {
    message: "Please provide company.",
  }),
  h_profit: z.string().min(2, {
    message: "Please H profit.",
  }),
});

export function EditProductForm() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: undefined,
      product_name: "",
      product_name_bangla: "",
      category: "",
      piece: "",
      box_type: "",
      rate: "",
      stock: "",
      profit_margin: "",
      dealer: "",
      company: "",
      h_profit: "",
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
          <p className="text-[#8A94A6] text-[14px]">
            Product successfully created.
          </p>
          <br />
          <Button onClick={() => restForm()}>Add New Product</Button>
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
                      <FormLabel>Product Picture</FormLabel>
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
                    name="product_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
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
                    name="product_name_bangla"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name Bangla</FormLabel>
                        <FormControl>
                          <Input placeholder="Muhammad Rasel" {...field} />
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Product Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>
                                  Select Product Category
                                </SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">
                                  Blueberry
                                </SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">
                                  Pineapple
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
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="piece"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Piece(per box)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="60" {...field} />
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
                    name="box_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Box Type</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Box Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="apple">Apple</SelectItem>
                              <SelectItem value="banana">Banana</SelectItem>
                              <SelectItem value="blueberry">
                                Blueberry
                              </SelectItem>
                              <SelectItem value="grapes">Grapes</SelectItem>
                              <SelectItem value="pineapple">
                                Pineapple
                              </SelectItem>
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
                    name="rate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Buying Rate</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="180" {...field} />
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
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="180" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="profit_margin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profit Margin %</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="180" {...field} />
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
                    name="dealer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Dealer</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Select Dealer"
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
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Company</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Select Company"
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
                    name="h_profit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>H profit Margin %</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="6" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div></div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant={"outlinered"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
