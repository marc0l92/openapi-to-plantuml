import Documentation from "./documentation";

export default class OpenApiDocumentation implements Documentation {
    private doc: Object

    constructor(docJson: Object) {
        this.doc = docJson
    }
}