import Documentation from "./documentation";

export default class SwaggerDocumentation implements Documentation {
    private doc: Object

    constructor(docJson: Object) {
        this.doc = docJson
    }
}