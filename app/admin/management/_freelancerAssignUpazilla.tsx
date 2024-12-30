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
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { Upazila } from "@/types/upazila";
import axiosInstance from "@/utils/axios";
import { Loader2 } from "lucide-react";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Framework = Record<"value" | "label", string>;

const FormSchema = z.object({
  upazila: z.string().min(2, {
    message: "Please select upazila",
  }),
});

export function AssignUpazillaForm({ id, refetch }: any) {
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [loading, setLoading] = useState(false);

  //for multiselect

  const FRAMEWORKS = [
    {
      value: "paba",
      label: "Paba",
    },
    {
      value: "durgapur",
      label: "Durgapur",
    },
  ] satisfies Framework[];

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Framework[]>([FRAMEWORKS[1]]);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((framework: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== framework.value));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = FRAMEWORKS.filter(
    (framework) => !selected.includes(framework)
  );

  console.log(selectables, selected, inputValue);

  //for multiselect

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
              <div className="w-full h-[400px] flex items-start justify-around gap-3">
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

                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />

                  {/* multi select */}
                  <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                  >
                    <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                      <div className="flex flex-wrap gap-1">
                        {selected.map((framework) => {
                          return (
                            <Badge key={framework.value} variant="secondary">
                              {framework.label}
                              <button
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleUnselect(framework);
                                  }
                                }}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                }}
                                onClick={() => handleUnselect(framework)}
                              >
                                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              </button>
                            </Badge>
                          );
                        })}
                        {/* Avoid having the "Search" Icon */}
                        <CommandPrimitive.Input
                          ref={inputRef}
                          value={inputValue}
                          onValueChange={setInputValue}
                          onBlur={() => setOpen(false)}
                          onFocus={() => setOpen(true)}
                          placeholder="Select frameworks..."
                          className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                        />
                      </div>
                    </div>
                    <div className="relative mt-2">
                      <CommandList>
                        {open && selectables.length > 0 ? (
                          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                            <CommandGroup className="h-full overflow-auto">
                              {selectables.map((framework) => {
                                return (
                                  <CommandItem
                                    key={framework.value}
                                    onMouseDown={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onSelect={() => {
                                      setInputValue("");
                                      setSelected((prev) => [
                                        ...prev,
                                        framework,
                                      ]);
                                    }}
                                    className={"cursor-pointer"}
                                  >
                                    {framework.label}
                                  </CommandItem>
                                );
                              })}
                            </CommandGroup>
                          </div>
                        ) : null}
                      </CommandList>
                    </div>
                  </Command>
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
