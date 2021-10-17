import { IDocDefinition, IDocService, IDocumentation } from "./documentation";

export default class OpenApiDocumentation implements IDocumentation {
    private doc: Object

    constructor(docJson: Object) {
        this.doc = docJson
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