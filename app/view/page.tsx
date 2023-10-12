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
  TrashIcon,
} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteButton from "./components/delete-button";

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramViewer = dynamic(() => import("./components/viewer"), {
  ssr: false,
});

interface Props {}

const ViewDiagram = (props: Props) => {
  const handleDelete = async () => {
    if (diagram && diagram.id) {
      await DiagramStore.deleteDiagram(diagram.id);
      router.push('/');
    }
  }
  
  const [diagram, setDiagram] = useState<Diagram | undefined>(undefined);

  const searchParams = useSearchParams();
  const router = useRouter();

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
    }
    getData();
  }, [searchParams]);

  return (
    <>
      <div className="w-screen flex p-2 bg-gradient-to-br from-white to-violet-50 shadow">
        <div className="flex w-full items-center">
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <HomeIcon />
            </Button>
          </Link>
          <p className="ml-4 text-lg">{diagram?.displayName}</p>
        </div>
        <div className="flex flex-1 justify-end">
          <DeleteButton onDeleteConfirm={handleDelete} />
          <Separator orientation="vertical" className="mx-3" />
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
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full ml-2" size={"icon"}>
              <Cross1Icon className="h-4 w-4" />
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
