import { Diagram } from "@/lib/data";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsdv from "@markerjs/mjs-diagram/viewer";
import * as mindmap from "@markerjs/mjs-diagram/stencilsets/mindmap/mindmap";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";
import * as orgchart from "@markerjs/mjs-diagram/stencilsets/orgchart/orgchart";
import * as network from "@markerjs/mjs-diagram/stencilsets/network/network";

interface Props {
  diagram: Diagram;
}

const DiagramCard = ({ diagram }: Props) => {
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
  let diagramTypeName = "core";

  if (diagram) {
    diagramTypeName = diagram.diagramType;
  }
  diagramType =
    diagramTypes.find((t) => t.id === diagramTypeName) ??
    mjsdcore.basicStencilSet;

  useEffect(() => {
    if (viewerRef.current === null) {
      const viewer = new mjsdv.DiagramViewer();
      containerRef.current?.appendChild(viewer);
      viewerRef.current = viewer;
      viewer.loadAnimationEnabled = false;
      viewer.toolbarVisible = false;
      viewer.style.pointerEvents = 'none';
    }
    // mjs diagram bug workaround: can only set stencil set after appending to the parent
    viewerRef.current.stencilSet = diagramType;
    if (diagram && diagram.diagramContent) {
      viewerRef.current.show(diagram.diagramContent);
    }
  });

  return (
    <Link href={`/view?id=${diagram.id}`}>
      <div className="space-y-3 w-[200px] m-2 border-gray-200 border h-[250px] p-2 rounded hover:border-violet-500 hover:shadow bg-violet-50">
        <div ref={containerRef} className="bg-violet-100 h-auto w-auto object-cover transition-all hover:scale-105 aspect-square border border-violet-200 overflow-hidden rounded-sm pointer-events-none">
        </div>
        <div className="space-y-1 text-sm">
          <h3
            title={diagram.displayName}
            className="font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {diagram.displayName}
          </h3>
          <p className="text-xs text-muted-foreground">{diagram.diagramType}</p>
        </div>
      </div>
    </Link>
  );
};

export default DiagramCard;
