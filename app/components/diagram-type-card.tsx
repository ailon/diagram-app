"use client"

import { Diagram, DiagramType } from "@/lib/data";
import { DiagramStore } from "@/lib/db";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useEffect, useRef } from "react";

import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsdv from "@markerjs/mjs-diagram/viewer";
import * as mindmap from "@markerjs/mjs-diagram/stencilsets/mindmap/mindmap";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";
import * as orgchart from "@markerjs/mjs-diagram/stencilsets/orgchart/orgchart";
import * as network from "@markerjs/mjs-diagram/stencilsets/network/network";

interface Props {
  diagramType: DiagramType;
}

const DiagramTypeCard = ({ diagramType }: Props) => {
  const router = useRouter();

  const handleNewDiagramClick: MouseEventHandler = async (ev) => {
    const newDiagram: Diagram = {
      displayName: `${diagramType.displayName} ${new Date().toLocaleString()}`,
      diagramType: diagramType.typeName,
      created: new Date(),
      modified: new Date(),
    };
    const id = await DiagramStore.addDiagram(newDiagram);
    router.push(`/edit?id=${id}`);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<mjsdv.DiagramViewer | null>(null);

  const stencilSets = [
    mjsdcore.basicStencilSet,
    mindmap.mindMapStencilSet,
    flowchart.flowchartStencilSet,
    orgchart.orgchartStencilSet,
    network.networkStencilSet,
  ];

  let stencilSet = mjsdcore.basicStencilSet;
  let diagramTypeName = diagramType.typeName;

  stencilSet =
    stencilSets.find((t) => t.id === diagramTypeName) ??
    mjsdcore.basicStencilSet;

  useEffect(() => {
    if (diagramType.preview) {
      if (viewerRef.current === null) {
        const viewer = new mjsdv.DiagramViewer();
        containerRef.current?.appendChild(viewer);
        viewerRef.current = viewer;
        viewer.loadAnimationEnabled = false;
        viewer.toolbarVisible = false;
        viewer.style.pointerEvents = "none";
      }
      viewerRef.current.stencilSet = stencilSet;
      viewerRef.current.show(diagramType.preview);
    }
  });
  return (
    <div
      onClick={handleNewDiagramClick}
      className="space-y-3 w-[200px] m-2 border-gray-200 border h-[250px] p-2 rounded hover:border-violet-500 hover:shadow"
    >
      <div
        ref={containerRef}
        className="bg-violet-100 h-auto w-auto object-cover transition-all hover:scale-105 aspect-square border border-violet-200 overflow-hidden rounded-sm pointer-events-none"
      ></div>
      <div className="space-y-1 text-sm">
        <h3
          title={diagramType.displayName}
          className="font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {diagramType.displayName}
        </h3>
        <p className="text-xs text-muted-foreground">
          {diagramType.description}
        </p>
      </div>
    </div>
  );
};

export default DiagramTypeCard;
