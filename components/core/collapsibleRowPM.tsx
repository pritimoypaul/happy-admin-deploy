import React, { useEffect, useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import clsx from "clsx";
import Image from "next/image";
import { Progress } from "../ui/progress";
import moment from "moment";
import { useOrderDetails } from "@/utils/apis/getOrderDetails";
import axiosInstance from "@/utils/axios";

interface CollapsibleRowProps {
  product: any;
}

const CollapsibleRowPM = ({ product }: CollapsibleRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any>({});

  const { data, refetch } = useOrderDetails(product?.id);

  const getOrderDetails = async () => {
    try {
      const response = await axiosInstance.get(`/orders/${product?.id}`);
      setOrderData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  console.log(orderData?.data?.products);

  const calculateInventory = () => {
    let totalInventory = 0;
    if (orderData?.data?.products) {
      orderData.data.products.forEach((item: any) => {
        totalInventory += item?.inventory?.out;
      });
    }
    console.log("total inventory: " + totalInventory);
    return totalInventory;
  };

  const checkEdited = () => {
    if (orderData?.data?.products) {
      let edited = false;
      orderData.data.products.forEach((item: any) => {
        if (item?.isEdited == true) {
          edited = true;
        }
      });
      return edited;
    }
    return false;
  };

  return (
    <>
      <TableRow key={product?._id} className="text-[#595F84]">
        <TableCell className="font-medium w-[40%]">
          {moment(product?.createdAt).format("LL")}
        </TableCell>
        <TableCell>{product?.retailer?.name}</TableCell>

        <TableCell className="text-right">
          <div
            className={clsx(
              `text-right w-full flex justify-end float-right text-[#0472ED] bg-[#007AFF30] px-[14px] py-[4px] rounded-sm max-w-fit`,
              {
                "text-[#FD6A6A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                  calculateInventory() <= 0,
                "text-[#FE964A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                  calculateInventory() > 0 && checkEdited() == true,
              }
            )}
          >
            {calculateInventory() <= 0
              ? "Empty"
              : calculateInventory() > 0 && checkEdited() == true
              ? "Edited"
              : "Fulfilled"}
          </div>
        </TableCell>
        <TableCell>
          {product?.cancel_reason && (
            <p className="text-[10px] text-[#8A94A6]">
              {product.cancel_reason}
            </p>
          )}

          {product?.delivery_percentage && (
            <div className="flex items-center gap-4">
              <p className="text-[10px] text-[#0CAF60]">
                {product?.delivery_percentage}%
              </p>
              <Progress
                value={Number(product?.delivery_percentage)}
                indicatorColor="bg-green-600"
                className="w-[60%] h-[5px]"
              />
            </div>
          )}
        </TableCell>
        <TableCell>
          <button
            onClick={() => {
              refetch();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <Image
                src="/icons/arrow-down-rounded.svg"
                alt="more"
                height={18}
                width={18}
              />
            ) : (
              <Image
                src="/icons/arrow-left-rounded.svg"
                alt="more"
                height={18}
                width={18}
              />
            )}
          </button>
        </TableCell>
      </TableRow>
      {isOpen && (
        <TableRow className="bg-[#FCFCFF]">
          <TableCell>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent>
                <div className="w-full py-[20px] px-[20px]">
                  <p className="font-bold pb-[16px]">Product name</p>
                  <div className="flex flex-col gap-[16px]">
                    {data?.data?.products?.map((item: any) => (
                      <p key={item?._id}>{item?.product?.name}</p>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent>
                <div className="w-full py-[20px] px-[20px]">
                  <p className="font-bold pb-[16px]">QTY</p>
                  <div className="flex flex-col gap-[16px]">
                    {data?.data?.products?.map((item: any) => (
                      <div key={item?._id} className="flex gap-4 items-center">
                        <p>{item?.product?.quantityPerPackage} </p>

                        <span>
                          <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                            B
                          </div>
                        </span>

                        <p>{item?.quantity} </p>

                        <span>
                          <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                            P
                          </div>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>
          <TableCell>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent>
                <div className="w-full py-[20px] px-[20px]">
                  <p className="font-bold pb-[16px]">Edited Order</p>
                  <div className="flex flex-col gap-[16px]">
                    {orderData?.data?.products?.map((item: any) =>
                      item?.inventory?.out == 0 ? (
                        <p key={item._id}>Empty</p>
                      ) : item?.product?.isEdited ? (
                        <p key={item._id}>Edited</p>
                      ) : (
                        <p key={item._id}>n/a</p>
                      )
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>

          <TableCell>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent>
                <div className="w-full py-[20px] px-[20px]">
                  <p className="font-bold pb-[16px]">STATUS</p>
                  <div className="flex flex-col gap-[16px]">
                    {orderData?.data?.products?.map((item: any) =>
                      item?.inventory?.out == 0 ? (
                        <Image
                          key={item._id}
                          src="/icons/red_tick.svg"
                          alt="tick"
                          height={12}
                          width={12}
                        />
                      ) : item?.product?.isEdited ? (
                        <Image
                          key={item._id}
                          src="/icons/orange_tick.svg"
                          alt="tick"
                          height={12}
                          width={12}
                        />
                      ) : (
                        <Image
                          key={item._id}
                          src="/icons/green_tick.svg"
                          alt="tick"
                          height={12}
                          width={12}
                        />
                      )
                    )}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
    </>
  );
};

export default CollapsibleRowPM;
