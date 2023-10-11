import { DiagramState, TextStencilState } from "@markerjs/mjs-diagram/core";
import { Diagram } from "./data";

import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface DiagramsDB extends DBSchema {
  diagrams: {
    value: Diagram;
    key: number;
    indexes: { 'by-modified-date': Date };
  };
}

export class DiagramStore {
  private static async getDB(): Promise<IDBPDatabase<DiagramsDB>> {
    const db = await openDB<DiagramsDB>('diagrams-db', 1, {
      upgrade(db) {
        const productStore = db.createObjectStore('diagrams', {
          keyPath: 'id',
          autoIncrement: true
        });
        productStore.createIndex('by-modified-date', 'modified');
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

    return diagrams.sort((d1, d2) => d1.modified < d2.modified ? 1 : -1);
  }

  public static async addDemoDiagram(): Promise<number> {
    const diagram: DiagramState = {
      width: 560,
      height: 900,
      backgroundColor: "white",
      stencils: [
        {
          color: "#000000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "User comes \nto the website",
          typeName: "TerminalStencil",
          iid: 1,
          left: 88.53121948242188,
          top: 95.99996948242188,
          width: 150,
          height: 50,
          fillColor: "#ccffcc",
          strokeColor: "black",
          strokeWidth: 1,
          strokeDasharray: "",
        } as TextStencilState,
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1.2000000000000002, units: "rem", step: 0.1 },
          padding: 5,
          text: "How NOT to auto-switch website language",
          typeName: "LabelStencil",
          iid: 2,
          left: 112.66665649414062,
          top: 25.333343505859375,
          width: 334.66668701171875,
          height: 47.333343505859375,
          fillColor: "#ccc",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Is user logged in?",
          typeName: "DecisionStencil",
          iid: 3,
          left: 80.53121948242188,
          top: 214.00006103515625,
          width: 166,
          height: 121.33331298828125,
          fillColor: "transparent",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Load profile data,\npreferred language...",
          typeName: "ProcessStencil",
          iid: 4,
          left: 318.1978759765625,
          top: 230.00006103515625,
          width: 170.66668701171875,
          height: 89.33331298828125,
          fillColor: "transparent",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Do they have\nour tracking\ncookie?",
          typeName: "DecisionStencil",
          iid: 5,
          left: 72.53121948242188,
          top: 392.3333740234375,
          width: 182,
          height: 140.66668701171875,
          fillColor: "transparent",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "#000",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Show an ad based\non profile data",
          typeName: "ProcessStencil",
          iid: 6,
          left: 319.86456298828125,
          top: 427.6667175292969,
          width: 167.33331298828125,
          height: 70,
          fillColor: "transparent",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "black",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Get location\nby IP",
          typeName: "ProcessStencil",
          iid: 7,
          left: 103.53121948242188,
          top: 605,
          width: 120,
          height: 70,
          fillColor: "#cccccc",
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
        },
        {
          color: "black",
          fontFamily: "Helvetica, Arial, sans-serif",
          fontSize: { value: 1, units: "rem", step: 0.1 },
          padding: 5,
          text: "Show default\nlanguage for\nlocation",
          typeName: "ProcessStencil",
          iid: 8,
          left: 103.53121948242188,
          top: 754.3646240234375,
          width: 120,
          height: 70,
          fillColor: "#ffcccc",
          strokeColor: "red",
          strokeWidth: 5,
          strokeDasharray: "",
        },
      ],
      connectors: [
        {
          typeName: "AngledArrowConnector",
          iid: 9,
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
          iid: 10,
          startStencilId: 3,
          startPortLocation: "rightcenter",
          endStencilId: 4,
          endPortLocation: "leftcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "yes",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 11,
          startStencilId: 3,
          startPortLocation: "bottomcenter",
          endStencilId: 5,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "no",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 12,
          startStencilId: 5,
          startPortLocation: "rightcenter",
          endStencilId: 6,
          endPortLocation: "leftcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "yes",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 13,
          startStencilId: 5,
          startPortLocation: "bottomcenter",
          endStencilId: 7,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "#000",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "no",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 14,
          startStencilId: 7,
          startPortLocation: "bottomcenter",
          endStencilId: 8,
          endPortLocation: "topcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "red",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
        {
          typeName: "AngledArrowConnector",
          iid: 15,
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
          iid: 16,
          startStencilId: 6,
          startPortLocation: "bottomcenter",
          endStencilId: 7,
          endPortLocation: "rightcenter",
          labelOffsetX: 0,
          labelOffsetY: 0,
          strokeColor: "orange",
          strokeWidth: 1,
          strokeDasharray: "",
          arrowType: "end",
          labelText: "",
        },
      ],
    };
    return await this.addDiagram({
      diagramType: 'flowchart',
      displayName: `Sample flowchart`,
      created: new Date(),
      modified: new Date(),
      diagramContent: diagram
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
}
