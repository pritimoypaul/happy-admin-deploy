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
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useUnionList } from "@/utils/apis/getUnion";
import { useUpazilaList } from "@/utils/apis/getUpazila";
import { Upazila } from "@/types/upazila";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useAreaList } from "@/utils/apis/getArea";
import axiosInstance from "@/utils/axios";

type Framework = Record<"value" | "label", string>;

const FormSchema = z.object({
  day: z.string().min(2, {
    message: "Please select day",
  }),
  upazila: z.string().min(2, {
    message: "Please select upazila",
  }),
  union: z.string().min(2, {
    message: "Please select union",
  }),
  bazar: z.string().optional(),
});

export function AddRouteForm({ id, refetch }: any) {
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [bazars, setBazars] = useState([]);

  //for multiselect

  const BAZARS = bazars satisfies Framework[];

  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Framework[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleUnselect = useCallback((bazar: Framework) => {
    setSelected((prev) => prev.filter((s) => s.value !== bazar.value));
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

  const selectables = BAZARS.filter((bazar) => !selected.includes(bazar));

  //for multiselect

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      day: "",
      upazila: "",
      union: "",
      bazar: "",
    },
  });

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
  } = useAreaList(1000, 1, selectedUnion);

  async function onSubmit(data: any) {
    const trasformed = selected.map((item: any) => item.value);
    const userData = {
      day: data.day,
      routes: trasformed,
    };

    try {
      await axiosInstance.put(`/user-routes/${id}/create-route`, userData);

      toast({
        variant: "default",
        title: "Routes added successfully!",
        description: "You have added routes.",
      });
      refetch();
      setSuccess(true);
    } catch (e: any) {
      console.log(e.response.data.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: e.response.data.message,
      });
    }

    form.reset();
  }

  const restForm = () => {
    form.reset();
    setSuccess(false);
  };

  useEffect(() => {
    unionRefetch();
  }, [selectedUpazila]);

  useEffect(() => {
    bazarRefetch();
  }, [selectedUnion]);

  useEffect(() => {
    if (bazarFetched) {
      const transformedData = bazarData?.data.result.map((item: any) => ({
        value: item._id,
        label: item.bnName,
      }));
      setBazars(transformedData);
    }
  }, [bazarData]);

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
            Route successfully added.
          </p>
          <br />
          <Button onClick={() => restForm()}>Add New Route</Button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <div className="w-full flex items-start justify-around gap-3">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="day"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Day</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Day" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sunday">Sunday</SelectItem>
                              <SelectItem value="monday">Monday</SelectItem>
                              <SelectItem value="tuesday">Tuesday</SelectItem>
                              <SelectItem value="wednesday">
                                Wednesday
                              </SelectItem>
                              <SelectItem value="thursday">Thursday</SelectItem>
                              <SelectItem value="friday">Friday</SelectItem>
                              <SelectItem value="saturday">Saturday</SelectItem>
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
                  {/* multi select */}
                  {bazarFetched && (
                    <Command
                      onKeyDown={handleKeyDown}
                      className="overflow-visible bg-transparent"
                    >
                      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <div className="flex flex-wrap gap-1">
                          {selected.map((bazar) => {
                            return (
                              <Badge key={bazar?.value} variant="secondary">
                                {bazar?.label}
                                <button
                                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleUnselect(bazar);
                                    }
                                  }}
                                  onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                  }}
                                  onClick={() => handleUnselect(bazar)}
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
                            placeholder="Select bazars..."
                            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                          />
                        </div>
                      </div>
                      <div className="relative mt-2">
                        <CommandList>
                          {open && selectables.length > 0 ? (
                            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                              <CommandGroup className="h-full overflow-auto">
                                {selectables.map((bazar: any) => {
                                  return (
                                    <CommandItem
                                      key={bazar?.value}
                                      onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                      }}
                                      onSelect={() => {
                                        setInputValue("");
                                        setSelected((prev) => [...prev, bazar]);
                                      }}
                                      className={"cursor-pointer"}
                                    >
                                      {bazar?.label}
                                    </CommandItem>
                                  );
                                })}
                              </CommandGroup>
                            </div>
                          ) : null}
                        </CommandList>
                      </div>
                    </Command>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant={"outlinered"} type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Add</Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
