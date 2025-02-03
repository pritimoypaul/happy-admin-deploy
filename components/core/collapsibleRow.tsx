import React, { useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import clsx from "clsx";
import Image from "next/image";
import { Progress } from "../ui/progress";
import moment from "moment";
import { useOrderDetails } from "@/utils/apis/getOrderDetails";

interface CollapsibleRowProps {
  product: any;
}

const CollapsibleRow = ({ product }: CollapsibleRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, refetch } = useOrderDetails(product?.id);
  return (
    <>
      <TableRow key={product?._id} className="text-[#595F84]">
        <TableCell className="font-medium">
          {moment(product?.createdAt).format("LL")}
        </TableCell>
        <TableCell>{product?.sr?.name}</TableCell>
        <TableCell className="text-center">{product.qty}</TableCell>
        <TableCell className="text-right">
          {product.collectionAmount} ৳
        </TableCell>
        <TableCell className="text-right">
          <div
            className={clsx(`text-right w-full flex justify-end float-right`, {
              "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                product?.paymentStatus == "paid",
              "text-[#EF3DF2] bg-[#FC6BFF1A] px-[14px] py-[4px] rounded-sm max-w-fit":
                product?.paymentStatus == "Unpaid",
            })}
          >
            {product?.paymentStatus == "paid" ? "Paid" : "Baki"}
          </div>
        </TableCell>
        <TableCell className="text-right">
          <div
            className={clsx(`text-right w-full flex justify-end float-right`, {
              "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.status == "delivered",
              "text-[#0aa75b] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.status == "Processing",
              "text-[#FD6A6A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.status == "cancelled",
              "text-[#FE964A] bg-[#FFF0E6] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.status == "on_delivery",
            })}
          >
            {product.status == "delivered"
              ? "Delivered"
              : product.status == "on_delivery"
              ? "On Delivery"
              : product.status == "Processing"
              ? "Processing"
              : "Cancelled"}
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
                        <p>
                          {Math.floor(
                            item?.quantity / item?.product?.quantityPerPackage
                          )}{" "}
                        </p>

                        <span>
                          <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                            B
                          </div>
                        </span>

                        <p>
                          {item?.quantity % item?.product?.quantityPerPackage}{" "}
                        </p>

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
                  <p className="font-bold pb-[16px]">Price</p>
                  <div className="flex flex-col gap-[16px]">
                    {data?.data?.products?.map((item: any) => (
                      <p key={item?._id}>Tk {item?.price} </p>
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
                  <p className="font-bold pb-[16px]">SR PRICE</p>
                  <div className="flex flex-col gap-[16px]">
                    {data?.data?.products?.map((item: any) => (
                      <p key={item?._id}>Tk {item?.srPrice} </p>
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
                  <p className="font-bold pb-[16px]">O/C</p>
                  <div className="flex flex-col gap-[16px]">
                    {data?.data?.products?.map((item: any) => (
                      <p key={item?._id} className="text-[#1EB564]">
                        {item?.product?.ourCommission} Tk
                      </p>
                    ))}
                    {/* <p className="text-[#E49F4E]">-10 Tk</p> */}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </TableCell>
          <TableCell>
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleContent>
                <div className="w-full py-[20px] px-[20px]">
                  <p className="font-bold pb-[16px]">TOTAL</p>
                  <div className="flex flex-col gap-[16px]">
                    {data?.data?.products?.map((item: any) => (
                      <p key={item?._id}>Tk {item?.totalAmount} </p>
                    ))}
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

export default CollapsibleRow;
