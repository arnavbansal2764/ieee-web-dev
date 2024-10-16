import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";
import CreateChatModal from "@/components/modals/createChat";
const font = Urbanist({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "LawGPT",
  description: "Your AI law assistant",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${font.className} bg-[#030014] overflow-y-scroll overflow-x-hidden`}>
          <CreateChatModal/>
          {children}
        </body>
      </html>
    </ClerkProvider>

  );
}
