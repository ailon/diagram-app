import Header from "@/components/header";
import "./globals.css";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Script from "next/script";
import PlausibleProvider from 'next-plausible';

export const metadata: Metadata = {
  title: "Diagrams by marker.js",
  description:
    "Create flowcharts, mind maps, org charts, network diagrams and more.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="diagrams.markerjs.com" />
        <Script id="show-banner">
          {`if (typeof navigator.serviceWorker !== 'undefined') {
              navigator.serviceWorker.register('sw.js')
          }`}
        </Script>
      </head>
      <body className="m-0 bg-gradient-to-br from-violet-50 to-violet-200">
        <div className="flex flex-col h-screen min-h-[700px]">
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
