"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Diagram } from "@/lib/data";
import { DiagramStore } from "@/lib/db";
import {
  Cross1Icon,
  HomeIcon,
  Pencil2Icon,
  QuestionMarkIcon,
} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramViewer = dynamic(() => import("./components/viewer"), {
  ssr: false,
});

interface Props {}

const ViewDiagram = (props: Props) => {
  const [diagram, setDiagram] = useState<Diagram | undefined>(undefined);

  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchData() {
      const diagramIdParam = searchParams.get("id");
      const diagramId =
        diagramIdParam !== null ? Number.parseInt(diagramIdParam) : null;
      let diagram: Diagram | undefined = undefined;
      if (diagramId !== null) {
        diagram = await DiagramStore.getDiagram(diagramId);
      }
      setDiagram(diagram);
    }
    fetchData();
  }, [searchParams]);

  return (
    <>
      <div className="w-screen flex p-2">
        <div className="flex w-full items-center">
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <HomeIcon />
            </Button>
          </Link>
          <p className="ml-4 text-lg">{diagram?.displayName}</p>
        </div>
        <div className="flex flex-1 justify-end">
          <Link
            href={{
              pathname: "/edit",
              query: { id: diagram?.id },
            }}
          >
            <Button>
              <Pencil2Icon className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <QuestionMarkIcon />
          </Button>
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <Cross1Icon />
            </Button>
          </Link>
        </div>
      </div>
      <Separator decorative={true} />

      <DiagramViewer diagram={diagram} />
    </>
  );
};

export default ViewDiagram;
