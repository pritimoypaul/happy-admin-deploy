import type { Metadata } from "next";
import "./globals.css";
import TanstackProvider from "@/utils/queryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Happy Admin",
  description: "Connecting Hearts, Delivering Smiles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          {children}
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />
        </TanstackProvider>
      </body>
    </html>
  );
}
