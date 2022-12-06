import { IDocDefinition, IDocMapOfDefinitions, IDocObject } from "./documentation/definition";
export interface IOptions {
    serverUrl?: string;
    format?: string;
    diagramHeader?: string;
    colors?: boolean;
}
export default class DiagramBuilder {
    private options;
    private diagramText;
    private classes;
    constructor(options: IOptions);
    getDiagramText(): string;
    getDiagramImageUri(): string;
    buildTitle(title: string): void;
    buildDefinition(def: IDocDefinition): void;
    buildProperty(name: string, property: IDocDefinition, mandatory?: boolean): IDocMapOfDefinitions;
    buildObject(name: string, objDef: IDocObject, type?: string): IDocMapOfDefinitions;
    buildBasicType(type: string): void;
    buildLink(from: string, to: string): void;
    buildField(name: string, type: string, mandatory: boolean): void;
    color(str: string, color: string): string;
    getDefName(def: IDocDefinition): string;
}
