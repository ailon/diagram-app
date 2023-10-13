"use client"

import React, { useEffect, useState } from "react";
import DiagramCard from "./diagram-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DiagramStore } from "@/lib/db";
import { Diagram } from "@/lib/data";

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-x-6 gap-y-6">
        {diagrams?.map((d) => (
          <DiagramCard key={d.id} diagram={d} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default DiagramList;
