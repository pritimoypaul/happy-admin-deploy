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
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAreaList } from "@/utils/apis/getArea";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { useUnionList } from "@/utils/apis/getUnion";
import { Upazila } from "@/types/upazila";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  retailer_phone: z.string().optional(),
  shop_image: z.instanceof(File).optional(),
  nid: z.string().optional(),
  retailer_image: z.instanceof(File).optional(),
  retailer_name: z.string().optional(),
  shop_name: z.string().optional(),
  upazila: z.string().optional(),
  union: z.string().optional(),
  environment: z.string().optional(),
  area: z.string().optional(),
});

export function EditRetailerForm({ editData, refetchData }: any) {
  // const [shopImagePreview, setShopImagePreview] = useState<string | null>(null);
  const [retailerImagePreview, setRetailerImagePreview] = useState<
    string | null
  >(null);

  // const [areaList, setArealist] = useState<Array<Area>>([]);

  const [selectedUpazila, setSelectedUpazila] = useState(
    editData?.union?.upazila
  );
  const [selectedUnion, setSelectedUnion] = useState(editData?.union?._id);
  const [selectedArea, setSelectedArea] = useState(editData?.area?._id);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [userLat, setUserLat] = useState(0.0);
  const [userLong, setUserLong] = useState(0.0);

  const { data: upazilaData, isFetched: upazilaFetched } = useUpazilaList();

  const {
    data: unionData,
    isFetched: unionFetched,
    refetch: unionRefetch,
  } = useUnionList(selectedUpazila);

  const {
    data: bazarData,
    isFetched: bazarFetched,
    refetch: bazarRefetch,
  } = useAreaList(100, 1, selectedUnion);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      retailer_phone: editData?.retailer?.phone,
      shop_image: undefined,
      nid: "",
      retailer_image: undefined,
      retailer_name: editData?.retailer?.name,
      shop_name: editData?.shopName,
      upazila: editData?.union?.upazila,
      union: editData?.union?._id,
      environment: editData?.environment,
      area: editData?.area?._id,
    },
  });

  // const handleShopImageChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     form.setValue("shop_image", file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setShopImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

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

  // const restForm = () => {
  //   form.reset();
  //   // setShopImagePreview(null);
  //   setRetailerImagePreview(null);
  //   setSuccess(false);
  // };

  async function onSubmit(data: any) {
    const editedData = {
      shopName: data.shop_name,
      union: data.union,
      environment: data.environment,
      area: data.area,
      location: {
        latitude: userLat,
        longitude: userLong,
      },
    };

    // convert json to formData
    const formData = new FormData();

    // Append all form fields to formData
    Object.keys(data).forEach((key) => {
      if (key === "retailer_image" && data[key] instanceof File) {
        formData.append("file", data[key] as File);
      }
    });

    try {
      setLoading(true);

      Object.keys(data).forEach((key) => {
        if (key === "retailer_image" && data[key] instanceof File) {
          axiosInstance
            .patch(`/users/${editData?.retailer?.id}/update-image`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(() => {
              refetchData();
            })
            .catch(() => {
              console.log("image not uploaded");
            });
        }
      });

      await axiosInstance.put(
        `/retailers/${editData?.retailer?.id}`,
        editedData
      );

      toast({
        variant: "default",
        title: "Retailer updated successfully!",
        description: "You have updated a Retailer.",
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
    setRetailerImagePreview(null);
  }

  const getUserLocation = async () => {
    await navigator.geolocation.getCurrentPosition(function (position) {
      setUserLat(position.coords.latitude);
      setUserLong(position.coords.longitude);
    });
  };

  useEffect(() => {
    unionRefetch();
  }, [selectedUpazila]);

  useEffect(() => {
    bazarRefetch();
  }, [selectedUnion]);

  useEffect(() => {
    getUserLocation();
  }, []);

  console.log("edit data: ", editData);

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
            Retailer successfully updated.
          </p>
          <br />
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="w-full flex items-center gap-3">
              {/* <div className="w-full max-w-sm items-center flex-1">
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
              </div> */}
              <div className="flex-1"></div>
            </div>

            <div>
              <div className="w-full flex items-start justify-around gap-3">
                {/* <div className="flex-1">
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
                  <FormField
                    control={form.control}
                    name="nid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NID</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0283974894"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div> */}
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
                        {retailerImagePreview ? (
                          <Image
                            src={retailerImagePreview}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover"
                            height={32}
                            width={32}
                          />
                        ) : editData?.retailer?.profileImg != "" ||
                          editData?.retailer?.profileImg != null ? (
                          <Image
                            src={editData?.retailer?.profileImg}
                            alt="Preview"
                            className="mt-2 w-32 h-32 object-cover"
                            height={32}
                            width={32}
                          />
                        ) : null}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <br />
              <div className="w-full flex items-start justify-around gap-3">
                {/* <div className="flex-1">
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
                </div> */}
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
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedUpazila(value);
                            }}
                            defaultValue={selectedUpazila}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Upazila Name" />
                            </SelectTrigger>
                            <SelectContent>
                              {upazilaFetched &&
                                upazilaData?.data.result.map(
                                  (upazila: Upazila) => (
                                    <SelectItem
                                      key={upazila._id}
                                      value={upazila._id}
                                    >
                                      {upazila.bnName}
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
                    name="union"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Union</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedUnion(value);
                            }}
                            defaultValue={selectedUnion}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Union Name" />
                            </SelectTrigger>
                            <SelectContent>
                              {unionFetched &&
                                unionData?.data.result.map((union: any) => (
                                  <SelectItem key={union._id} value={union._id}>
                                    {union.bnName}
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
              </div>
              <br />

              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Area</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedArea(value);
                            }}
                            defaultValue={selectedArea}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Area Name" />
                            </SelectTrigger>
                            <SelectContent>
                              {bazarFetched &&
                                bazarData?.data?.result?.map((bazar: any) => (
                                  <SelectItem key={bazar._id} value={bazar._id}>
                                    {bazar.bnName}
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
                    name="environment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Environment</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Environment name"
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
              <Button disabled={loading} type="submit">
                {loading && <Loader2 className="animate-spin" />}
                Update Retailer
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
