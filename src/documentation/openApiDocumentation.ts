import { IDocDefinition, IDocumentation } from "./documentation";

export default class OpenApiDocumentation implements IDocumentation {
    private doc: Object

    constructor(docJson: Object) {
        this.doc = docJson
    }

    getDefinitions() {
        return {}
    }

}