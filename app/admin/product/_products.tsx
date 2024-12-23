import ProductCardEditable from "@/components/core/productCardEditable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useWindowDimensions from "@/utils/windowSize";
import Image from "next/image";
import React, { useState } from "react";
import { AddProductForm } from "./_addProduct";
import { EditProductForm } from "./_editProduct";
import { useProductList } from "@/utils/apis/getProduct";
import { Product } from "@/types/product";

const MainProducts = () => {
  const { height } = useWindowDimensions();

  const mainComponentHeight = height - 300;

  const [limit] = useState(10);
  const [selectedPage] = useState(1);

  const {data, isFetched} = useProductList(
    limit,
    selectedPage
  )


  return (
    <div
      className="w-full overflow-hidden mt-[20px] bg-[#ffffff] rounded-[12px]"
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div>
          <h3 className="font-bold text-[16px]">All Product</h3>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center px-[10px] py-[10px] border-[1px] border-[#E0EFFF] rounded-[7px]">
            <button>
              <Image
                src="/icons/refresh.svg"
                alt="filter"
                width={14}
                height={14}
              />
            </button>
          </div>
          <div>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pran Foods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pran Foods">Pran Foods</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Dialog>
              <DialogTrigger>
                <div className="px-[20px] max-w-fit h-[40px] flex justify-center items-center gap-4 bg-[#007AFF] text-[#ffffff] rounded-[7px] cursor-pointer">
                  <span>Add Product</span>
                  <Image
                    src="/icons/plus-white.svg"
                    height={14}
                    width={14}
                    alt="icon"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <AddProductForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Dialog>
        <div
          className="overflow-scroll px-[24px] pt-[24px] grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4"
          style={{ height: `${mainComponentHeight}px`, paddingBottom: "200px" }}
        >
          {
            isFetched && 
            data?.data?.result?.map((product : Product)=>(
              <ProductCardEditable
              key={product._id}
            name={product.bnName}
            details={product.name}
            image={product.image}
            quantity={product.quantityPerPackage}
            price={product.price}
            url={`/admin/products/${product._id}`}
          />
            ))
          }
          
          
        </div>
        <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EditProductForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MainProducts;
