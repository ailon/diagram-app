"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Diagram } from "@/lib/data";
import { DiagramStore } from "@/lib/db";
import {
  CopyIcon,
  Cross1Icon,
  GitHubLogoIcon,
  HomeIcon,
  Pencil2Icon,
  QuestionMarkIcon,
  Share1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteButton from "./components/delete-button";

import styles from "./view.module.css";
import Image from "next/image";

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramViewer = dynamic(() => import("./components/viewer"), {
  ssr: false,
});

interface Props {}

const ViewDiagram = (props: Props) => {
  const handleDelete = async () => {
    if (diagram && diagram.id) {
      await DiagramStore.deleteDiagram(diagram.id);
      router.push("/");
    }
  };

  const handleFork = async () => {
    if (diagram && diagram.id && diagram.diagramContent) {
      const forkedDiagram: Diagram = {
        diagramType: diagram.diagramType,
        displayName: `Copy of ${diagram.displayName}`,
        diagramContent: diagram.diagramContent,
        created: new Date(),
        modified: new Date(),
      }
      const newId = await DiagramStore.addDiagram(forkedDiagram);
      router.push(`/edit?id=${newId}`);
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
        <div className="flex w-full items-center shrink overflow-hidden">
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <HomeIcon />
            </Button>
          </Link>
          <p className="ml-4 mb-0 text-lg whitespace-nowrap overflow-hidden shrink text-ellipsis">
            {diagram?.displayName}
          </p>
        </div>
        <div className="flex flex-1 justify-end grow">
          <DeleteButton onDeleteConfirm={handleDelete} />
          <Separator orientation="vertical" className="sm:mx-3" />

          <a href="https://markerjs.com/products/diagram/" title="MJS Diagram">
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <Image src={'./markerjs-logo-m.svg'} alt="MJS Diagram" width="24" height="24" className="h-4 w-4"  />
          </Button>
          </a>
          
          <a href="https://github.com/ailon/diagram-app" title="MJS Diagram">
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <GitHubLogoIcon className="h-4 w-4 text-black" />
          </Button>
          </a>
          <Button variant={"ghost"} className="rounded-full" size={"icon"}>
            <Share1Icon className="h-4 w-4" />
          </Button>
          <Button onClick={handleFork} variant={"ghost"} className="rounded-full" size={"icon"}>
            <CopyIcon className="h-4 w-4" />
          </Button>

          <Link
            href={{
              pathname: "/edit",
              query: { id: diagram?.id },
            }}
          >
            <Button>
              <Pencil2Icon className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant={"ghost"}
              className="rounded-full ml-2"
              size={"icon"}
            >
              <Cross1Icon className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
      <Separator decorative={true} />

      <div
        className={`${styles.diagramView} flex grow overflow-hidden md:m-4 p-2 md:p-6 bg-white md:rounded-lg`}
      >
        <DiagramViewer diagram={diagram} />
      </div>
    </>
  );
};

export default ViewDiagram;
