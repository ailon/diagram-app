import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="m-0 bg-gradient-to-br from-violet-50 to-violet-200">
        <div className="flex flex-col h-screen max-h-screen">
          {children}

          <div className="flex  flex-col text-center text-sm text-muted-foreground bg-gradient-to-tl from-white to-violet-50 shadow">
            <Separator decorative={true} />
            <div className="flex items-center justify-center my-2">
              <span>
                Powered by{" "}
                <a href="https://markerjs.com/products/diagram" target="blank">
                  MJS Diagram
                </a>
              </span>
              <Separator
                orientation="vertical"
                className="mx-2"
                decorative={true}
              />
              <Link href="/about">About</Link>
              <Separator
                orientation="vertical"
                className="mx-2"
                decorative={true}
              />
              <Link href="/privacy">Privacy policy</Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
