/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState } from "react";
import * as mjsdcore from "@markerjs/mjs-diagram/core";
import * as mjsde from "@markerjs/mjs-diagram/editor";
import * as mindmap from "@markerjs/mjs-diagram/stencilsets/mindmap/mindmap";
import * as flowchart from "@markerjs/mjs-diagram/stencilsets/flowchart/flowchart";
import * as orgchart from "@markerjs/mjs-diagram/stencilsets/orgchart/orgchart";
import * as network from "@markerjs/mjs-diagram/stencilsets/network/network";
import { useSearchParams } from "next/navigation";
import { Diagram } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Share1Icon } from "@radix-ui/react-icons";

type Props = {
  diagram?: Diagram;
};

const DiagramRender = (props: Props) => {
  const handleDiagramLoad = async (
    ev: CustomEvent<mjsde.DiagramEditorEventData>
  ) => {
    const renderedImgSrc = await ev.detail.editor.render();
    if (
      renderedImgSrc !== undefined &&
      imgRef.current !== null &&
      containerRef.current !== null
    ) {
      imgRef.current.src = renderedImgSrc;
      containerRef.current.style.display = "none";
      imgRef.current.style.display = "";
    }
  };

  const handleShareClick = async () => {
    function dataURItoBlob(dataURI: string) {
      const byteString = window.atob(dataURI.split(",")[1]);

      const byteArray = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        byteArray[i] = byteString.charCodeAt(i);
      }
      return new Blob([byteArray], { type: "image/png" });
    }

    if (imgRef.current !== null && props.diagram) {
      const imgFile = [
        new File(
          [dataURItoBlob(imgRef.current.src)],
          `${props.diagram.displayName}.png`,
          {
            type: "image/png",
          }
        ),
      ];

      if (navigator.canShare({ files: imgFile })) {
        await navigator.share({
          files: imgFile,
          title: props.diagram.displayName,
          text: `${props.diagram?.displayName}. Created with MJS Diagram https://markerjs.com/products/diagram`,
        });
      } else {
        setCanShare(false);
      }
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<mjsde.DiagramEditor | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [canShare, setCanShare] = useState<boolean>(
    navigator.canShare !== undefined
  );

  const diagramTypes = [
    mjsde.basicStencilEditorSet,
    mindmap.mindMapStencilEditorSet,
    flowchart.flowchartStencilEditorSet,
    orgchart.orgchartStencilEditorSet,
    network.networkStencilEditorSet,
  ];

  let diagramType = mjsde.basicStencilEditorSet;
  let diagramTypeName = "core";

  if (props.diagram) {
    diagramTypeName = props.diagram.diagramType;
  }
  if (diagramTypeName) {
    diagramType =
      diagramTypes.find((t) => t.id === diagramTypeName) ??
      mjsde.basicStencilEditorSet;
  }

  useEffect(() => {
    if (editorRef.current === null) {
      const editor = new mjsde.DiagramEditor();
      // mjs diagram bug workaround: can only set stencil set after appending to the parent
      containerRef.current?.appendChild(editor);
      editorRef.current = editor;
    }

    if (containerRef.current && imgRef.current) {
      // need the editor rendered (visible) in order to rasterize correctly
      containerRef.current.style.display = "";
      imgRef.current.style.display = "none";
    }

    editorRef.current.addEventListener("diagramload", handleDiagramLoad);
    editorRef.current.stencilEditorSet = diagramType;
    if (props.diagram && props.diagram.diagramContent) {
      editorRef.current.restoreState(props.diagram.diagramContent);
    }
    return () => {
      if (editorRef.current !== null) {
        editorRef.current.removeEventListener("diagramload", handleDiagramLoad);
      }
    };
  });

  return (
    <div className="flex flex-col align-middle justify-center">
      <div ref={containerRef} className="invisible"></div>
      <div className="flex h-auto w-auto border border-violet-200 overflow-hidden rounded-sm justify-center">
        <img
          ref={imgRef}
          alt={props.diagram?.displayName ?? ""}
          style={{
            display: "none",
            height: "100%",
            maxWidth: `${props.diagram?.diagramContent?.width}px`,
            maxHeight: `${props.diagram?.diagramContent?.height}px`,
          }}
        />
      </div>

      <div
        className="flex justify-center mt-4"
        style={{ maxWidth: `${Math.max(props.diagram?.diagramContent?.width ?? 0, 300)}px` }}
      >
        {canShare && (
          <Button onClick={handleShareClick} size={"lg"}>
            <Share1Icon className="mr-2 h-4 w-4" />
            Share
          </Button>
        )}
        {!canShare && (
          <p>
            Looks like your browser doesn&apos;t support the standard sharing
            protocol. You will need to right click on the image, save it, and
            then share like you share your local images or photos.
          </p>
        )}
      </div>
    </div>
  );
};

export default DiagramRender;
