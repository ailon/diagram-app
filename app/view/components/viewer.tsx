"use client";

import React, { useEffect, useRef } from "react";
import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsdv from "@markerjs/mjs-diagram/viewer";
import * as mindmap from "@markerjs/mjs-diagram/stencilsets/mindmap/mindmap";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";
import * as orgchart from "@markerjs/mjs-diagram/stencilsets/orgchart/orgchart";
import * as network from "@markerjs/mjs-diagram/stencilsets/network/network";
import { Diagram } from "@/lib/data";

type Props = {
  diagram?: Diagram;
};

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
  let diagramTypeName = 'core';

  if (props.diagram) {
    diagramTypeName = props.diagram.diagramType;
  }
  diagramType = diagramTypes.find(t => t.id === diagramTypeName) ?? mjsdcore.basicStencilSet;

  useEffect(() => {
    if (viewerRef.current === null) {
      const viewer = new mjsdv.DiagramViewer();
      containerRef.current?.appendChild(viewer);
      viewerRef.current = viewer;
    }
    // mjs diagram bug workaround: can only set stencil set after appending to the parent
    viewerRef.current.stencilSet = diagramType;
    viewerRef.current.autoScaling = "both";
    if (props.diagram && props.diagram.diagramContent) {
      console.log(JSON.stringify(props.diagram.diagramContent));
      viewerRef.current.show(props.diagram.diagramContent);
    }

  });

  return (
    <div ref={containerRef} className="flex flex-1 p-4 overflow-hidden"></div>
  );
};

export default DiagramViewer;
