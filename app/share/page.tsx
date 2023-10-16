"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Cross1Icon, HomeIcon, QuestionMarkIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Diagram } from "@/lib/data";
import { DiagramStore } from "@/lib/db";
import { DiagramState } from "@markerjs/mjs-diagram";

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramRender = dynamic(() => import("./components/render"), {
  ssr: false,
});

interface Props {}

const ShareDiagram = (props: Props) => {
  const [diagram, setDiagram] = useState<Diagram | undefined>(undefined);
  const [displayName, setDisplayName] = useState<string>("");

  const searchParams = useSearchParams();

  useEffect(() => {
    async function getData() {
      const diagramIdParam = searchParams.get("id");
      const diagramId =
        diagramIdParam !== null ? Number.parseInt(diagramIdParam) : null;
      let diagramData: Diagram | undefined = undefined;
      if (diagramId !== null) {
        diagramData = await DiagramStore.getDiagram(diagramId);
      }
      setDiagram(diagramData);
      if (diagramData) {
        setDisplayName(diagramData.displayName);
      }
    }
    getData();
  }, [searchParams]);

  return (
    <>
      <div className="w-screen flex p-2 bg-gradient-to-br from-white to-violet-50 shadow">
        <div className="flex w-full items-center shrink overflow-hidden">
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <HomeIcon />
            </Button>
          </Link>
          <p className="ml-4 mb-0 text-lg whitespace-nowrap overflow-hidden shrink text-ellipsis">
            <b>Share</b> {diagram?.displayName}
          </p>
        </div>
        <div className="flex flex-1 justify-end">
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <QuestionMarkIcon />
          </Button>
          <Link
            href={
              diagram && diagram.id !== undefined
                ? `/view?id=${diagram.id}`
                : "/"
            }
          >
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <Cross1Icon />
            </Button>
          </Link>
        </div>
      </div>
      <Separator decorative={true} />

      <div className="flex grow overflow-hidden m-4 p-6 bg-white rounded-lg justify-center">
        <DiagramRender diagram={diagram} />
      </div>
    </>
  );
};

export default ShareDiagram;
