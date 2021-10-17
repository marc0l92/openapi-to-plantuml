import { IDocDefinition, IDocumentation } from "./documentation";

interface ISwaggerDoc {
    definitions?: { [index: string]: IDocDefinition }
}

export default class SwaggerDoc implements IDocumentation {
    private doc: ISwaggerDoc

    constructor(docJson: Object) {
        this.doc = docJson
    }

    getDefinitions() {
        if ('definitions' in this.doc) {
            return this.doc.definitions
        }
        return {}
    }

}