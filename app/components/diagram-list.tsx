"use client"

import React, { useEffect, useState } from "react";
import DiagramCard from "./diagram-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DiagramStore } from "@/lib/db";
import { Diagram } from "@/lib/data";

// const data: Diagram[] = [
//   {
//     id: "diagram1",
//     displayName: "Diagram 1",
//     diagramType: "Mind Map",
//   },
//   {
//     id: "diagram2",
//     displayName: "Diagram 2",
//     diagramType: "Mind Map",
//   },
//   {
//     id: "diagram3",
//     displayName: "Diagram 3",
//     diagramType: "Mind Map",
//   },
//   {
//     id: "diagram4",
//     displayName: "Flowchart for the masses with long name",
//     diagramType: "Flowchart",
//   },
// ];

type Props = {};

const DiagramList = (props: Props) => {
  const [diagrams, setDiagrams] = useState<Diagram[] | undefined>(undefined);


  useEffect(() => {
    async function fetchData() {
      const data = await DiagramStore.getDiagrams();
      setDiagrams(data);
    }
    fetchData();
  }, []);

  return (
    <ScrollArea className="flex flex-1 p-4">
      <div className="flex flex-wrap items-start content-start">
        {diagrams?.map((d) => (
          <DiagramCard key={d.id} diagram={d} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default DiagramList;
