import { DiagramState } from "@markerjs/mjs-diagram/core";

export interface Diagram {
  id: string;
  displayName: string;
  diagramType: string;
  diagramContent?: DiagramState;
  created: Date;
  modified: Date;
}

export interface DiagramType {
  typeName: string;
  displayName: string;
  thumbnailSrc: string;
  description?: string;
}
