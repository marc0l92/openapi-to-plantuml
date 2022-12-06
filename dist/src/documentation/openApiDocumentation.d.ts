import { Documentation, IDocMapOfDefinitions, IDocServices } from "./definition";
export default class OpenApiDocumentation extends Documentation {
    private _doc;
    constructor(docJson: Object);
    protected get doc(): any;
    protected set doc(doc: any);
    getTitle(): string;
    getServices(): IDocServices;
    getDefinitions(): IDocMapOfDefinitions;
}
