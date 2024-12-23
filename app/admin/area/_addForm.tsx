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
import { Input } from "@/components/ui/input";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { useUnionList } from "@/utils/apis/getUnion";
import { Upazila } from "@/types/upazila";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  upazila: z.string().min(2, {
    message: "Please select upazila",
  }),
  union: z.string().min(2, {
    message: "Please select union",
  }),
  name: z.string().min(2, {
    message: "Please set bazar name",
  }),
  bnName: z.string().min(2, {
    message: "Please set bazar name in Bengali",
  }),
});

export function AddBazarForm({ refetch }: any) {
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: upazilaData, isFetched: upazilaFetched } = useUpazilaList();

  const {
    data: unionData,
    isFetched: unionFetched,
    refetch: unionRefetch,
  } = useUnionList(selectedUpazila);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      upazila: "",
      union: "",
      name: "",
      bnName: "",
    },
  });

  async function onSubmit(data: any) {
    const bazarData = {
      name: data.name,
      bnName: data.bnName,
      union: data.union,
    };

    console.log(bazarData);

    try {
      setLoading(true);
      await axiosInstance.post("/area", bazarData);

      toast({
        variant: "default",
        title: "Bazar added successfully!",
        description: "You have added a new Bazar.",
      });
      setLoading(false);
      refetch();
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
    setSuccess(true);
  }

  const restForm = () => {
    form.reset();
    setSuccess(false);
  };

  useEffect(() => {
    unionRefetch();
  }, [selectedUpazila]);

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
            Bazar successfully created.
          </p>
          <br />
          <Button onClick={() => restForm()}>Add New Bazar</Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
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
                            defaultValue={selectedUpazila}
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedUpazila(value);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Upazila" />
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
              </div>
              <br />
              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="union"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Union</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={selectedUnion}
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedUnion(value);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Union" />
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bazar Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Bazar Name"
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
                    name="bnName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bazar Name Bengali</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Bazar Name Bengali"
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
                Add
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
