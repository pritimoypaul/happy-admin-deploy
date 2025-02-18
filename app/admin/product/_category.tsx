import useWindowDimensions from "@/utils/windowSize";
import React, { useEffect, useState } from "react";

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
import CategoryBox from "@/components/core/categoryBox";
import { Input } from "@/components/ui/input";
import { useCategoryList } from "@/utils/apis/getCategory";
import { Category } from "@/types/category";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddButton } from "@/components/core/addButton";
import { AddCategoryForm } from "./_addCategoryForm";
import { EditCategoryForm } from "./_editCategoryForm";

const MainCategoryScreen = () => {
  const { height } = useWindowDimensions();

  const mainComponentHeight = height - 300;

  const [limit, setLimit] = useState(10);
  const [selectedPage, setSelectedPage] = useState<any>(1);
  const [editData, setEditData] = useState({});

  const { data, isFetched, refetch } = useCategoryList(limit, selectedPage);

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
      className="w-full overflow-hidden mt-[30px] bg-[#ffffff] rounded-[12px] relative"
      style={{ height: `${mainComponentHeight}px`, paddingBottom: "50px" }}
    >
      <div className="px-[34px] py-[18px] flex justify-between items-center border-b-[1px] border-[#0472ED1F]">
        <div></div>
        <div className="flex gap-2">
          <div>
            <Input placeholder="Category Name" />
          </div>
          <Dialog>
            <DialogTrigger>
              <AddButton title="Add Category" />
            </DialogTrigger>
            <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
              <DialogHeader>
                <DialogTitle></DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <AddCategoryForm refetch={refetch} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* main content */}
      <div className="py-[20px] px-[34px]">
        <Dialog>
          <div
            className="overflow-scroll pt-[24px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
            style={{
              height: `${mainComponentHeight}px`,
              paddingBottom: "200px",
            }}
          >
            {isFetched &&
              data?.data?.result?.map((category: Category) => (
                <DialogTrigger
                  key={category._id}
                  onClick={() => setEditData(category)}
                >
                  <CategoryBox title={category.bnName} />
                </DialogTrigger>
              ))}
          </div>
          <DialogContent className="max-w-[650px] max-h-[90%] overflow-scroll">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <EditCategoryForm refetchData={refetch} editData={editData} />
          </DialogContent>
        </Dialog>
      </div>
      {/* footer content */}
      <div className="bg-[#fff] px-[34px] py-[18px] flex justify-between items-center border-t-[1px] border-[#0472ED1F] absolute bottom-0 w-full">
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

export default MainCategoryScreen;
