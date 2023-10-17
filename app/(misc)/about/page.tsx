import { ScrollArea } from "@/components/ui/scroll-area";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: 'About Diagrams by marker.js'
}

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <ScrollArea className="flex flex-1 p-4">
      <h1>Create diagrams with the help of MJS Diagram</h1>

      <p>
        This application is based on the{" "}
        <a href="https://markerjs.com/products/diagram/">MJS Diagram library</a>{" "}
        and you can use it to create, view, and share flowcharts, org charts,
        network diagrams, mind maps and more.
      </p>

      <p>
        Everything is created and stored in your browser and none of your
        content is sent back to our or any other servers. This means that your
        diagrams are exclussively yours but it also means that when you open
        this page on another machine (or just another browser or profile on the
        same device) you won&apos;t see your previously created diagrams. You
        can work around this by exporting your diagrams on this device and, for
        example, saving them in your cloud storage service of choice (Dropbox,
        Google Drive, OneDrive, iCloud, etc.)
      </p>

      <p>
        In addition to being a useful diagramming tool, this app is also a demo
        for the <a href="https://markerjs.com/products/diagram/">MJS Diagram</a>{" "}
        library. The source code is available{" "}
        <a href="https://github.com/ailon/diagram-app">on GitHub</a> under the
        MIT license. You can take this app and learn how to build real-world MJS
        Diagram implementations, or just extend it to fit your specific needs.
      </p>

      <h2>Credits</h2>

      <p>
        This app was built and is maintained by{" "}
        <a href="https://x.com/ailon">Alan Mendelevich</a>. It uses the
        following libraries:
      </p>

      <ul className="list-disc list-inside">
        <li><a href="https://markerjs.com/products/diagram/">MJS Diagram</a> for diagram editing and viewing.</li>
        <li><a href="https://nextjs.org/">Next.js</a> is the main framework the app is built on.</li>
        <li><a href="https://ui.shadcn.com/">shadcn/ui</a>, <a href="https://www.radix-ui.com/">Radix UI</a>, and <a href="https://tailwindcss.com/">Tailwind CSS</a> for the UI.</li>
        <li><a href="https://github.com/jakearchibald/idb">idb</a> for storing data in the browser&apos;s IndexedDB.</li>
      </ul>
    </ScrollArea>
  );
};

export default AboutPage;
