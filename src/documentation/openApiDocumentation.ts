import { IDocService, Documentation } from "./definition";

export default class OpenApiDocumentation extends Documentation {
    private _doc: Object

    constructor(docJson: Object) {
        super()
        this._doc = docJson
    }

    protected get doc(): any {
        return this._doc;
    }

    protected set doc(doc: any) {
        this._doc = doc;
    }

    getTitle() {
        return ''
    }

    getServices() {
        let services: IDocService[] = []
        return services
    }

    getDefinitions() {
        return {}
    }

}