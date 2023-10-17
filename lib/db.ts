import { DiagramState, TextStencilState } from "@markerjs/mjs-diagram/core";
import { Diagram } from "./data";

import { openDB, DBSchema, IDBPDatabase } from "idb";

interface DiagramsDB extends DBSchema {
  diagrams: {
    value: Diagram;
    key: number;
    indexes: { "by-modified-date": Date };
  };
}

export class DiagramStore {
  private static async getDB(): Promise<IDBPDatabase<DiagramsDB>> {
    const db = await openDB<DiagramsDB>("diagrams-db", 1, {
      upgrade(db) {
        const productStore = db.createObjectStore("diagrams", {
          keyPath: "id",
          autoIncrement: true,
        });
        productStore.createIndex("by-modified-date", "modified");
      },
    });
    return db;
  }
  public static async getDiagrams(): Promise<Diagram[]> {
    const db = await this.getDB();

    const diagrams = await db.getAll("diagrams");

    if (diagrams.length === 0) {
      await this.addDemoDiagram();
      return await db.getAll("diagrams");
    }

    return diagrams.sort((d1, d2) => (d1.modified < d2.modified ? 1 : -1));
  }

  public static async addDemoDiagram(): Promise<number> {
    const diagram: DiagramState = {
      width: 900,
      height: 800,
      backgroundColor: "#ffffff",
      stencils: [
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1.4000000000000004, units: "rem", step: 0.1 },
          padding: 2,
          text: "How to share diagrams?",
          typeName: "LabelStencil",
          iid: 11,
          left: 620.0000305175781,
          top: 19.66668701171875,
          width: 245.33331298828125,
          height: 70,
          fillColor: "#ccc",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        } as TextStencilState,
        {
          color: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Diagrams by marker.js",
          typeName: "TerminalStencil",
          iid: 1,
          left: 259.6667175292969,
          top: 125.33334350585938,
          width: 200.66668701171875,
          height: 50,
          fillColor: "blue",
          strokeColor: "white",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "New diagram?",
          typeName: "DecisionStencil",
          iid: 3,
          left: 281.00006103515625,
          top: 214.66671752929688,
          width: 158,
          height: 87.3333740234375,
          fillColor: "white",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: 'Click\n"Create a diagram!"',
          typeName: "ProcessStencil",
          iid: 4,
          left: 48.66667175292969,
          top: 223.33340454101562,
          width: 160,
          height: 70,
          fillColor: "#ccc",
          strokeColor: "blue",
          strokeWidth: 5,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "Created on \nthis device?",
          typeName: "DecisionStencil",
          iid: 5,
          left: 522.6668090820312,
          top: 214.00006103515625,
          width: 157.33334350585938,
          height: 88.66668701171875,
          fillColor: "white",
          strokeColor: "#84cc16",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "Select diagram type",
          typeName: "ProcessStencil",
          iid: 6,
          left: 46.999996185302734,
          top: 348.3333435058594,
          width: 162.00000762939453,
          height: 70,
          fillColor: "white",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: 'Click\n"Import from file"',
          typeName: "ProcessStencil",
          iid: 7,
          left: 720.6666564941406,
          top: 348.3333435058594,
          width: 144.66668701171875,
          height: 70,
          fillColor: "#ccc",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "Select from\nthe list",
          typeName: "ProcessStencil",
          iid: 8,
          left: 541.3334808349609,
          top: 348.3333435058594,
          width: 120,
          height: 70,
          fillColor: "#ccc",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "Create and close",
          typeName: "ProcessStencil",
          iid: 9,
          left: 54,
          top: 476.3334045410156,
          width: 148,
          height: 70,
          fillColor: "white",
          strokeColor: "#10b981",
          strokeWidth: 3,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "View diagram",
          typeName: "ProcessStencil",
          iid: 10,
          left: 300.00006103515625,
          top: 476.3334045410156,
          width: 120,
          height: 70,
          fillColor: "#ccccff",
          strokeColor: "blue",
          strokeWidth: 3,
          strokeDasharray: "",
        },
        {
          color: "#a855f7",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: 'Click "share"',
          typeName: "ProcessStencil",
          iid: 12,
          left: 300.00006103515625,
          top: 594.3334045410156,
          width: 120,
          height: 70,
          fillColor: "white",
          strokeColor: "#a855f7",
          strokeWidth: 3,
          strokeDasharray: "",
        },
        {
          color: "white",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 2,
          text: "Done",
          typeName: "TerminalStencil",
          iid: 13,
          left: 285.00006103515625,
          top: 715.6666564941406,
          width: 150,
          height: 50,
          fillColor: "#84cc16",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
      ],
      connectors: [
        {
          typeName: "AngledArrowConnector",
          iid: 14,
          startStencilId: 1,
          startPortLocation: "bottomcenter",
          endStencilId: 3,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 15,
          startStencilId: 3,
          startPortLocation: "leftcenter",
          endStencilId: 4,
          endPortLocation: "rightcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#84cc16",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "yes",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 16,
          startStencilId: 3,
          startPortLocation: "rightcenter",
          endStencilId: 5,
          endPortLocation: "leftcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#ef4444",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "no",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 18,
          startStencilId: 5,
          startPortLocation: "bottomcenter",
          endStencilId: 8,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#84cc16",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "yes",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 19,
          startStencilId: 5,
          startPortLocation: "rightcenter",
          endStencilId: 7,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#ef4444",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "no",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 20,
          startStencilId: 7,
          startPortLocation: "bottomcenter",
          endStencilId: 10,
          endPortLocation: "rightcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 21,
          startStencilId: 8,
          startPortLocation: "bottomcenter",
          endStencilId: 10,
          endPortLocation: "rightcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 22,
          startStencilId: 4,
          startPortLocation: "bottomcenter",
          endStencilId: 6,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 23,
          startStencilId: 6,
          startPortLocation: "bottomcenter",
          endStencilId: 9,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 24,
          startStencilId: 9,
          startPortLocation: "rightcenter",
          endStencilId: 10,
          endPortLocation: "leftcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 25,
          startStencilId: 10,
          startPortLocation: "bottomcenter",
          endStencilId: 12,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 26,
          startStencilId: 12,
          startPortLocation: "bottomcenter",
          endStencilId: 13,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
      ],
    };
    return await this.addDiagram({
      diagramType: "flowchart",
      displayName: `Sample flowchart`,
      created: new Date(),
      modified: new Date(),
      diagramContent: diagram,
    });
  }

  public static async getDiagram(id: number): Promise<Diagram | undefined> {
    const db = await this.getDB();

    return await db.get("diagrams", id);
  }

  public static async addDiagram(diagram: Diagram): Promise<number> {
    const db = await this.getDB();

    return await db.add("diagrams", diagram);
  }

  public static async saveDiagram(diagram: Diagram): Promise<number> {
    const db = await this.getDB();

    diagram.modified = new Date();

    return await db.put("diagrams", diagram);
  }

  public static async deleteDiagram(diagramId: number): Promise<void> {
    const db = await this.getDB();

    return await db.delete("diagrams", diagramId);
  }
}
