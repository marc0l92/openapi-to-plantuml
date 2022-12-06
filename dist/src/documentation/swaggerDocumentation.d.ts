import { IDocMapOfDefinitions, Documentation, IDocServices } from "./definition";
export default class SwaggerDoc extends Documentation {
    private _doc;
    constructor(docJson: Object);
    protected get doc(): any;
    protected set doc(doc: any);
    getTitle(): string;
    getServices(): IDocServices;
    getDefinitions(): IDocMapOfDefinitions;
}
