import { TabButton } from "@/components/core/tabButton";
import TableTabButton from "@/components/core/tableTabButton";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const SrOverview = () => {
  const [graphTab, setGraphTab] = useState("This Week");
  const [tableTab, setTableTab] = useState("Product");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const series = [{ name: "Value", data: [20, 25, 30, 40, 35, 30, 45] }];

  const options: any = {
    chart: {
      type: "line",
      height: 350,
      dropShadow: { enabled: true, top: 4, left: 0, blur: 7, opacity: 0.4 },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#2563EB"],
    xaxis: { categories: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
    tooltip: {
      y: {
        formatter: function (val: any) {
          return `৳${val.toFixed(2)}`;
        },
      },
    },
  };

  const donutOptions: any = {
    chart: { type: "donut", height: 216 },
    labels: ["Apples", "Oranges", "Bananas", "Grapes"],
    colors: ["#0472ED", "#FFD66B", "#FF8F6B", "#c6c6c6"],
    plotOptions: {
      pie: { donut: { size: "75%" }, style: { borderRadius: "50px" } },
    },
    dataLabels: {
      enabled: false,
      formatter: (val: any, opts: any) =>
        `${opts.w.globals.labels[opts.seriesIndex]}: ${val.toFixed(1)}%`,
    },
    tooltip: { y: { formatter: (val: any) => `${val.toFixed(1)}%` } },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "14px",
      labels: { colors: undefined, useSeriesColors: true },
    },
  };

  const donutSeries = [70, 55, 13, 43];

  const barOptions: any = {
    chart: { type: "bar", height: 350 },
    plotOptions: {
      bar: {
        borderRadius: 10,
        borderRadiusApplication: "end",
        columnWidth: "50%",
        dataLabels: { position: "top" },
      },
    },
    dataLabels: {
      enabled: false,
      formatter: function (val: any) {
        return `${val}`;
      },
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#0472ED"] },
    },
    xaxis: {
      categories: ["S", "M", "T", "W", "T", "F", "S"],

      labels: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: { enabled: true, offsetY: -35 },
    },
    fill: {
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [50, 0, 100, 100],
      },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        formatter: function (val: any) {
          return `${val}`;
        },
      },
    },
    colors: ["#0472ED"],
  };

  const barSeries = [{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 30] }];

  const topProducts = [
    {
      image: "/images/muffin.png",
      name: "মিল্ক বিস্কুট",
      price: "৳100",
      brand: "happy-time",
      quantity: "500",
      sr: "Mohammad Ali",
    },
    {
      image: "/images/muffin.png",
      name: "মিল্ক বিস্কুট 2",
      price: "৳100",
      brand: "happy-time",
      quantity: "500",
      sr: "Mohammad Ali",
    },
    {
      image: "/images/muffin.png",
      name: "মিল্ক বিস্কুট 3",
      price: "৳100",
      brand: "happy-time",
      quantity: "500",
      sr: "Mohammad Ali",
    },
    {
      image: "/images/muffin.png",
      name: "মিল্ক বিস্কুট 4",
      price: "৳100",
      brand: "happy-time",
      quantity: "500",
      sr: "Mohammad Ali",
    },
    {
      image: "/images/muffin.png",
      name: "মিল্ক বিস্কুট 5",
      price: "৳100",
      brand: "happy-time",
      quantity: "500",
      sr: "Mohammad Ali",
    },
  ];

  return (
    <div className="w-full flex gap-3 mt-[20px]">
      <div className="w-2/3">
        {/* line chart */}
        <div className="w-full bg-[#fff] rounded-[12px] p-[25px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#64748B] text-[12px]">Overall Sell</p>
              <p className="text-[18px] font-bold">
                ৳48,574.21{" "}
                <span className="text-[12px] font-medium text-[#34D399]">
                  +20%
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setGraphTab("This Week")}>
                <TabButton
                  title="This Week"
                  selected={graphTab == "This Week"}
                />
              </button>
              <button onClick={() => setGraphTab("This Month")}>
                <TabButton
                  title="This Month"
                  selected={graphTab == "This Month"}
                />
              </button>
              <button onClick={() => setGraphTab("This Year")}>
                <TabButton
                  title="This Year"
                  selected={graphTab == "This Year"}
                />
              </button>
              <button onClick={() => setGraphTab("Lifetime")}>
                <TabButton title="Lifetime" selected={graphTab == "Lifetime"} />
              </button>
            </div>
          </div>
          <div className="pb-4">
            {mounted && (
              <Chart
                options={options}
                series={series}
                type="line"
                height={350}
              />
            )}
          </div>
        </div>
        {/* line chart end */}

        {/* top 10 list */}
        <div className="mt-5 border-b-[1px] py-2 px-[25px] border-[#0472ED1F] w-full bg-[#fff] rounded-t-[12px]">
          <h3 className="font-bold text-[16px] text-[#222950]">TOP 10 List</h3>
        </div>
        <div className="w-full bg-[#fff] rounded-b-[12px] p-[25px]">
          <div>
            <ul className="flex items-center gap-[40px]">
              <button onClick={() => setTableTab("Product")}>
                <TableTabButton
                  selected={tableTab === "Product"}
                  title="Product"
                />
              </button>
              <button onClick={() => setTableTab("Dealer")}>
                <TableTabButton
                  selected={tableTab === "Dealer"}
                  title="Dealer"
                />
              </button>

              <button onClick={() => setTableTab("Retailer")}>
                <TableTabButton
                  selected={tableTab === "Retailer"}
                  title="Retailer"
                />
              </button>

              <button onClick={() => setTableTab("SR")}>
                <TableTabButton selected={tableTab === "SR"} title="SR" />
              </button>
              <button onClick={() => setTableTab("Union")}>
                <TableTabButton selected={tableTab === "Union"} title="Union" />
              </button>
              <button onClick={() => setTableTab("Bazar")}>
                <TableTabButton selected={tableTab === "Bazar"} title="Bazar" />
              </button>
            </ul>
          </div>

          <div className="mt-[22px] h-[300px] overflow-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">IMAGE</TableHead>
                  <TableHead className="w-[200px]">NAME</TableHead>
                  <TableHead>PRICE</TableHead>
                  <TableHead className="text-right">BRAND</TableHead>
                  <TableHead className="text-right">QUANTITY</TableHead>
                  <TableHead className="text-right">SR NAME</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.name}>
                    <TableCell className="font-medium">
                      <Image
                        className="border-2 border-[#EBEDF5] rounded-[12px]"
                        src={product.image}
                        alt="Img"
                        height={47}
                        width={47}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell className="text-center">
                      {product.brand}
                    </TableCell>
                    <TableCell className="text-right">
                      {product.quantity}
                    </TableCell>
                    <TableCell className="text-right">{product.sr}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* top 10 kist end */}
      </div>
      <div className="w-1/3">
        <div className="w-full bg-[#fff] rounded-[12px] p-[25px]">
          <div className="pt-[34px] pb-[38px]">
            <p className="text-[#030229] text-[18px] font-medium text-center">
              Analytics
            </p>
          </div>
          <div className="relative">
            <Chart
              options={donutOptions}
              series={donutSeries}
              type="donut"
              height={216}
            />
            <div className="absolute top-[78px] left-[43%]">
              <p className="text-[#030229] text-[30px] font-bold">80%</p>
            </div>
          </div>
        </div>

        {/* bar chart */}
        <div className="w-full bg-[#fff] rounded-[12px] p-[25px] mt-[22px]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#64748B] text-[12px]">Top Sell By Route</p>
              <p className="text-[#0F172A] text-[18px] font-bold">
                10,320{" "}
                <span className="text-[12px] text-[#ED4F9D] font-medium">
                  -20%
                </span>
              </p>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="This Week" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>This Week</SelectLabel>
                    <SelectItem value="Week">This Week</SelectItem>
                    <SelectItem value="Month">This Month</SelectItem>
                    <SelectItem value="Year">This Year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* chart */}
          <div className="mt-4">
            <Chart
              options={barOptions}
              series={barSeries}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SrOverview;
