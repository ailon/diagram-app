import { DiagramType } from "@/lib/data";
import Link from "next/link";
import React from "react";

interface Props {
  diagramType: DiagramType;
}

const DiagramTypeCard = ({ diagramType }: Props) => {
  return (
    <Link
      href={{
        pathname: "/edit",
        query: { type: diagramType.typeName },
      }}
      prefetch={false}
    >
      <div className="space-y-3 w-[200px] m-2 border-gray-200 border h-[250px] p-2 rounded hover:border-violet-500 hover:shadow">
        <div className="bg-violet-100 h-auto w-auto object-cover transition-all hover:scale-105 aspect-square">
          &nbsp;
        </div>
        <div className="space-y-1 text-sm">
          <h3
            title={diagramType.displayName}
            className="font-medium leading-none text-ellipsis overflow-hidden whitespace-nowrap"
          >
            {diagramType.displayName}
          </h3>
          <p className="text-xs text-muted-foreground">
            {diagramType.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default DiagramTypeCard;
