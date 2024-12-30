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
import { useCategoryList } from "@/utils/apis/getCategory";
import { useDealerList } from "@/utils/apis/getDealer";
import { useCompanyList } from "@/utils/apis/getCompany";
import { Category } from "@/types/category";
import { Company } from "@/types/company";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";

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

export function AddProductForm({ refetchData }: any) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const { data: categoryData, isFetched: categoryFetched } = useCategoryList(
    100,
    1
  );

  const { data: dealerData, isFetched: dealerFetched } = useDealerList(100, 1);

  const { data: companyData, isFetched: companyFetched } = useCompanyList(
    100,
    1
  );

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
        name: data.product_name,
        bnName: data.product_name_bangla,
        category: data.category,
        company: data.company,
        dealer: data.dealer,
        packageType: data.box_type,
        quantityPerPackage: Number(data.piece),
        stock: Number(data.stock),
        price: Number(data.rate),
        dealerCommission: Number(data.h_profit),
        ourCommission: Number(data.profit_margin),
        status: "Active",
      }) as string
    );

    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);
      await axiosInstance.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        variant: "default",
        title: "Product added successfully!",
        description: "You have added a new Product.",
      });
      setLoading(false);
      refetchData();
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
                              {categoryFetched &&
                                categoryData?.data?.result?.map(
                                  (category: Category) => (
                                    <SelectItem
                                      key={category._id}
                                      value={category._id}
                                    >
                                      {category.name}
                                    </SelectItem>
                                  )
                                )}
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
                              <SelectItem value="বক্স">বক্স</SelectItem>
                              <SelectItem value="কার্টুন">কার্টুন</SelectItem>
                              <SelectItem value="ডজন">ডজন</SelectItem>
                              <SelectItem value="পিস/পিচ">পিস/পিচ</SelectItem>
                              <SelectItem value="কেস">কেস</SelectItem>
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
                        <FormLabel>Dealer</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Dealer" />
                            </SelectTrigger>
                            <SelectContent>
                              {dealerFetched &&
                                dealerData?.data?.result?.map((dealer: any) => (
                                  <SelectItem
                                    key={dealer?._id}
                                    value={dealer?._id}
                                  >
                                    {dealer?.dealer.name}
                                  </SelectItem>
                                ))}
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
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Company" />
                            </SelectTrigger>
                            <SelectContent>
                              {companyFetched &&
                                companyData?.data?.result?.map(
                                  (company: Company) => (
                                    <SelectItem
                                      key={company._id}
                                      value={company._id}
                                    >
                                      {company.name}
                                    </SelectItem>
                                  )
                                )}
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
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
