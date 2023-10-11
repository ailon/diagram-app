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
// import DiagramEditor from './components/editor';

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramEditor = dynamic(() => import("./components/editor"), {
  ssr: false,
});

interface Props {}

const EditDiagram = (props: Props) => {
  const nameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
    el
  ) => {
    console.log(el.target.value);
  };

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
        <div className="flex w-full">
          <Link href="/">
            <Button variant={"ghost"} className="rounded-full" size={"icon"}>
              <HomeIcon />
            </Button>
          </Link>

          <Input
            placeholder="Diagram name"
            value={diagram?.displayName}
            onChange={nameChangeHandler}
          />
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

      <DiagramEditor diagram={diagram} />
    </>
  );
};

export default EditDiagram;
