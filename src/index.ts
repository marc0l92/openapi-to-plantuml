import { IDocObject, IDocumentation } from './documentation/documentation'
import SwaggerDoc from './documentation/swaggerDocumentation'
import OpenApiDocumentation from './documentation/openApiDocumentation'
import DiagramBuilder, { IOptions } from './diagramBuilder'

export default class SwaggerToPlantuml {
    private doc: IDocumentation
    private diagram: DiagramBuilder

    constructor(docJson: any, options: IOptions) {
        if (!(docJson instanceof Object)) {
            throw 'Input documentation must be a JSON Object'
        }

        // Check swagger
        if ('swagger' in docJson && docJson.swagger === '2.0') {
            this.doc = new SwaggerDoc(docJson)
        } else if ('openapi' in docJson && docJson.openapi.match(/^3\.[0-9]+\.[0-9]+$/)) {
            this.doc = new OpenApiDocumentation(docJson)
        } else {
            throw 'Input documentation format not supported'
        }

        this.diagram = new DiagramBuilder(options || {})
    }

    getDiagramText(): string {
        return this.diagram.getDiagramText()
    }

    getDiagramImageUri(): string {
        return this.diagram.getDiagramImageUri()
    }

    execute(): void {
        console.log('execute')
        const definitions = this.doc.getDefinitions()
        for (const defName in definitions) {
            console.log('definition:', defName)
            const definition = definitions[defName]
            if (definition.type === 'object') {
                this.diagram.buildObject(defName, definition as IDocObject)
            }
        }
    }
}