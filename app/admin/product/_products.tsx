import ProductCardEditable from "@/components/core/productCardEditable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
import React, { useEffect, useState } from "react";
import { AddProductForm } from "./_addProduct";
import { EditProductForm } from "./_editProduct";
import { useProductList } from "@/utils/apis/getProduct";
import { Product } from "@/types/product";

const MainProducts = () => {
  const { height, width } = useWindowDimensions();

  const mainComponentHeight = height - 300;
  const mainComponentWidth = width - 300;

  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState<any>(1);
  const [editData, setEditData] = useState({});

  const { data, isFetched, refetch } = useProductList({ limit, selectedPage });

  const paginate = (side: string) => {
    if (side === "left") {
      if (selectedPage == 1) return;
      setSelectedPage(selectedPage - 1);
    } else {
      if (selectedPage == data?.data?.meta?.totalPage) return;
      setSelectedPage(selectedPage + 1);
    }
  };

  useEffect(() => {
    refetch();
  }, [limit, selectedPage]);

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
                <AddProductForm refetchData={refetch} />
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
          {isFetched &&
            data?.data?.result?.map((product: Product) => (
              <div key={product._id} onClick={() => setEditData(product)}>
                <ProductCardEditable
                  name={product.bnName}
                  details={product.name}
                  image={product.image}
                  quantity={product.quantityPerPackage}
                  price={product.price}
                  url={`/admin/products/${product._id}`}
                />
              </div>
            ))}
        </div>
        <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <EditProductForm refetchData={refetch} editData={editData} />
        </DialogContent>
      </Dialog>
      {/* footer content */}
      <div
        className="bg-[#fff] px-[34px] py-[18px] flex justify-between items-center border-t-[1px] border-[#0472ED1F] absolute bottom-0"
        style={{ width: `${mainComponentWidth}px` }}
      >
        <div className="text-[#718096] text-[14px] flex gap-2 items-center">
          Show&nbsp;Result:
          <Select
            defaultValue={limit.toString()}
            onValueChange={(value) => setLimit(Number(value))}
          >
            <SelectTrigger className="w-full" defaultValue={limit.toString()}>
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="6">6</SelectItem>
              <SelectItem value="7">7</SelectItem>
              <SelectItem value="8">8</SelectItem>
              <SelectItem value="9">9</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={() => paginate("left")} />
              </PaginationItem>
              {isFetched &&
                (() => {
                  const totalPages = data?.data?.meta?.totalPage || 0;
                  const currentPage = data?.data?.meta?.page || 1;

                  // Helper function to determine if a page should be shown
                  const shouldShowPage = (page: any) => {
                    return (
                      page === 1 || // Always show the first page
                      page === totalPages || // Always show the last page
                      (page >= currentPage - 1 && page <= currentPage + 1) // Show current page, one before, one after
                    );
                  };

                  // Construct the pages array with ellipses
                  const pages = [];
                  for (let i = 1; i <= totalPages; i++) {
                    if (shouldShowPage(i)) {
                      pages.push(i);
                    } else if (pages[pages.length - 1] !== "...") {
                      pages.push("...");
                    }
                  }

                  return (
                    <div className="flex items-center">
                      {/* Page Numbers */}
                      {pages.map((page, idx) => (
                        <PaginationItem key={idx}>
                          {page === "..." ? (
                            <span className="ellipsis">...</span>
                          ) : (
                            <PaginationLink
                              className="cursor-pointer"
                              onClick={() => setSelectedPage(page)}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                    </div>
                  );
                })()}

              <PaginationItem>
                <PaginationNext href="#" onClick={() => paginate("right")} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default MainProducts;
