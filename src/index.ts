import Documentation from './documentation/documentation'
import SwaggerDocumentation from './documentation/swaggerDocumentation'
import OpenApiDocumentation from './documentation/openApiDocumentation'
import DiagramBuilder from './diagramBuilder'

export default class SwaggerToPlantuml {
    private doc: Documentation
    private diagram: DiagramBuilder

    constructor(docJson: any) {
        if (!(docJson instanceof Object)) {
            throw 'Input documentation must be a JSON Object'
        }

        // Check swagger
        if ('swagger' in docJson && docJson.swagger === '2.0') {
            this.doc = new SwaggerDocumentation(docJson)
        } else if ('openapi' in docJson && docJson.openapi.match(/^3\.[0-9]+\.[0-9]+$/)) {
            this.doc = new OpenApiDocumentation(docJson)
        } else {
            throw 'Input documentation format not supported'
        }

        this.diagram = new DiagramBuilder()
    }

    getDiagramText(): string {
        return this.diagram.getDiagramText()
    }

    execute(): void {

    }
}