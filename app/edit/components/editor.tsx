"use client";

import React, { useEffect, useRef } from "react";
import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsde from "@markerjs/mjs-diagram/editor";
import * as mindmap from "@markerjs/mjs-diagram/stencilsets/mindmap/mindmap";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";
import * as orgchart from "@markerjs/mjs-diagram/stencilsets/orgchart/orgchart";
import * as network from "@markerjs/mjs-diagram/stencilsets/network/network";
import { useSearchParams } from "next/navigation";
import { Diagram } from "@/lib/data";

interface Props {
  diagram?: Diagram;
  onDiagramChange: (diagram: mjsdcore.DiagramState) => void;
};

const DiagramEditor = (props: Props) => {
  const handleDiagramChange = (ev: CustomEvent<mjsde.DiagramEditorEventData>) => {
    props.onDiagramChange(ev.detail.editor.getState());
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<mjsde.DiagramEditor | null>(null);

  const diagramTypes = [
    mjsde.basicStencilEditorSet,
    mindmap.mindMapStencilEditorSet,
    flowchart.flowchartStencilEditorSet,
    orgchart.orgchartStencilEditorSet,
    network.networkStencilEditorSet,
  ];

  let diagramType = mjsde.basicStencilEditorSet;
  let diagramTypeName = 'core';

  const searchParams = useSearchParams();

  if (props.diagram) {
    diagramTypeName = props.diagram.diagramType;
  } else {
    diagramTypeName = searchParams.get('type') ?? diagramTypeName;
  }
  if (diagramTypeName) {
    diagramType = diagramTypes.find(t => t.id === diagramTypeName) ?? mjsde.basicStencilEditorSet;
  }

  useEffect(() => {
    if (editorRef.current === null) {
      const editor = document.createElement(
        "mjs-diagram-editor"
      ) as mjsde.DiagramEditor;
      // mjs diagram bug workaround: can only set stencil set after appending to the parent
      containerRef.current?.appendChild(editor);
      editorRef.current = editor;
    }
    editorRef.current.addEventListener('statechange', handleDiagramChange)
    editorRef.current.stencilEditorSet = diagramType;
    editorRef.current.hideToolbarButtons('save');
    if (props.diagram && props.diagram.diagramContent) {
      editorRef.current.restoreState(props.diagram.diagramContent);
    }
    return (() => {
      if (editorRef.current !== null) {
        editorRef.current.removeEventListener('statechange', handleDiagramChange);
      }
    })
  });

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden rounded-lg border-violet-300 border-2"></div>
  );
};

export default DiagramEditor;
