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
import { useState } from "react";
import Image from "next/image";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { Upazila } from "@/types/upazila";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";
// import { MultiSelect } from "@/components/ui/multi-select";

const FormSchema = z.object({
  upazila: z.string().min(2, {
    message: "Please select upazila",
  }),
});

export function AssignUpazillaForm({ id, refetch }: any) {
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [loading, setLoading] = useState(false);
  //   const [upazilaList, setUpazilaList] = useState([
  //     { value: "react", label: "React" },
  //     { value: "angular", label: "Angular" },
  //     { value: "vue", label: "Vue" },
  //     { value: "svelte", label: "Svelte" },
  //     { value: "ember", label: "Ember" },
  //   ]);
  //   const [selectedUpazilas, setSelectedUpazilas] = useState<string[]>([
  //     "react",
  //     "angular",
  //   ]);

  const { data: upazilaData, isFetched: upazilaFetched } = useUpazilaList();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      upazila: "",
    },
  });

  async function onSubmit(data: any) {
    const upazillaData = {
      upazilas: [data.upazila],
    };

    console.log(upazillaData);

    try {
      setLoading(true);
      await axiosInstance.put(
        `/freelancers/${id}/assign-upazilas`,
        upazillaData
      );

      toast({
        variant: "default",
        title: "Upazila assigned successfully!",
        description: "You have assigned upazila to a freelancer.",
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
  }

  const restForm = () => {
    form.reset();
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
            Upazilla successfully assigned.
          </p>
          <br />
          <Button onClick={() => restForm()}>Assign Again</Button>
        </div>
      ) : (
        // <div className="p-4">
        //   <h1 className="text-2xl font-bold mb-4">Multi-Select Component</h1>
        //   <MultiSelect
        //     options={upazilaList}
        //     onValueChange={setSelectedUpazilas}
        //     defaultValue={selectedUpazilas}
        //     placeholder="Select Upazila"
        //     variant="inverted"
        //     animation={0}
        //     maxCount={3}
        //   />
        // </div>

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
