"use client";

import React, { useEffect, useRef } from "react";
import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsdv from "@markerjs/mjs-diagram/viewer";
import * as mindmap from "@markerjs/mjs-diagram/stencilsets/mindmap/mindmap";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";
import * as orgchart from "@markerjs/mjs-diagram/stencilsets/orgchart/orgchart";
import * as network from "@markerjs/mjs-diagram/stencilsets/network/network";
import { useSearchParams } from "next/navigation";
import { DiagramStore } from "@/lib/dummy-data";
import { Diagram } from "@/lib/data";

type Props = {};

const DiagramViewer = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<mjsdv.DiagramViewer | null>(null);

  const diagramTypes = [
    mjsdcore.basicStencilSet,
    mindmap.mindMapStencilSet,
    flowchart.flowchartStencilSet,
    orgchart.orgchartStencilSet,
    network.networkStencilSet,
  ];

  let diagramType = mjsdcore.basicStencilSet;

  const searchParams = useSearchParams();
  const diagramId = searchParams.get('id');
  let diagram: Diagram;
  if (diagramId !== null) {
    diagram = DiagramStore.getDiagram(diagramId);
    // @todo
    //diagramType = diagramTypes.find(t => t. === diagramTypeName) ?? mjsde.basicStencilEditorSet;
    diagramType = flowchart.flowchartStencilSet;
  }

  useEffect(() => {
    if (viewerRef.current === null) {
      const viewer = new mjsdv.DiagramViewer();
      containerRef.current?.appendChild(viewer);
      // mjs diagram bug workaround: can only set stencil set after appending to the parent
      viewer.stencilSet = diagramType;
      viewer.autoScaling = "both";
      if (diagram && diagram.diagramContent) {
        viewer.show(diagram.diagramContent)
      }
      viewerRef.current = viewer;
    }
  });

  return (
    <div ref={containerRef} className="flex flex-1 p-4 overflow-hidden"></div>
  );
};

export default DiagramViewer;
