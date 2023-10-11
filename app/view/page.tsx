import dynamic from "next/dynamic";
import React from "react";

// got to import dynamically because otherwise next tries to bundle toolbar on the server
const DiagramViewer = dynamic(() => import("./components/viewer"), {
  ssr: false,
});

interface Props {}

const ViewDiagram = (props: Props) => {
  return <DiagramViewer />;
};

export default ViewDiagram;
