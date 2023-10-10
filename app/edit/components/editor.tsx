'use client'

import React, { useEffect, useRef } from 'react'
import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsde from "@markerjs/mjs-diagram/editor";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";

type Props = {}

const DiagramEditor = (props: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<mjsde.DiagramEditor | null>(null);

  useEffect(() => {
    if (editorRef.current === null) {
      const editor = document.createElement('mjs-diagram-editor') as mjsde.DiagramEditor;
      containerRef.current?.appendChild(editor);
      // mjs diagram bug workaround: can only set stencil set after appending to the parent
      editor.stencilEditorSet = flowchart.flowchartStencilEditorSet;
      editorRef.current = editor;
    }
  });

  return (
    <div ref={containerRef} className="flex flex-1 p-4 overflow-hidden">

      
    </div>
  )
}

export default DiagramEditor