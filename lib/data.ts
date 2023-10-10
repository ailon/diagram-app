interface Diagram {
  id: string,
  displayName: string,
  diagramType: string,
  diagramContent?: object;
}

interface DiagramType {
  typeName: string,
  displayName: string,
  thumbnailSrc: string,
  description?: string
}