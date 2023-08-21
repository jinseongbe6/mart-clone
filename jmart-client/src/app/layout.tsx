"use client";

import { GlobalNavBar } from "@/components/GlobalNavBar";
import "./globals.scss";
import { Inter } from "next/font/google";
import { BasketFloat } from "@/components/BasketFloat";
import { OffCanvasMenu } from "@/components/OffCanvasMenu";
import { GlobalProvider } from "@/context/GlobalContext";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          <QueryClientProvider client={queryClient}>
            <GlobalNavBar />
            {children}
            <BasketFloat />
            <OffCanvasMenu />
          </QueryClientProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
