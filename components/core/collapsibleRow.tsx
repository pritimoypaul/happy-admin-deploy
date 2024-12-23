import React, { useState } from "react";

import { TableCell, TableRow } from "@/components/ui/table";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import clsx from "clsx";
import Image from "next/image";
import { Progress } from "../ui/progress";

interface CollapsibleRowProps {
  product: any;
}

const CollapsibleRow = ({ product }: CollapsibleRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <TableRow key={product.orders} className="text-[#595F84]">
        <TableCell className="font-medium">{product.date}</TableCell>
        <TableCell>{product.retailer}</TableCell>
        <TableCell className="text-center">{product.qty}</TableCell>
        <TableCell className="text-right">{product.amount}</TableCell>
        <TableCell className="text-right">
          <div
            className={clsx(`text-right w-full flex justify-end float-right`, {
              "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.payment == "paid",
              "text-[#EF3DF2] bg-[#FC6BFF1A] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.payment == "baki",
            })}
          >
            {product.payment == "paid" ? "Paid" : "Baki"}
          </div>
        </TableCell>
        <TableCell className="text-right">
          <div
            className={clsx(`text-right w-full flex justify-end float-right`, {
              "text-[#0CAF60] bg-[#E7F7EF] px-[14px] py-[4px] rounded-sm max-w-fit":
                product.status == "delivered",
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
          <button onClick={() => setIsOpen(!isOpen)}>
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
                    <p>Fresh Water</p>
                    <p>Fresh Water</p>
                    <p>Fresh Water</p>
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
                    <div className="flex gap-4 items-center">
                      04
                      <span>
                        <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                          B
                        </div>
                      </span>
                      14{" "}
                      <span>
                        <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                          P
                        </div>
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      04
                      <span>
                        <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                          B
                        </div>
                      </span>
                      14{" "}
                      <span>
                        <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                          P
                        </div>
                      </span>
                    </div>
                    <div className="flex gap-4 items-center">
                      04
                      <span>
                        <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                          B
                        </div>
                      </span>
                      14{" "}
                      <span>
                        <div className="text-[12px] w-[15px] h-[15px] bg-[#ffffff] rounded-[4px] flex justify-center items-center border-[1px] border-[#8A94A64A]">
                          P
                        </div>
                      </span>
                    </div>
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
                    <p>Tk 20</p>
                    <p>Tk 20</p>
                    <p>Tk 20</p>
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
                    <p>Tk 18</p>
                    <p>Tk 18</p>
                    <p>Tk 18</p>
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
                    <p className="text-[#1EB564]">10 Tk</p>
                    <p className="text-[#E49F4E]">-10 Tk</p>
                    <p className="text-[#1EB564]">10 Tk</p>
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
                    <p>Tk 100</p>
                    <p>Tk 100</p>
                    <p>Tk 100</p>
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
