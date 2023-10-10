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
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useState } from "react";
import DiagramTypeCard from "./diagram-type-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DialogClose } from "@radix-ui/react-dialog";

const diagramTypes: DiagramType[] = [
  {
    typeName: 'flowchart',
    displayName: 'Flowchart',
    thumbnailSrc: '/',
    description: 'Flowchart diagram'
  },
  {
    typeName: 'flowchart',
    displayName: 'Flowchart',
    thumbnailSrc: '/',
    description: 'Flowchart diagram'
  },
  {
    typeName: 'flowchart',
    displayName: 'Flowchart',
    thumbnailSrc: '/',
    description: 'Flowchart diagram'
  },
  {
    typeName: 'flowchart',
    displayName: 'Flowchart',
    thumbnailSrc: '/',
    description: 'Flowchart diagram'
  },
  {
    typeName: 'flowchart',
    displayName: 'Flowchart',
    thumbnailSrc: '/',
    description: 'Flowchart diagram'
  },
]

interface Props {}

const NewDiagramButton = (props: Props) => {
  const [newDialogOpen, setNewDialogOpen] = useState(false);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"lg"}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create a diagram!
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full overflow-hidden">
          <DialogHeader>
            <DialogTitle>Create a new diagram</DialogTitle>
            <DialogDescription>
              Select the type of diagram you want to create.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex overflow-hidden h-full max-h-[600px]">
            <div className="flex w-full flex-wrap">
              {diagramTypes.map((t) => {
                return (
                  <DiagramTypeCard key={t.typeName} diagramType={t} />
                )
              })}
            </div>
          </ScrollArea>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDiagramButton;
