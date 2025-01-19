import { balooda } from "@/utils/bengaliFont";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import axiosInstance from "@/utils/axios";
import { toast } from "../hooks/use-toast";

interface RouteBoxProps {
  title: string;
  distance: number;
  id: string;
  day: string;
  uid: string;
  refetch: any;
}

const RouteBox = ({
  title,
  distance,
  id,
  day,
  uid,
  refetch,
}: RouteBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onDelete = async () => {
    const userData = {
      day: day,
      route: id,
    };
    try {
      await axiosInstance.patch(`/user-routes/${uid}/delete-route`, userData);

      refetch();
    } catch (e: any) {
      console.log(e.response.data.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: e.response.data.message,
      });
    }
  };

  const handleConfirm = () => {
    onDelete();
    setIsOpen(false);
  };
  return (
    <>
      <div className="group flex items-center justify-between px-[16px] py-[12px] border-[1px] w-full max-h-fit border-[#0000000D] rounded-[10px] hover:border-[#007AFF47]">
        <div>
          <p className={`${balooda.className}`}>{title}</p>
        </div>
        <div>
          <p className="text-[#595F84] text-[15px]">{distance}</p>
        </div>
        <div className="cursor-pointer block group-hover:hidden">
          {/* <Image src={"/icons/edit-icon.svg"} alt="edit" height={11} width={11} /> */}
          <Image
            src={"/icons/delete-icon-grey.svg"}
            alt="edit"
            height={11}
            width={11}
          />
        </div>
        <div
          className="cursor-pointer hidden group-hover:block"
          onClick={() => setIsOpen(true)}
        >
          {/* <Image
          src={"/icons/edit-icon-blue.svg"}
          alt="edit"
          height={11}
          width={11}
        /> */}
          <Image
            src={"/icons/delete-icon.svg"}
            alt="edit"
            height={11}
            width={11}
          />
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <p>
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RouteBox;
