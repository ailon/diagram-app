"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon, UploadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { MouseEventHandler, useRef, useState } from "react";
import DiagramTypeCard from "./diagram-type-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";
import { Diagram, DiagramType } from "@/lib/data";
import {
  ImageStencilState,
  TextStencilState,
} from "@markerjs/mjs-diagram/core";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiagramStore } from "@/lib/db";
import { useRouter } from "next/navigation";

interface Props {}

const ImportDiagramButton = (props: Props) => {
  let fileList: FileList | null = null;

  const handleImport: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.preventDefault();

    if (fileList !== null && fileList.length > 0) {
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        async () => {
          if (reader.result && typeof reader.result === "string") {
            const importedDiagram = JSON.parse(reader.result) as Diagram;
            if (importedDiagram && importedDiagram.diagramContent) {
              const newDiagram: Diagram = {
                diagramType: importedDiagram.diagramType,
                displayName: importedDiagram.displayName,
                created: importedDiagram.created,
                modified: new Date(),
                diagramContent: importedDiagram.diagramContent,
              };

              const newId = await DiagramStore.addDiagram(newDiagram);

              router.push(`/view?id=${newId}`);
            }
          }
        },
        false
      );

      if (fileList[0]) {
        reader.readAsText(fileList[0]);
      }
    }
  };

  const router = useRouter();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"link"}>
            <UploadIcon className="mr-2 h-4 w-4" />
            Import from file
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-hidden bg-gradient-to-br from-white to-violet-100 max-w-md">
          <DialogHeader>
            <DialogTitle>Import a diagram from file</DialogTitle>
            <DialogDescription>
              Select a previously saved diagram file and press
              &quot;Import&quot;.
            </DialogDescription>
          </DialogHeader>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="datafile">Diagram data file:</Label>
            <Input
              id="datafile"
              type="file"
              accept=".mjsd"
              onChange={(ev) => {
                fileList = ev.target.files;
              }}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleImport}>Import</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImportDiagramButton;
