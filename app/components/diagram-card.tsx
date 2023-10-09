import React from "react";

interface Props {
  diagram: Diagram;
}

const DiagramCard = ({ diagram }: Props) => {
  return (
    <div className="space-y-3 w-[200px] m-2 border-gray-200 border h-[250px] p-2 rounded hover:border-violet-500 hover:shadow">
      <div className="bg-violet-100 h-auto w-auto object-cover transition-all hover:scale-105 aspect-square">
        &nbsp;
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
  );
};

export default DiagramCard;
